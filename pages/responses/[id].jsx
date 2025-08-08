import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import { fetchFormById, fetchFormResponses } from "../../lib/api";

export default function Responses() {
    const router = useRouter();
    const { id } = router.query;
    const [form, setForm] = useState(null);
    const [responses, setResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedResponse, setSelectedResponse] = useState(null);

    useEffect(() => {
        if (id) {
            loadData();
        }
    }, [id]);

    const loadData = async () => {
        try {
            const [formData, responsesData] = await Promise.all([
                fetchFormById(id),
                fetchFormResponses(id),
            ]);
            setForm(formData);
            setResponses(responsesData);
        } catch (error) {
            console.error("Failed to load data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getQuestionById = (questionId) => {
        return form?.questions?.find((q) => q.id === questionId);
    };

    const exportResponses = () => {
        // Create CSV content
        const headers = [
            "Response ID",
            "Submitted At",
            ...form.questions.map((q) => q.title),
        ];
        const csvContent = [
            headers.join(","),
            ...responses.map((response) =>
                [
                    response.id,
                    formatDate(response.submittedAt),
                    ...form.questions.map((q) => {
                        const answer = response.responses[q.id];
                        return typeof answer === "string"
                            ? `"${answer.replace(/"/g, '""')}"`
                            : answer || "";
                    }),
                ].join(",")
            ),
        ].join("\n");

        // Download CSV
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${form.title || "form"}-responses.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading responses...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!form) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.206 0-4.244.827-5.818 2.183A7.963 7.963 0 016 12a8 8 0 1116 0 7.963 7.963 0 01-.182 1.183z"
                            />
                        </svg>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Form not found
                        </h2>
                        <p className="text-gray-600">
                            The form you're looking for doesn't exist or has
                            been removed.
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {form.title}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                {responses.length}{" "}
                                {responses.length === 1
                                    ? "response"
                                    : "responses"}{" "}
                                collected
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => router.push(`/preview/${id}`)}
                            >
                                View Form
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.push("/builder")}
                            >
                                Edit Form
                            </Button>
                            {responses.length > 0 && (
                                <Button onClick={exportResponses}>
                                    Export CSV
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-lg border shadow-sm"
                    >
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <svg
                                    className="w-6 h-6 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.206 0-4.244.827-5.818 2.183A7.963 7.963 0 016 12a8 8 0 1116 0 7.963 7.963 0 01-.182 1.183z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900">
                                    {responses.length}
                                </p>
                                <p className="text-gray-600">Total Responses</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-6 rounded-lg border shadow-sm"
                    >
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <svg
                                    className="w-6 h-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900">
                                    {form.questions.length}
                                </p>
                                <p className="text-gray-600">Questions</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-6 rounded-lg border shadow-sm"
                    >
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <svg
                                    className="w-6 h-6 text-purple-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900">
                                    {responses.length > 0
                                        ? Math.round(
                                              (responses.length /
                                                  form.questions.length) *
                                                  100
                                          )
                                        : 0}
                                    %
                                </p>
                                <p className="text-gray-600">Completion Rate</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Responses Table */}
                {responses.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
                    >
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.206 0-4.244.827-5.818 2.183A7.963 7.963 0 016 12a8 8 0 1116 0 7.963 7.963 0 01-.182 1.183z"
                            />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No responses yet
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Share your form to start collecting responses
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    `${window.location.origin}/preview/${id}`
                                );
                                alert("Form link copied to clipboard!");
                            }}
                        >
                            Copy Form Link
                        </Button>
                    </motion.div>
                ) : (
                    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Response ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Submitted
                                        </th>
                                        {form.questions
                                            .slice(0, 3)
                                            .map((question, index) => (
                                                <th
                                                    key={question.id}
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    {question.title.length > 30
                                                        ? `${question.title.substring(
                                                              0,
                                                              30
                                                          )}...`
                                                        : question.title}
                                                </th>
                                            ))}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {responses.map((response, index) => (
                                        <motion.tr
                                            key={response.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                #{response.id.substring(0, 8)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(
                                                    response.submittedAt
                                                )}
                                            </td>
                                            {form.questions
                                                .slice(0, 3)
                                                .map((question) => (
                                                    <td
                                                        key={question.id}
                                                        className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate"
                                                    >
                                                        {response.responses[
                                                            question.id
                                                        ] || "-"}
                                                    </td>
                                                ))}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        setSelectedResponse(
                                                            response
                                                        )
                                                    }
                                                >
                                                    View Details
                                                </Button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Response Detail Modal */}
                {selectedResponse && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Response #
                                    {selectedResponse.id.substring(0, 8)}
                                </h3>
                                <button
                                    onClick={() => setSelectedResponse(null)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                >
                                    <svg
                                        className="w-5 h-5 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto max-h-[60vh]">
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500">
                                        Submitted on{" "}
                                        {formatDate(
                                            selectedResponse.submittedAt
                                        )}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {form.questions.map((question) => (
                                        <div
                                            key={question.id}
                                            className="border-b border-gray-100 pb-4 last:border-b-0"
                                        >
                                            <h4 className="font-medium text-gray-900 mb-2">
                                                {question.title}
                                            </h4>
                                            <div className="text-gray-700">
                                                {selectedResponse.responses[
                                                    question.id
                                                ] || (
                                                    <span className="text-gray-400 italic">
                                                        No answer provided
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
