import { SubmissionModel, FormModel } from "../../../../lib/models.js";
import {
    withAuth,
    sendErrorResponse,
    sendSuccessResponse,
    getPaginationParams,
} from "../../../../lib/auth.js";

async function handler(req, res) {
    const { method, query } = req;
    const { id } = query;

    switch (method) {
        case "GET":
            return await getFormSubmissions(req, res, id);
        default:
            return sendErrorResponse(res, 405, "Method not allowed");
    }
}

async function getFormSubmissions(req, res, formId) {
    try {
        // Verify user owns this form
        const form = await FormModel.findById(formId);
        if (!form) {
            return sendErrorResponse(res, 404, "Form not found");
        }

        if (form.userId.toString() !== req.user.id) {
            return sendErrorResponse(res, 403, "Access denied");
        }

        const { page, limit } = getPaginationParams(req);
        const result = await SubmissionModel.findByFormId(formId, page, limit);

        sendSuccessResponse(res, result, "Submissions retrieved successfully");
    } catch (error) {
        console.error("Get submissions error:", error);
        sendErrorResponse(res, 500, "Internal server error");
    }
}

export default withAuth(handler);
