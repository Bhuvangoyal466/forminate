import { FormModel } from "../../../lib/models.js";
import { sendErrorResponse, sendSuccessResponse } from "../../../lib/auth.js";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return sendErrorResponse(res, 405, "Method not allowed");
    }

    try {
        const { slug } = req.query;

        // Try to find by slug first, then by ID if slug doesn't work
        let form = await FormModel.findBySlug(slug);
        if (!form) {
            // If not found by slug, try to find by ID (for direct ID access)
            form = await FormModel.findById(slug);
            // For ID access, check if form is published and public
            if (
                form &&
                (form.status !== "published" || !form.settings?.isPublic)
            ) {
                form = null;
            }
        }

        if (!form) {
            return sendErrorResponse(
                res,
                404,
                "Form not found or not available"
            );
        }

        // Check if form is public (additional check for slug access)
        if (!form.settings?.isPublic) {
            return sendErrorResponse(res, 403, "This form is private");
        }

        // Increment view count
        await FormModel.incrementViews(form._id);

        // Remove sensitive and large data fields to reduce response size
        const {
            userId,
            analytics,
            createdBy,
            settings: { notifications, ...publicSettings },
            ...publicForm
        } = form;

        // Create a lightweight version with essential data only
        const lightweightForm = {
            ...publicForm,
            settings: {
                isPublic: publicSettings.isPublic,
                requireAuth: publicSettings.requireAuth,
                allowMultipleSubmissions:
                    publicSettings.allowMultipleSubmissions,
                collectEmail: publicSettings.collectEmail,
            },
        };

        sendSuccessResponse(
            res,
            lightweightForm,
            "Form retrieved successfully"
        );
    } catch (error) {
        console.error("Public form view error:", error);
        sendErrorResponse(res, 500, "Internal server error");
    }
}
