import {
    FormModel,
    SubmissionModel,
    UserModel,
} from "../../../../lib/models.js";
import {
    sendErrorResponse,
    sendSuccessResponse,
    getClientIP,
    rateLimit,
} from "../../../../lib/auth.js";

// Rate limiting: 10 submissions per 15 minutes per IP
const rateLimiter = rateLimit(15 * 60 * 1000, 10);

export default function handler(req, res) {
    rateLimiter(req, res, async () => {
        if (req.method !== "POST") {
            return sendErrorResponse(res, 405, "Method not allowed");
        }

        try {
            const { id } = req.query;
            const submissionData = req.body;

            // Find form
            const form = await FormModel.findById(id);
            if (!form) {
                return sendErrorResponse(res, 404, "Form not found");
            }

            // Check if form is published and accepting submissions
            if (form.status !== "published") {
                return sendErrorResponse(
                    res,
                    403,
                    "Form is not accepting submissions"
                );
            }

            // Validate required fields
            const requiredQuestions = form.questions.filter(
                (q) => q.validation?.required
            );
            const submittedQuestionIds =
                submissionData.responses?.map((r) => r.questionId) || [];

            for (const question of requiredQuestions) {
                if (!submittedQuestionIds.includes(question.id)) {
                    return sendErrorResponse(
                        res,
                        400,
                        `Question "${question.title}" is required`
                    );
                }
            }

            // Validate responses
            if (
                !submissionData.responses ||
                !Array.isArray(submissionData.responses)
            ) {
                return sendErrorResponse(res, 400, "Responses are required");
            }

            // Check submission limits
            const user = await UserModel.findById(form.userId);
            const { maxSubmissionsPerForm } = user.limits;

            if (
                maxSubmissionsPerForm !== -1 &&
                form.analytics.totalSubmissions >= maxSubmissionsPerForm
            ) {
                return sendErrorResponse(
                    res,
                    403,
                    "This form has reached its submission limit"
                );
            }

            // Prepare submission data
            const submission = {
                formId: id,
                formSlug: form.slug,
                responses: submissionData.responses.map((response) => ({
                    questionId: response.questionId,
                    questionType: response.questionType,
                    questionTitle: response.questionTitle,
                    answer: response.answer,
                    files: response.files || [],
                })),
                ipAddress: getClientIP(req),
                userAgent: req.headers["user-agent"],
                email: submissionData.email || null,
                startedAt: submissionData.startedAt,
                totalTime: submissionData.totalTime || 0,
            };

            // Create submission
            const createdSubmission = await SubmissionModel.create(submission);

            // If form has email notifications enabled, send notification
            if (form.settings.notifications?.onSubmission) {
                // TODO: Implement email notification
                console.log(
                    "TODO: Send email notification for form submission"
                );
            }

            sendSuccessResponse(
                res,
                {
                    submissionId: createdSubmission._id,
                    message: "Form submitted successfully",
                },
                "Form submitted successfully"
            );
        } catch (error) {
            console.error("Form submission error:", error);
            sendErrorResponse(res, 500, "Internal server error");
        }
    });
}

// Increase body size limit for form submissions with file uploads
export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb",
        },
    },
};
