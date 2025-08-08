import { useState } from "react";
import { motion } from "framer-motion";

const ClozeQuestion = ({
    question,
    onAnswer,
    selectedAnswer,
    isPreview = false,
    className = "",
}) => {
    const [answer, setAnswer] = useState(selectedAnswer || "");

    const handleAnswerChange = (e) => {
        const value = e.target.value;
        setAnswer(value);
        if (onAnswer) {
            onAnswer(value);
        }
    };

    if (!question) {
        return (
            <div className={`space-y-6 ${className}`}>
                <div className="text-center space-y-4">
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                        Cloze Question
                    </h3>
                    <p className="text-gray-600">
                        This question type allows users to fill in the blank or
                        provide a text response
                    </p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`space-y-6 ${className}`}
        >
            {/* Question Header */}
            <div className="text-center space-y-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {question.title}
                </h1>
                {question.subtitle && (
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {question.subtitle}
                    </p>
                )}
                {question.image && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center"
                    >
                        <img
                            src={question.image}
                            alt="Question"
                            className="max-w-md w-full h-auto rounded-lg shadow-md"
                        />
                    </motion.div>
                )}
            </div>

            {/* Text Input */}
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <textarea
                        value={answer}
                        onChange={handleAnswerChange}
                        placeholder={
                            question.placeholder || "Type your answer here..."
                        }
                        rows={4}
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none transition-colors duration-200 text-lg"
                    />
                </motion.div>

                {/* Character count (optional) */}
                <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                    <span>{answer.length} characters</span>
                    {question.maxLength && (
                        <span>
                            {question.maxLength - answer.length} remaining
                        </span>
                    )}
                </div>
            </div>

            {/* Required indicator */}
            {question.required && (
                <p className="text-center text-sm text-gray-500">
                    * This question is required
                </p>
            )}
        </motion.div>
    );
};

export default ClozeQuestion;
