import clientPromise from "./mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const JWT_SECRET =
    process.env.JWT_SECRET || "your-secret-key-change-in-production";

// User Model
export class UserModel {
    static async create(userData) {
        const client = await clientPromise;
        const db = client.db("forminate");

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 12);

        const user = {
            email: userData.email,
            password: hashedPassword,
            name: userData.name,
            plan: userData.plan || "free",
            emailVerified: false,
            emailVerificationToken: uuidv4(),
            preferences: {
                theme: "light",
                notifications: {
                    email: true,
                    push: false,
                },
            },
            limits: this.getLimitsByPlan(userData.plan || "free"),
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
        };

        const result = await db.collection("users").insertOne(user);
        return { ...user, _id: result.insertedId, password: undefined };
    }

    static async findByEmail(email) {
        const client = await clientPromise;
        const db = client.db("forminate");
        return await db.collection("users").findOne({ email, isActive: true });
    }

    static async findById(id) {
        const client = await clientPromise;
        const db = client.db("forminate");
        const { ObjectId } = require("mongodb");
        return await db
            .collection("users")
            .findOne({ _id: new ObjectId(id), isActive: true });
    }

    static async updateLastLogin(userId) {
        const client = await clientPromise;
        const db = client.db("forminate");
        const { ObjectId } = require("mongodb");

        await db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            {
                $set: {
                    lastLogin: new Date(),
                    updatedAt: new Date(),
                },
            }
        );
    }

    static async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    static generateToken(user) {
        return jwt.sign(
            {
                id: user._id,
                email: user.email,
                plan: user.plan,
            },
            JWT_SECRET,
            { expiresIn: "7d" }
        );
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            return null;
        }
    }

    static getLimitsByPlan(plan) {
        const limits = {
            free: {
                maxForms: 3,
                maxSubmissionsPerForm: 100,
                maxFileUploadSize: 5 * 1024 * 1024, // 5MB
            },
            pro: {
                maxForms: 50,
                maxSubmissionsPerForm: 5000,
                maxFileUploadSize: 25 * 1024 * 1024, // 25MB
            },
            enterprise: {
                maxForms: -1, // Unlimited
                maxSubmissionsPerForm: -1, // Unlimited
                maxFileUploadSize: 100 * 1024 * 1024, // 100MB
            },
        };
        return limits[plan] || limits.free;
    }
}

