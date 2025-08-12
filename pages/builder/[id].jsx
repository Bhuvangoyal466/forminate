import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import HeaderImageUploader from "../../components/HeaderImageUploader";
import QuestionEditor from "../../components/QuestionEditor";
import QuestionCard from "../../components/QuestionCard";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import apiClient from "../../lib/api";

export default function FormBuilderEdit() {
    const router = useRouter();
    const { id } = router.query;
    const { isAuthenticated, loading } = useAuth();
    const [form, setForm] = useState({
        title: "",
        description: "",
        headerImage: null,
        questions: [],
    });
    const [isEditing, setIsEditing] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/signin");
            return;
        }

        if (id && isAuthenticated) {
            loadForm();
        }
    }, [id, isAuthenticated, loading, router]);

    const loadForm = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.getForm(id);

            if (response.success) {
                setForm(response.data);
            } else {
                toast.error("Failed to load form");
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Error loading form:", error);
            toast.error("Failed to load form");
            router.push("/dashboard");
        } finally {
            setIsLoading(false);
        }
    };

    const addQuestion = (type) => {
        const newQuestion = {
            id: Date.now().toString(),
            type,
            title: "",
            description: "",
            image: null,
            ...getDefaultQuestionData(type),
        };
        setForm((prev) => ({
            ...prev,
            questions: [...prev.questions, newQuestion],
        }));
        setIsEditing(newQuestion.id);
    };

    const getDefaultQuestionData = (type) => {
        switch (type) {
            case "categorize":
                return {
                    options: ["Option 1", "Option 2"],
                    categories: ["Category 1", "Category 2"],
                };
            case "cloze":
                return {
                    text: "The quick ___ fox jumps over the ___ dog.",
                    blanks: ["brown", "lazy"],
                };
            case "comprehension":
                return {
                    passage: "Enter your passage here...",
                    questions: [
                        {
                            id: Date.now().toString(),
                            question: "What is the main idea?",
                            options: [
                                "Option A",
                                "Option B",
                                "Option C",
                                "Option D",
                            ],
                            correctAnswer: 0,
                        },
                    ],
                };
            default:
                return {};
        }
    };

    const updateQuestion = (questionId, updates) => {
        setForm((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === questionId ? { ...q, ...updates } : q
            ),
        }));
    };

    const deleteQuestion = (questionId) => {
        setForm((prev) => ({
            ...prev,
            questions: prev.questions.filter((q) => q.id !== questionId),
        }));
        setIsEditing(null);
    };

    const duplicateQuestion = (questionId) => {
        const questionToDuplicate = form.questions.find(
            (q) => q.id === questionId
        );
        if (questionToDuplicate) {
            const newQuestion = {
                ...questionToDuplicate,
                id: Date.now().toString(),
            };
            setForm((prev) => ({
                ...prev,
                questions: [...prev.questions, newQuestion],
            }));
        }
    };

    const moveQuestion = (questionId, direction) => {
        const currentIndex = form.questions.findIndex(
            (q) => q.id === questionId
        );
        const newIndex =
            direction === "up" ? currentIndex - 1 : currentIndex + 1;

        if (newIndex >= 0 && newIndex < form.questions.length) {
            const newQuestions = [...form.questions];
            [newQuestions[currentIndex], newQuestions[newIndex]] = [
                newQuestions[newIndex],
                newQuestions[currentIndex],
            ];
            setForm((prev) => ({ ...prev, questions: newQuestions }));
        }
    };

    const saveForm = async () => {
        if (!form.title.trim()) {
            toast.error("Please enter a form title");
            return;
        }

        if (form.questions.length === 0) {
            toast.error("Please add at least one question");
            return;
        }

        try {
            setIsSaving(true);
            const response = await apiClient.updateForm(id, form);

            if (response.success) {
                toast.success("Form saved successfully!");
            } else {
                toast.error(response.error || "Failed to save form");
            }
        } catch (error) {
            console.error("Error saving form:", error);
            toast.error("Failed to save form");
        } finally {
            setIsSaving(false);
        }
    };

    const previewForm = () => {
        router.push(`/preview/${id}`);
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading form...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => router.push("/dashboard")}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Edit Form
                                </h1>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Button
                                    variant="outline"
                                    onClick={previewForm}
                                    disabled={
                                        !form.title ||
                                        form.questions.length === 0
                                    }
                                >
                                    Preview
                                </Button>
                                <Button
                                    onClick={saveForm}
                                    disabled={
                                        isSaving ||
                                        !form.title ||
                                        form.questions.length === 0
                                    }
                                >
                                    {isSaving ? "Saving..." : "Save Form"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto p-6">
                    {/* Form Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg shadow-sm p-6 mb-6"
                    >
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Form Title
                                </label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            title: e.target.value,
                                        }))
                                    }
                                    placeholder="Enter form title..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description (Optional)
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                    placeholder="Enter form description..."
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <HeaderImageUploader
                                image={form.headerImage}
                                onImageChange={(image) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        headerImage: image,
                                    }))
                                }
                            />
                        </div>
                    </motion.div>

                    {/* Questions */}
                    <div className="space-y-4">
                        {form.questions.map((question, index) => (
                            <motion.div
                                key={question.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {isEditing === question.id ? (
                                    <QuestionEditor
                                        question={question}
                                        onSave={(updates) => {
                                            updateQuestion(
                                                question.id,
                                                updates
                                            );
                                            setIsEditing(null);
                                        }}
                                        onCancel={() => setIsEditing(null)}
                                    />
                                ) : (
                                    <QuestionCard
                                        question={question}
                                        onEdit={() => setIsEditing(question.id)}
                                        onDelete={() =>
                                            deleteQuestion(question.id)
                                        }
                                        onDuplicate={() =>
                                            duplicateQuestion(question.id)
                                        }
                                        onMoveUp={() =>
                                            moveQuestion(question.id, "up")
                                        }
                                        onMoveDown={() =>
                                            moveQuestion(question.id, "down")
                                        }
                                        canMoveUp={index > 0}
                                        canMoveDown={
                                            index < form.questions.length - 1
                                        }
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Add Question Buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 bg-white rounded-lg shadow-sm p-6"
                    >
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Add Question
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Button
                                variant="outline"
                                onClick={() => addQuestion("categorize")}
                                className="h-24 flex flex-col items-center justify-center"
                            >
                                <svg
                                    className="w-8 h-8 mb-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 11H5m14-7H5m14 14H5"
                                    />
                                </svg>
                                Categorize
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => addQuestion("cloze")}
                                className="h-24 flex flex-col items-center justify-center"
                            >
                                <svg
                                    className="w-8 h-8 mb-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                                Cloze
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => addQuestion("comprehension")}
                                className="h-24 flex flex-col items-center justify-center"
                            >
                                <svg
                                    className="w-8 h-8 mb-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                                Comprehension
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
