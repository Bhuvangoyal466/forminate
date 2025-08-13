import { FormModel } from "../../../../lib/models.js";
import {
    withAuth,
    sendErrorResponse,
    sendSuccessResponse,
} from "../../../../lib/auth.js";

async function handler(req, res) {
    if (req.method !== "GET") {
        return sendErrorResponse(res, 405, "Method not allowed");
    }

    try {
        const { id } = req.query;
        const userId = req.user.id;

        // Find the form by ID and ensure it belongs to the authenticated user
        const form = await FormModel.findById(id);

        if (!form) {
            return sendErrorResponse(res, 404, "Form not found");
        }

        // Check if the user owns this form
        if (form.userId.toString() !== userId.toString()) {
            return sendErrorResponse(res, 403, "Access denied");
        }

        // Return the form data for preview (no status restrictions for owners)
        sendSuccessResponse(
            res,
            form,
            "Form retrieved successfully for preview"
        );
    } catch (error) {
        console.error("Form preview error:", error);
        sendErrorResponse(res, 500, "Internal server error");
    }
}

export default withAuth(handler);
