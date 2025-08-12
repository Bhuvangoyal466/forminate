import { FormModel } from "../../../lib/models.js";
import {
    withAuth,
    sendErrorResponse,
    sendSuccessResponse,
    validateFormData,
} from "../../../lib/auth.js";

async function handler(req, res) {
    const { method, query } = req;
    const { id } = query;

    switch (method) {
        case "GET":
            return await getForm(req, res, id);
        case "PUT":
            return await updateForm(req, res, id);
        case "DELETE":
            return await deleteForm(req, res, id);
        default:
            return sendErrorResponse(res, 405, "Method not allowed");
    }
}

async function getForm(req, res, id) {
    try {
        const form = await FormModel.findById(id);

        if (!form) {
            return sendErrorResponse(res, 404, "Form not found");
        }

        // Check if user owns this form
        if (form.userId.toString() !== req.user.id) {
            return sendErrorResponse(res, 403, "Access denied");
        }

        // Create a lightweight version for response to avoid 4MB limit
        const { createdBy, ...lightweightForm } = form;

        sendSuccessResponse(
            res,
            lightweightForm,
            "Form retrieved successfully"
        );
    } catch (error) {
        console.error("Get form error:", error);
        sendErrorResponse(res, 500, "Internal server error");
    }
}

async function updateForm(req, res, id) {
    try {
        const updateData = req.body;

        // Validate form data
        const validationErrors = validateFormData(updateData);
        if (validationErrors.length > 0) {
            return sendErrorResponse(res, 400, "Validation failed", {
                errors: validationErrors,
            });
        }

        const result = await FormModel.update(id, updateData, req.user.id);

        if (result.matchedCount === 0) {
            return sendErrorResponse(
                res,
                404,
                "Form not found or access denied"
            );
        }

        const updatedForm = await FormModel.findById(id);
        sendSuccessResponse(res, updatedForm, "Form updated successfully");
    } catch (error) {
        console.error("Update form error:", error);
        sendErrorResponse(res, 500, "Internal server error");
    }
}

async function deleteForm(req, res, id) {
    try {
        const result = await FormModel.delete(id, req.user.id);

        if (result.deletedCount === 0) {
            return sendErrorResponse(
                res,
                404,
                "Form not found or access denied"
            );
        }

        sendSuccessResponse(res, null, "Form deleted successfully");
    } catch (error) {
        console.error("Delete form error:", error);
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
