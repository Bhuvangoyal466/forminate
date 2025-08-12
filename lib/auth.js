import { UserModel } from "./models";

// Middleware to verify JWT token
export function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: "Access token required" });
    }

    const decoded = UserModel.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
}

// Higher-order function to wrap API routes with authentication
export function withAuth(handler) {
    return async (req, res) => {
        try {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];

            if (!token) {
                return res
                    .status(401)
                    .json({ message: "Access token required" });
            }

            const decoded = UserModel.verifyToken(token);
            if (!decoded) {
                return res
                    .status(403)
                    .json({ message: "Invalid or expired token" });
            }

            // Verify user still exists and is active
            const user = await UserModel.findById(decoded.id);
            if (!user || !user.isActive) {
                return res
                    .status(403)
                    .json({ message: "User not found or inactive" });
            }

            req.user = { ...decoded, dbUser: user };
            return handler(req, res);
        } catch (error) {
            console.error("Auth middleware error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
}

// Get client IP address
export function getClientIP(req) {
    return (
        req.headers["x-forwarded-for"] ||
        req.headers["x-real-ip"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
        "127.0.0.1"
    );
}

// Rate limiting helper
const rateLimitStore = new Map();

export function rateLimit(windowMs = 15 * 60 * 1000, maxRequests = 100) {
    return (req, res, next) => {
        const ip = getClientIP(req);
        const now = Date.now();
        const windowStart = now - windowMs;

        // Clean old entries
        for (const [key, data] of rateLimitStore.entries()) {
            if (data.timestamp < windowStart) {
                rateLimitStore.delete(key);
            }
        }

        // Get current requests for this IP
        const currentRequests = Array.from(rateLimitStore.values()).filter(
            (data) => data.ip === ip && data.timestamp > windowStart
        ).length;

        if (currentRequests >= maxRequests) {
            return res.status(429).json({
                message: "Too many requests, please try again later.",
                retryAfter: Math.ceil(windowMs / 1000),
            });
        }

        // Add current request
        rateLimitStore.set(`${ip}_${now}`, { ip, timestamp: now });
        next();
    };
}

// Validation helpers
export const validators = {
    email: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    password: (password) => {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    },

    name: (name) => {
        return name && name.trim().length >= 2 && name.trim().length <= 50;
    },

    formTitle: (title) => {
        return title && title.trim().length >= 1 && title.trim().length <= 200;
    },

    slug: (slug) => {
        const slugRegex = /^[a-z0-9-]+$/;
        return (
            slug &&
            slugRegex.test(slug) &&
            slug.length >= 1 &&
            slug.length <= 100
        );
    },
};

// Sanitization helpers
export const sanitizers = {
    string: (str, maxLength = 1000) => {
        if (typeof str !== "string") return "";
        return str.trim().slice(0, maxLength);
    },

    html: (html) => {
        // Basic HTML sanitization - in production, use a library like DOMPurify
        return html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
            .replace(/javascript:/gi, "")
            .replace(/on\w+\s*=/gi, "");
    },

    filename: (filename) => {
        return filename
            .replace(/[^a-zA-Z0-9.-]/g, "_")
            .replace(/_{2,}/g, "_")
            .slice(0, 255);
    },
};

// Error response helper
export function sendErrorResponse(res, status, message, details = null) {
    const response = {
        success: false,
        message,
        timestamp: new Date().toISOString(),
    };

    if (details && process.env.NODE_ENV === "development") {
        response.details = details;
    }

    return res.status(status).json(response);
}

// Success response helper
export function sendSuccessResponse(res, data = null, message = "Success") {
    const response = {
        success: true,
        message,
        timestamp: new Date().toISOString(),
    };

    if (data !== null) {
        response.data = data;
    }

    return res.json(response);
}

// Pagination helper
export function getPaginationParams(req, defaultLimit = 10, maxLimit = 100) {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(
        maxLimit,
        Math.max(1, parseInt(req.query.limit) || defaultLimit)
    );
    const skip = (page - 1) * limit;

    return { page, limit, skip };
}

// Form validation helper
export function validateFormData(formData) {
    const errors = [];

    if (!validators.formTitle(formData.title)) {
        errors.push("Title is required and must be between 1-200 characters");
    }

    if (formData.description && formData.description.length > 1000) {
        errors.push("Description must be less than 1000 characters");
    }

    if (formData.questions && Array.isArray(formData.questions)) {
        formData.questions.forEach((question, index) => {
            if (!question.type || !question.title) {
                errors.push(
                    `Question ${index + 1}: Type and title are required`
                );
            }

            if (question.title && question.title.length > 500) {
                errors.push(
                    `Question ${
                        index + 1
                    }: Title must be less than 500 characters`
                );
            }

            const validTypes = [
                "categorize",
                "cloze",
                "comprehension",
                "multiple-choice",
                "text",
                "email",
                "number",
                "date",
                "file-upload",
            ];
            if (question.type && !validTypes.includes(question.type)) {
                errors.push(`Question ${index + 1}: Invalid question type`);
            }
        });
    }

    return errors;
}

// File upload validation
export function validateFileUpload(
    file,
    allowedTypes = [],
    maxSize = 5 * 1024 * 1024
) {
    const errors = [];

    if (!file) {
        return errors;
    }

    if (file.size > maxSize) {
        errors.push(
            `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
        );
    }

    if (allowedTypes.length > 0 && !allowedTypes.includes(file.mimetype)) {
        errors.push(
            `File type not allowed. Allowed types: ${allowedTypes.join(", ")}`
        );
    }

    return errors;
}
