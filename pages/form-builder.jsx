import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Button from "../components/Button";
import HeaderImageUploader from "../components/HeaderImageUploader";
import QuestionEditor from "../components/QuestionEditor";
import QuestionCard from "../components/QuestionCard";
import { motion } from "framer-motion";

export default function FormBuilder() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: "",
        headerImage: null,
        questions: [],
    });
    const [isEditing, setIsEditing] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

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
                    passage: "Add your passage here...",
                    questions: [
                        {
                            id: Date.now().toString(),
                            question: "Sample question?",
                            type: "multiple-choice",
                            options: [
                                "Option A",
                                "Option B",
                                "Option C",
                                "Option D",
                            ],
                        },
                    ],
                };
            default:
                return {};
        }
    };

    const updateQuestion = (questionId, updatedQuestion) => {
        setForm((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === questionId ? { ...q, ...updatedQuestion } : q
            ),
        }));
    };

    const deleteQuestion = (questionId) => {
        setForm((prev) => ({
            ...prev,
            questions: prev.questions.filter((q) => q.id !== questionId),
        }));
    };

    const moveQuestion = (questionId, direction) => {
        const currentIndex = form.questions.findIndex(
            (q) => q.id === questionId
        );
        if (
            (direction === "up" && currentIndex === 0) ||
            (direction === "down" && currentIndex === form.questions.length - 1)
        ) {
            return;
        }

        const newQuestions = [...form.questions];
        const targetIndex =
            direction === "up" ? currentIndex - 1 : currentIndex + 1;
        [newQuestions[currentIndex], newQuestions[targetIndex]] = [
            newQuestions[targetIndex],
            newQuestions[currentIndex],
        ];

        setForm((prev) => ({ ...prev, questions: newQuestions }));
    };

    const saveForm = async () => {
        setIsSaving(true);
        try {
            const response = await fetch("/api/forms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                const savedForm = await response.json();
                router.push(`/preview/${savedForm.id}`);
            } else {
                alert("Failed to save form");
            }
        } catch (error) {
            alert("Error saving form");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Form Builder
                    </h1>

                    {/* Form Title */}
                    <div className="mb-6">
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

                    {/* Header Image */}
                    <HeaderImageUploader
                        image={form.headerImage}
                        onImageChange={(image) =>
                            setForm((prev) => ({ ...prev, headerImage: image }))
                        }
                    />
                </motion.div>

                {/* Questions */}
                <div className="space-y-6 mb-8">
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
                                    onSave={(updatedQuestion) => {
                                        updateQuestion(
                                            question.id,
                                            updatedQuestion
                                        );
                                        setIsEditing(null);
                                    }}
                                    onCancel={() => setIsEditing(null)}
                                />
                            ) : (
                                <QuestionCard
                                    question={question}
                                    onEdit={() => setIsEditing(question.id)}
                                    onDelete={() => deleteQuestion(question.id)}
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-lg p-6 mb-8"
                >
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Add Question
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button
                            variant="outline"
                            onClick={() => addQuestion("categorize")}
                            className="p-4 h-auto flex flex-col items-center"
                        >
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                <svg
                                    className="w-5 h-5 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                            </div>
                            <span className="font-medium">Categorize</span>
                            <span className="text-sm text-gray-500 text-center">
                                Drag & drop options into categories
                            </span>
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => addQuestion("cloze")}
                            className="p-4 h-auto flex flex-col items-center"
                        >
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                <svg
                                    className="w-5 h-5 text-green-600"
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
                            </div>
                            <span className="font-medium">Cloze</span>
                            <span className="text-sm text-gray-500 text-center">
                                Fill in the blanks
                            </span>
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => addQuestion("comprehension")}
                            className="p-4 h-auto flex flex-col items-center"
                        >
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                                <svg
                                    className="w-5 h-5 text-purple-600"
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
                            </div>
                            <span className="font-medium">Comprehension</span>
                            <span className="text-sm text-gray-500 text-center">
                                Passage with questions
                            </span>
                        </Button>
                    </div>
                </motion.div>

                {/* Save Button */}
                <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={() => router.push("/")}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={saveForm}
                        disabled={
                            !form.title ||
                            form.questions.length === 0 ||
                            isSaving
                        }
                    >
                        {isSaving ? "Saving..." : "Save & Preview"}
                    </Button>
                </div>
            </div>
        </Layout>
    );
}
