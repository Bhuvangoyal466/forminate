import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import PreviewQuestion from "../../components/PreviewQuestion";
import { fetchFormById, fetchFormForPreview, submitFormResponse } from "../../lib/api";
import { toast } from "react-toastify";

export default function PreviewForm() {
    const router = useRouter();
    const { id } = router.query;

    const [form, setForm] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

    useEffect(() => {
        if (id) {
            loadForm();
        }
    }, [id]);

    const loadForm = async () => {
        try {
            setIsLoading(true);
            let formData;
            
            try {
                // First try to load as preview (for authenticated users viewing their own forms)
                formData = await fetchFormForPreview(id);
            } catch (previewError) {
                // If preview fails, fall back to public form access
                console.log("Preview failed, trying public access:", previewError);
                formData = await fetchFormById(id);
            }
            
            setForm(formData);
        } catch (error) {
            console.error("Failed to load form:", error);
            toast.error("Failed to load form");
            router.push("/");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswer = (answer) => {
        const currentQuestion = form.questions[currentQuestionIndex];
        setResponses((prev) => ({
            ...prev,
            [currentQuestion.id]: answer,
        }));
    };

    const canProceed = () => {
        const currentQuestion = form.questions[currentQuestionIndex];
        const currentAnswer = responses[currentQuestion.id];

        if (currentQuestion.required) {
            return (
                currentAnswer !== undefined &&
                currentAnswer !== "" &&
                currentAnswer !== null
            );
        }
        return true;
    };

    const handleNext = () => {
        if (!canProceed()) return;

        if (currentQuestionIndex < form.questions.length - 1) {
            setDirection(1);
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setDirection(-1);
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await submitFormResponse(id, responses);
            toast.success("Form submitted successfully!");
            setIsCompleted(true);
        } catch (error) {
            console.error("Failed to submit form:", error);
            toast.error("Failed to submit form. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && canProceed()) {
            handleNext();
        } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
            e.preventDefault();
            handlePrevious();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [currentQuestionIndex, responses]);

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-screen">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading form...</p>
                    </motion.div>
                </div>
            </Layout>
        );
    }

    if (!form) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-screen">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Form Not Found
                        </h1>
                        <p className="text-gray-600 mb-6">
                            The form you're looking for doesn't exist or has
                            been removed.
                        </p>
                        <Button onClick={() => router.push("/")}>
                            Go Back Home
                        </Button>
                    </motion.div>
                </div>
            </Layout>
        );
    }

    if (isCompleted) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-md mx-auto px-4"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: 0.2,
                                type: "spring",
                                stiffness: 300,
                            }}
                            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <svg
                                className="w-10 h-10 text-white"
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
                        </motion.div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Thank You!
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Your response has been submitted successfully.
                        </p>
                        <Button onClick={() => router.push("/")}>
                            Create Your Own Form
                        </Button>
                    </motion.div>
                </div>
            </Layout>
        );
    }

    const currentQuestion = form.questions[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Progress Bar */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <ProgressBar
                        currentStep={currentQuestionIndex + 1}
                        totalSteps={form.questions.length}
                    />
                </div>
            </div>

            {/* Form Content */}
            {/* Form Title */}
            {currentQuestionIndex === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto px-4 py-8 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {form.title}
                    </h1>
                    {form.description && (
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {form.description}
                        </p>
                    )}
                </motion.div>
            )}

            {/* Question Content */}
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-4xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQuestionIndex}
                            initial={{ opacity: 0, x: direction * 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction * -100 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <PreviewQuestion
                                question={currentQuestion}
                                onAnswer={handleAnswer}
                                selectedAnswer={responses[currentQuestion.id]}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation */}
            <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <Button
                            variant="ghost"
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            className="flex items-center"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
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
                            Previous
                        </Button>

                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>Press</span>
                            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                                Enter
                            </kbd>
                            <span>to continue</span>
                        </div>

                        {currentQuestionIndex < form.questions.length - 1 ? (
                            <Button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className="flex items-center"
                            >
                                Next
                                <svg
                                    className="w-4 h-4 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                disabled={!canProceed() || isSubmitting}
                                className="flex items-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        Submit
                                        <svg
                                            className="w-4 h-4 ml-2"
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
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