// Form Model
export class FormModel {
    static async create(formData, userId) {
        const client = await clientPromise;
        const db = client.db("forminate");
        const { ObjectId } = require("mongodb");

        const slug = await this.generateUniqueSlug(formData.title);

        const form = {
            title: formData.title,
            description: formData.description || "",
            slug,
            userId: new ObjectId(userId),
            headerImage: formData.headerImage || null,
            settings: {
                isPublic: true,
                requireAuth: false,
                allowMultipleSubmissions: true,
                collectEmail: false,
                notifications: {
                    onSubmission: true,
                    emailNotifications: [],
                },
                ...formData.settings,
            },
            questions: formData.questions || [],
            analytics: {
                totalViews: 0,
                totalSubmissions: 0,
                conversionRate: 0,
                avgCompletionTime: 0,
            },
            status: "draft",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection("forms").insertOne(form);
        return { ...form, _id: result.insertedId };
    }

    static async findById(id) {
        const client = await clientPromise;
        const db = client.db("forminate");
        const { ObjectId } = require("mongodb");
        return await db.collection("forms").findOne({ _id: new ObjectId(id) });
    }

    static async findBySlug(slug) {
        const client = await clientPromise;
        const db = client.db("forminate");
        return await db
            .collection("forms")
            .findOne({ slug, status: "published" });
    }

    static async findByUserId(userId, page = 1, limit = 10) {
        const client = await clientPromise;
        const db = client.db("forminate");
        const { ObjectId } = require("mongodb");

        const skip = (page - 1) * limit;

        const forms = await db
            .collection("forms")
            .find({ userId: new ObjectId(userId) })
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();

        const total = await db
            .collection("forms")
            .countDocuments({ userId: new ObjectId(userId) });

        return { forms, total, page, totalPages: Math.ceil(total / limit) };
    }

    static async update(id, updateData, userId) {
        const client = await clientPromise;
        const db = client.db("forminate");
        const { ObjectId } = require("mongodb");

        // Remove _id field from updateData to prevent immutable field error
        const { _id, ...cleanUpdateData } = updateData;

        const updateDoc = {
            ...cleanUpdateData,
            updatedAt: new Date(),
        };

        if (updateData.status === "published" && !updateData.publishedAt) {
            updateDoc.publishedAt = new Date();
        }

        return await db
            .collection("forms")
            .updateOne(
                { _id: new ObjectId(id), userId: new ObjectId(userId) },
                { $set: updateDoc }
            );
    }

    static async delete(id, userId) {
        const client = await clientPromise;
        const db = client.db("forminate");
        const { ObjectId } = require("mongodb");

        return await db.collection("forms").deleteOne({
            _id: new ObjectId(id),
            userId: new ObjectId(userId),
        });
    }

    static async incrementViews(formId) {
        const client = await clientPromise;
        const db = client.db("forminate");
        const { ObjectId } = require("mongodb");

        return await db.collection("forms").updateOne(
            { _id: new ObjectId(formId) },
            {
                $inc: { "analytics.totalViews": 1 },
                $set: { updatedAt: new Date() },
            }
        );
    }

    static async incrementSubmissions(formId) {
        const client = await clientPromise;
        const db = client.db("forminate");
        const { ObjectId } = require("mongodb");

        const form = await this.findById(formId);
        if (!form) return null;

        const newSubmissions = form.analytics.totalSubmissions + 1;
        const conversionRate =
            form.analytics.totalViews > 0
                ? (newSubmissions / form.analytics.totalViews) * 100
                : 0;

        return await db.collection("forms").updateOne(
            { _id: new ObjectId(formId) },
            {
                $inc: { "analytics.totalSubmissions": 1 },
                $set: {
                    "analytics.conversionRate": conversionRate,
                    updatedAt: new Date(),
                },
            }
        );
    }

    static async generateUniqueSlug(title) {
        const client = await clientPromise;
        const db = client.db("forminate");

        const baseSlug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        let slug = baseSlug;
        let counter = 1;

        while (await db.collection("forms").findOne({ slug })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        return slug;
    }
}

// Form Submission Model
export class SubmissionModel {
    static async create(submissionData) {
        const client = await clientPromise;
        const db = client.db("forminate");
        const { ObjectId } = require("mongodb");

        const submission = {
            formId: new ObjectId(submissionData.formId),
            formSlug: submissionData.formSlug,
            submitterInfo: {
                email: submissionData.email || null,
                ipAddress: submissionData.ipAddress,
                userAgent: submissionData.userAgent,
                location: submissionData.location || {},
            },
            responses: submissionData.responses,
            submissionTime: {
                started: submissionData.startedAt
                    ? new Date(submissionData.startedAt)
                    : new Date(),
                completed: new Date(),
                totalTime: submissionData.totalTime || 0,
            },
            status: "completed",
            isRead: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db
            .collection("form_submissions")
            .insertOne(submission);

        // Update form analytics
        await FormModel.incrementSubmissions(submissionData.formId);

        return { ...submission, _id: result.insertedId };
    }

    static async findByFormId(formId, page = 1, limit = 10) {
        const client = await clientPromise;
        const db = client.db("forminate");
        const { ObjectId } = require("mongodb");

        const skip = (page - 1) * limit;

        const submissions = await db
            .collection("form_submissions")
            .find({ formId: new ObjectId(formId) })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();

        const total = await db
            .collection("form_submissions")
            .countDocuments({ formId: new ObjectId(formId) });

        return {
            submissions,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    static async markAsRead(submissionId) {
        const client = await clientPromise;
        const db = client.db("forminate");
        const { ObjectId } = require("mongodb");

        return await db.collection("form_submissions").updateOne(
            { _id: new ObjectId(submissionId) },
            {
                $set: {
                    isRead: true,
                    updatedAt: new Date(),
                },
            }
        );
    }

    static async getFormStats(formId) {
        const client = await clientPromise;
        const db = client.db("forminate");
        const { ObjectId } = require("mongodb");

        const stats = await db
            .collection("form_submissions")
            .aggregate([
                { $match: { formId: new ObjectId(formId) } },
                {
                    $group: {
                        _id: null,
                        totalSubmissions: { $sum: 1 },
                        avgCompletionTime: {
                            $avg: "$submissionTime.totalTime",
                        },
                        todaySubmissions: {
                            $sum: {
                                $cond: [
                                    {
                                        $gte: [
                                            "$createdAt",
                                            new Date(
                                                new Date().setHours(0, 0, 0, 0)
                                            ),
                                        ],
                                    },
                                    1,
                                    0,
                                ],
                            },
                        },
                    },
                },
            ])
            .toArray();

        return (
            stats[0] || {
                totalSubmissions: 0,
                avgCompletionTime: 0,
                todaySubmissions: 0,
            }
        );
    }
}
