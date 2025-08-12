import { FormModel } from "../../lib/models.js";
import { sendErrorResponse, sendSuccessResponse } from "../../lib/auth.js";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return sendErrorResponse(res, 405, "Method not allowed");
    }

    try {
        const { slug } = req.query;

        const form = await FormModel.findBySlug(slug);
        if (!form) {
            return sendErrorResponse(res, 404, "Form not found");
        }

        // Check if form is public
        if (!form.settings.isPublic) {
            return sendErrorResponse(res, 403, "This form is private");
        }

        // Increment view count
        await FormModel.incrementViews(form._id);

        // Remove sensitive data
        const { userId, analytics, ...publicForm } = form;

        sendSuccessResponse(res, publicForm, "Form retrieved successfully");
    } catch (error) {
        console.error("Public form view error:", error);
        sendErrorResponse(res, 500, "Internal server error");
    }
}
