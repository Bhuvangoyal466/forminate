import { UserModel } from "../../../lib/models.js";
import {
    validators,
    sendErrorResponse,
    sendSuccessResponse,
    rateLimit,
} from "../../../lib/auth.js";

// Rate limiting: 5 attempts per 15 minutes per IP
const rateLimiter = rateLimit(15 * 60 * 1000, 5);

export default function handler(req, res) {
    // Apply rate limiting
    rateLimiter(req, res, async () => {
        if (req.method !== "POST") {
            return sendErrorResponse(res, 405, "Method not allowed");
        }

        try {
            const { email, password } = req.body;

            // Validation
            if (!email || !password) {
                return sendErrorResponse(
                    res,
                    400,
                    "Email and password are required"
                );
            }

            if (!validators.email(email)) {
                return sendErrorResponse(res, 400, "Invalid email format");
            }

            // Find user
            const user = await UserModel.findByEmail(email.toLowerCase());
            if (!user) {
                return sendErrorResponse(res, 401, "Invalid credentials");
            }

            // Verify password
            const isValidPassword = await UserModel.verifyPassword(
                password,
                user.password
            );
            if (!isValidPassword) {
                return sendErrorResponse(res, 401, "Invalid credentials");
            }

            // Check if email is verified (optional, depends on your requirements)
            // if (!user.emailVerified) {
            //     return sendErrorResponse(res, 401, 'Please verify your email before signing in');
            // }

            // Update last login
            await UserModel.updateLastLogin(user._id);

            // Generate token
            const token = UserModel.generateToken(user);

            // Remove sensitive data
            const {
                password: _,
                emailVerificationToken,
                passwordResetToken,
                ...safeUser
            } = user;

            sendSuccessResponse(
                res,
                {
                    user: safeUser,
                    token,
                },
                "Signed in successfully"
            );
        } catch (error) {
            console.error("Sign in error:", error);
            sendErrorResponse(res, 500, "Internal server error");
        }
    });
}
