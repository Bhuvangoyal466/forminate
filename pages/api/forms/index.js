import { FormModel } from "../../../lib/models.js";
import {
    withAuth,
    sendErrorResponse,
    sendSuccessResponse,
    getPaginationParams,
    validateFormData,
} from "../../../lib/auth.js";

async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            return await getForms(req, res);
        case "POST":
            return await createForm(req, res);
        default:
            return sendErrorResponse(res, 405, "Method not allowed");
    }
}

async function getForms(req, res) {
    try {
        const { page, limit } = getPaginationParams(req);
        const result = await FormModel.findByUserId(req.user.id, page, limit);

        sendSuccessResponse(res, result, "Forms retrieved successfully");
    } catch (error) {
        console.error("Get forms error:", error);
        sendErrorResponse(res, 500, "Internal server error");
    }
}

async function createForm(req, res) {
    try {
        const formData = req.body;

        // Validate form data
        const validationErrors = validateFormData(formData);
        if (validationErrors.length > 0) {
            return sendErrorResponse(res, 400, "Validation failed", {
                errors: validationErrors,
            });
        }

        // Check user limits
        const userForms = await FormModel.findByUserId(req.user.id, 1, 1);
        const { maxForms } = req.user.dbUser.limits;

        if (maxForms !== -1 && userForms.total >= maxForms) {
            return sendErrorResponse(
                res,
                403,
                `You have reached your form limit of ${maxForms}. Please upgrade your plan.`
            );
        }

        const form = await FormModel.create(formData, req.user.id);

        sendSuccessResponse(res, form, "Form created successfully");
    } catch (error) {
        console.error("Create form error:", error);
        sendErrorResponse(res, 500, "Internal server error");
    }
}

// Increase body size limit for forms with images and multiple questions
export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb",
        },
    },
};

export default withAuth(handler);
