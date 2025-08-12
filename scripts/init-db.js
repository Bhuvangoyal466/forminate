import clientPromise from "../lib/mongodb.js";
import bcrypt from "bcryptjs";

async function initializeDatabase() {
    try {
        const client = await clientPromise;
        const db = client.db("forminate");

        console.log("Initializing MongoDB database...");

        // Create indexes for users collection
        console.log("Creating indexes for users collection...");
        await db
            .collection("users")
            .createIndex({ email: 1 }, { unique: true });
        await db.collection("users").createIndex({ emailVerificationToken: 1 });
        await db.collection("users").createIndex({ passwordResetToken: 1 });
        await db.collection("users").createIndex({ createdAt: -1 });

        // Create indexes for forms collection
        console.log("Creating indexes for forms collection...");
        await db.collection("forms").createIndex({ userId: 1 });
        await db.collection("forms").createIndex({ slug: 1 }, { unique: true });
        await db.collection("forms").createIndex({ status: 1 });
        await db.collection("forms").createIndex({ createdAt: -1 });
        await db
            .collection("forms")
            .createIndex({ "analytics.totalSubmissions": -1 });
        await db.collection("forms").createIndex({ userId: 1, status: 1 });

        // Create indexes for form_submissions collection
        console.log("Creating indexes for form_submissions collection...");
        await db.collection("form_submissions").createIndex({ formId: 1 });
        await db.collection("form_submissions").createIndex({ formSlug: 1 });
        await db
            .collection("form_submissions")
            .createIndex({ "submitterInfo.email": 1 });
        await db.collection("form_submissions").createIndex({ createdAt: -1 });
        await db
            .collection("form_submissions")
            .createIndex({ formId: 1, createdAt: -1 });
        await db
            .collection("form_submissions")
            .createIndex({ formId: 1, status: 1 });
        await db
            .collection("form_submissions")
            .createIndex({ formId: 1, isRead: 1 });

        // Create indexes for form_analytics collection
        console.log("Creating indexes for form_analytics collection...");
        await db
            .collection("form_analytics")
            .createIndex({ formId: 1, date: -1 });
        await db
            .collection("form_analytics")
            .createIndex({ userId: 1, date: -1 });
        await db.collection("form_analytics").createIndex({ date: -1 });

        // Create a test user (remove in production)
        console.log("Creating test user...");
        const existingUser = await db
            .collection("users")
            .findOne({ email: "test@forminate.com" });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash("password123", 12);

            await db.collection("users").insertOne({
                email: "test@forminate.com",
                password: hashedPassword,
                name: "Test User",
                plan: "pro",
                emailVerified: true,
                preferences: {
                    theme: "light",
                    notifications: {
                        email: true,
                        push: false,
                    },
                },
                limits: {
                    maxForms: 50,
                    maxSubmissionsPerForm: 5000,
                    maxFileUploadSize: 25 * 1024 * 1024,
                },
                createdAt: new Date(),
                updatedAt: new Date(),
                isActive: true,
            });
            console.log("Test user created: test@forminate.com / password123");
        } else {
            console.log("Test user already exists");
        }

        console.log("Database initialization completed successfully!");

        // Show database stats
        const collections = await db.listCollections().toArray();
        console.log(
            "Collections:",
            collections.map((c) => c.name)
        );

        const userCount = await db.collection("users").countDocuments();
        const formCount = await db.collection("forms").countDocuments();
        const submissionCount = await db
            .collection("form_submissions")
            .countDocuments();

        console.log(`Database stats:
        - Users: ${userCount}
        - Forms: ${formCount}
        - Submissions: ${submissionCount}`);
    } catch (error) {
        console.error("Database initialization failed:", error);
        process.exit(1);
    }
}

// Run initialization
initializeDatabase();
