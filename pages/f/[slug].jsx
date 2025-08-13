import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { toast } from "react-hot-toast";

const PublicForm = ({ form, error }) => {
    const router = useRouter();
    const [responses, setResponses] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Form Not Found
                    </h1>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!form) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const handleInputChange = (questionId, value) => {
        setResponses((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate required fields
            const requiredQuestions = form.questions.filter(
                (q) => q.validation?.required
            );
            for (const question of requiredQuestions) {
                if (
                    !responses[question.id] ||
                    responses[question.id].toString().trim() === ""
                ) {
                    toast.error(`${question.title} is required`);
                    setLoading(false);
                    return;
                }
            }

            // Format responses for submission
            const formattedResponses = form.questions.map((question) => ({
                questionId: question.id,
                questionTitle: question.title,
                questionType: question.type,
                answer: responses[question.id] || "",
            }));

            const submissionData = {
                responses: formattedResponses,
                startedAt: new Date().toISOString(),
                totalTime: 0, // You can implement time tracking if needed
            };

            const response = await fetch(`/api/forms/${form._id}/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                toast.success("Form submitted successfully!");
            } else {
                toast.error(result.message || "Failed to submit form");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Failed to submit form");
        } finally {
            setLoading(false);
        }
    };

    const renderQuestion = (question) => {
        const { id, type, title, description, options, validation } = question;
        const isRequired = validation?.required;

        switch (type) {
            case "text":
            case "email":
            case "number":
                return (
                    <div key={id} className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {title}{" "}
                            {isRequired && (
                                <span className="text-red-500">*</span>
                            )}
                        </label>
                        {description && (
                            <p className="text-sm text-gray-600 mb-2">
                                {description}
                            </p>
                        )}
                        <input
                            type={type}
                            value={responses[id] || ""}
                            onChange={(e) =>
                                handleInputChange(id, e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required={isRequired}
                        />
                    </div>
                );

            case "textarea":
                return (
                    <div key={id} className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {title}{" "}
                            {isRequired && (
                                <span className="text-red-500">*</span>
                            )}
                        </label>
                        {description && (
                            <p className="text-sm text-gray-600 mb-2">
                                {description}
                            </p>
                        )}
                        <textarea
                            value={responses[id] || ""}
                            onChange={(e) =>
                                handleInputChange(id, e.target.value)
                            }
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required={isRequired}
                        />
                    </div>
                );

            case "radio":
                return (
                    <div key={id} className="mb-6">
                        <fieldset>
                            <legend className="block text-sm font-medium text-gray-700 mb-2">
                                {title}{" "}
                                {isRequired && (
                                    <span className="text-red-500">*</span>
                                )}
                            </legend>
                            {description && (
                                <p className="text-sm text-gray-600 mb-2">
                                    {description}
                                </p>
                            )}
                            <div className="space-y-2">
                                {options?.map((option, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="radio"
                                            name={id}
                                            value={option}
                                            checked={responses[id] === option}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    id,
                                                    e.target.value
                                                )
                                            }
                                            className="mr-2"
                                            required={isRequired}
                                        />
                                        <span className="text-sm text-gray-700">
                                            {option}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                );

            case "checkbox":
                return (
                    <div key={id} className="mb-6">
                        <fieldset>
                            <legend className="block text-sm font-medium text-gray-700 mb-2">
                                {title}{" "}
                                {isRequired && (
                                    <span className="text-red-500">*</span>
                                )}
                            </legend>
                            {description && (
                                <p className="text-sm text-gray-600 mb-2">
                                    {description}
                                </p>
                            )}
                            <div className="space-y-2">
                                {options?.map((option, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={(
                                                responses[id] || []
                                            ).includes(option)}
                                            onChange={(e) => {
                                                const currentValues =
                                                    responses[id] || [];
                                                if (e.target.checked) {
                                                    handleInputChange(id, [
                                                        ...currentValues,
                                                        option,
                                                    ]);
                                                } else {
                                                    handleInputChange(
                                                        id,
                                                        currentValues.filter(
                                                            (v) => v !== option
                                                        )
                                                    );
                                                }
                                            }}
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-700">
                                            {option}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                );

            case "select":
                return (
                    <div key={id} className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {title}{" "}
                            {isRequired && (
                                <span className="text-red-500">*</span>
                            )}
                        </label>
                        {description && (
                            <p className="text-sm text-gray-600 mb-2">
                                {description}
                            </p>
                        )}
                        <select
                            value={responses[id] || ""}
                            onChange={(e) =>
                                handleInputChange(id, e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required={isRequired}
                        >
                            <option value="">Select an option</option>
                            {options?.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                );

            default:
                return null;
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                    <div className="mb-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <svg
                                className="w-8 h-8 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Thank You!
                    </h2>
                    <p className="text-gray-600">
                        Your response has been submitted successfully.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{form.title}</title>
                <meta name="description" content={form.description} />
            </Head>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="px-6 py-8">
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {form.title}
                                </h1>
                                {form.description && (
                                    <p className="text-gray-600">
                                        {form.description}
                                    </p>
                                )}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {form.questions?.map((question) =>
                                    renderQuestion(question)
                                )}

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps({ params }) {
    const { slug } = params;

    try {
        const response = await fetch(
            `${
                process.env.NEXTAUTH_URL || "http://localhost:3000"
            }/api/f/${slug}`
        );

        if (!response.ok) {
            return {
                props: {
                    form: null,
                    error: "Form not found or not published",
                },
            };
        }

        const result = await response.json();

        if (!result.success) {
            return {
                props: {
                    form: null,
                    error: result.message || "Form not found",
                },
            };
        }

        return {
            props: {
                form: result.data,
                error: null,
            },
        };
    } catch (error) {
        console.error("Error fetching form:", error);
        return {
            props: {
                form: null,
                error: "Failed to load form",
            },
        };
    }
}

export default PublicForm;
