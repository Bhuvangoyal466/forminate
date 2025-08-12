import { UserModel } from "../../../lib/models.js";
import {
    validators,
    sendErrorResponse,
    sendSuccessResponse,
    rateLimit,
} from "../../../lib/auth.js";

// Rate limiting: 3 signups per hour per IP
const rateLimiter = rateLimit(60 * 60 * 1000, 3);

export default function handler(req, res) {
    // Apply rate limiting
    rateLimiter(req, res, async () => {
        if (req.method !== "POST") {
            return sendErrorResponse(res, 405, "Method not allowed");
        }

        try {
            const { name, email, password, plan = "free" } = req.body;

            // Validation
            if (!name || !email || !password) {
                return sendErrorResponse(
                    res,
                    400,
                    "Name, email, and password are required"
                );
            }

            if (!validators.name(name)) {
                return sendErrorResponse(
                    res,
                    400,
                    "Name must be between 2-50 characters"
                );
            }

            if (!validators.email(email)) {
                return sendErrorResponse(res, 400, "Invalid email format");
            }

            if (!validators.password(password)) {
                return sendErrorResponse(
                    res,
                    400,
                    "Password must be at least 8 characters with uppercase, lowercase, and number"
                );
            }

            const validPlans = ["free", "pro", "enterprise"];
            if (!validPlans.includes(plan)) {
                return sendErrorResponse(res, 400, "Invalid plan selected");
            }

            // Check if user already exists
            const existingUser = await UserModel.findByEmail(
                email.toLowerCase()
            );
            if (existingUser) {
                return sendErrorResponse(
                    res,
                    409,
                    "User with this email already exists"
                );
            }

            // Create user
            const user = await UserModel.create({
                name: name.trim(),
                email: email.toLowerCase(),
                password,
                plan,
            });

            // Generate token
            const token = UserModel.generateToken(user);

            // Remove sensitive data
            const { password: _, emailVerificationToken, ...safeUser } = user;

            sendSuccessResponse(
                res,
                {
                    user: safeUser,
                    token,
                },
                "Account created successfully"
            );
        } catch (error) {
            console.error("Sign up error:", error);

            // Handle duplicate key error (email already exists)
            if (error.code === 11000) {
                return sendErrorResponse(
                    res,
                    409,
                    "User with this email already exists"
                );
            }

            sendErrorResponse(res, 500, "Internal server error");
        }
    });
}
