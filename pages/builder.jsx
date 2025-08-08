import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import FormHeaderUploader from "../components/FormHeaderUploader";
import QuestionCard from "../components/QuestionCard";
import CategorizeQuestion from "../components/CategorizeQuestion";
import ClozeQuestion from "../components/ClozeQuestion";
import ComprehensionQuestion from "../components/ComprehensionQuestion";
import { saveForm, createNewForm } from "../lib/api";

export default function Builder() {
    const router = useRouter();
    const [form, setForm] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [questionType, setQuestionType] = useState("categorize");
    const [questionData, setQuestionData] = useState({
        title: "",
        subtitle: "",
        image: null,
        required: false,
        options: [],
        placeholder: "",
    });

    useEffect(() => {
        initializeForm();
    }, []);

    const initializeForm = async () => {
        try {
            const newForm = await createNewForm();
            setForm(newForm);
        } catch (error) {
            console.error("Failed to create form:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveForm = async () => {
        if (!form) return;

        setIsSaving(true);
        try {
            const savedForm = await saveForm(form);
            setForm(savedForm);
            // Show success message
        } catch (error) {
            console.error("Failed to save form:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handlePreviewForm = () => {
        if (form && form.questions.length > 0) {
            router.push(`/preview/${form.id}`);
        }
    };

    const handleAddQuestion = () => {
        setEditingQuestion(null);
        setQuestionType("categorize");
        setQuestionData({
            title: "",
            subtitle: "",
            image: null,
            required: false,
            options: [],
            placeholder: "",
        });
        setShowQuestionModal(true);
    };

    const handleEditQuestion = (question) => {
        setEditingQuestion(question);
        setQuestionType(question.type);
        setQuestionData({
            title: question.title || "",
            subtitle: question.subtitle || "",
            image: question.image || null,
            required: question.required || false,
            options: question.options || [],
            placeholder: question.placeholder || "",
        });
        setShowQuestionModal(true);
    };

    const handleSaveQuestion = () => {
        const newQuestion = {
            id: editingQuestion?.id || Date.now().toString(),
            type: questionType,
            ...questionData,
        };

        if (editingQuestion) {
            // Update existing question
            setForm((prev) => ({
                ...prev,
                questions: prev.questions.map((q) =>
                    q.id === editingQuestion.id ? newQuestion : q
                ),
            }));
        } else {
            // Add new question
            setForm((prev) => ({
                ...prev,
                questions: [...prev.questions, newQuestion],
            }));
        }

        setShowQuestionModal(false);
    };

    const handleDeleteQuestion = (questionId) => {
        setForm((prev) => ({
            ...prev,
            questions: prev.questions.filter((q) => q.id !== questionId),
        }));
    };

    const handleMoveQuestion = (questionId, direction) => {
        const questions = [...form.questions];
        const index = questions.findIndex((q) => q.id === questionId);

        if (direction === "up" && index > 0) {
            [questions[index], questions[index - 1]] = [
                questions[index - 1],
                questions[index],
            ];
        } else if (direction === "down" && index < questions.length - 1) {
            [questions[index], questions[index + 1]] = [
                questions[index + 1],
                questions[index],
            ];
        }

        setForm((prev) => ({ ...prev, questions }));
    };

    const renderQuestionTypeSelector = () => (
        <div className="grid grid-cols-3 gap-4 mb-6">
            {[
                { type: "categorize", label: "Categorize", icon: "📝" },
                { type: "cloze", label: "Text Input", icon: "✏️" },
                { type: "comprehension", label: "Rating Scale", icon: "⭐" },
            ].map(({ type, label, icon }) => (
                <button
                    key={type}
                    onClick={() => setQuestionType(type)}
                    className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                        questionType === type
                            ? "border-blue-500 bg-blue-50 text-blue-900"
                            : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                    <div className="text-2xl mb-2">{icon}</div>
                    <div className="font-medium">{label}</div>
                </button>
            ))}
        </div>
    );

    const renderQuestionEditor = () => (
        <div className="space-y-6">
            <Input
                label="Question Title"
                value={questionData.title}
                onChange={(e) =>
                    setQuestionData((prev) => ({
                        ...prev,
                        title: e.target.value,
                    }))
                }
                placeholder="Enter your question..."
                required
            />

            <Input
                label="Subtitle (optional)"
                value={questionData.subtitle}
                onChange={(e) =>
                    setQuestionData((prev) => ({
                        ...prev,
                        subtitle: e.target.value,
                    }))
                }
                placeholder="Add additional context..."
            />

            {questionType === "categorize" && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Options
                    </label>
                    <div className="space-y-2">
                        {questionData.options.map((option, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    value={option}
                                    onChange={(e) => {
                                        const newOptions = [
                                            ...questionData.options,
                                        ];
                                        newOptions[index] = e.target.value;
                                        setQuestionData((prev) => ({
                                            ...prev,
                                            options: newOptions,
                                        }));
                                    }}
                                    placeholder={`Option ${index + 1}`}
                                />
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => {
                                        const newOptions =
                                            questionData.options.filter(
                                                (_, i) => i !== index
                                            );
                                        setQuestionData((prev) => ({
                                            ...prev,
                                            options: newOptions,
                                        }));
                                    }}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button
                            variant="outline"
                            onClick={() =>
                                setQuestionData((prev) => ({
                                    ...prev,
                                    options: [...prev.options, ""],
                                }))
                            }
                        >
                            Add Option
                        </Button>
                    </div>
                </div>
            )}

            {questionType === "cloze" && (
                <Input
                    label="Placeholder Text"
                    value={questionData.placeholder}
                    onChange={(e) =>
                        setQuestionData((prev) => ({
                            ...prev,
                            placeholder: e.target.value,
                        }))
                    }
                    placeholder="Type your answer here..."
                />
            )}

            {questionType === "comprehension" && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating Scale
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <Input
                                key={value}
                                value={
                                    questionData.options.find(
                                        (opt) => opt.value === value
                                    )?.label || ""
                                }
                                onChange={(e) => {
                                    const newOptions = [
                                        ...(questionData.options || []),
                                    ];
                                    const existingIndex = newOptions.findIndex(
                                        (opt) => opt.value === value
                                    );
                                    if (existingIndex >= 0) {
                                        newOptions[existingIndex] = {
                                            value,
                                            label: e.target.value,
                                        };
                                    } else {
                                        newOptions.push({
                                            value,
                                            label: e.target.value,
                                        });
                                    }
                                    setQuestionData((prev) => ({
                                        ...prev,
                                        options: newOptions.sort(
                                            (a, b) => a.value - b.value
                                        ),
                                    }));
                                }}
                                placeholder={`${value} - Label`}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="required"
                    checked={questionData.required}
                    onChange={(e) =>
                        setQuestionData((prev) => ({
                            ...prev,
                            required: e.target.checked,
                        }))
                    }
                    className="mr-2"
                />
                <label htmlFor="required" className="text-sm text-gray-700">
                    Required question
                </label>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Form Builder
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Create and customize your form
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={handlePreviewForm}
                                disabled={!form?.questions?.length}
                            >
                                Preview Form
                            </Button>
                            <Button
                                onClick={handleSaveForm}
                                disabled={isSaving}
                            >
                                {isSaving ? "Saving..." : "Save Form"}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Settings */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg border p-6 sticky top-24">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Form Settings
                            </h2>

                            <div className="space-y-4">
                                <Input
                                    label="Form Title"
                                    value={form?.title || ""}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            title: e.target.value,
                                        }))
                                    }
                                    placeholder="Enter form title..."
                                />

                                <Input
                                    label="Description"
                                    value={form?.description || ""}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                    placeholder="Form description..."
                                />

                                <FormHeaderUploader
                                    headerImage={form?.headerImage}
                                    onImageChange={(image) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            headerImage: image,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Questions */}
                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Questions
                                </h2>
                                <Button onClick={handleAddQuestion}>
                                    Add Question
                                </Button>
                            </div>

                            <AnimatePresence>
                                {form?.questions?.length === 0 ? (
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
                                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            No questions yet
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Add your first question to get
                                            started
                                        </p>
                                        <Button onClick={handleAddQuestion}>
                                            Add Your First Question
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <div className="space-y-4">
                                        {form.questions.map(
                                            (question, index) => (
                                                <QuestionCard
                                                    key={question.id}
                                                    question={question}
                                                    index={index}
                                                    onEdit={handleEditQuestion}
                                                    onDelete={
                                                        handleDeleteQuestion
                                                    }
                                                    onMoveUp={() =>
                                                        handleMoveQuestion(
                                                            question.id,
                                                            "up"
                                                        )
                                                    }
                                                    onMoveDown={() =>
                                                        handleMoveQuestion(
                                                            question.id,
                                                            "down"
                                                        )
                                                    }
                                                    canMoveUp={index > 0}
                                                    canMoveDown={
                                                        index <
                                                        form.questions.length -
                                                            1
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Question Modal */}
                <Modal
                    isOpen={showQuestionModal}
                    onClose={() => setShowQuestionModal(false)}
                    title={editingQuestion ? "Edit Question" : "Add Question"}
                    size="lg"
                >
                    <div className="space-y-6">
                        {renderQuestionTypeSelector()}
                        {renderQuestionEditor()}

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button
                                variant="outline"
                                onClick={() => setShowQuestionModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveQuestion}
                                disabled={!questionData.title.trim()}
                            >
                                {editingQuestion
                                    ? "Update Question"
                                    : "Add Question"}
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </Layout>
    );
}
