import { SubmissionModel, FormModel } from "../../../../lib/models.js";
import {
    withAuth,
    sendErrorResponse,
    sendSuccessResponse,
} from "../../../../lib/auth.js";

async function handler(req, res) {
    const { method, query } = req;
    const { id } = query; // form ID

    switch (method) {
        case "GET":
            return await getFormAnalytics(req, res, id);
        default:
            return sendErrorResponse(res, 405, "Method not allowed");
    }
}

async function getFormAnalytics(req, res, formId) {
    try {
        // Verify user owns this form
        const form = await FormModel.findById(formId);
        if (!form) {
            return sendErrorResponse(res, 404, "Form not found");
        }

        if (form.userId.toString() !== req.user.id) {
            return sendErrorResponse(res, 403, "Access denied");
        }

        // Get detailed stats
        const stats = await SubmissionModel.getFormStats(formId);

        // Combine with form analytics
        const analytics = {
            ...form.analytics,
            ...stats,
            formId: formId,
            lastUpdated: new Date(),
        };

        sendSuccessResponse(res, analytics, "Analytics retrieved successfully");
    } catch (error) {
        console.error("Get analytics error:", error);
        sendErrorResponse(res, 500, "Internal server error");
    }
}

export default withAuth(handler);
