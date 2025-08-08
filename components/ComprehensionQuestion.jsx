import { useState } from "react";
import { motion } from "framer-motion";

const ComprehensionQuestion = ({
    question,
    onAnswer,
    selectedAnswer,
    isPreview = false,
    className = "",
}) => {
    const [selectedRating, setSelectedRating] = useState(
        selectedAnswer || null
    );

    const handleRatingSelect = (rating) => {
        setSelectedRating(rating);
        if (onAnswer) {
            onAnswer(rating);
        }
    };

    if (!question) {
        return (
            <div className={`space-y-6 ${className}`}>
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                        <svg
                            className="w-8 h-8 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                        Comprehension Question
                    </h3>
                    <p className="text-gray-600">
                        This question type allows users to rate or evaluate
                        something on a scale
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

            {/* Rating Scale */}
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    {/* Scale options */}
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        {question.options?.map((option, index) => (
                            <motion.button
                                key={option.value}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 * index }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleRatingSelect(option.value)}
                                className={`flex flex-col items-center space-y-2 p-4 rounded-lg transition-all duration-200 min-w-[80px] ${
                                    selectedRating === option.value
                                        ? "bg-blue-500 text-white shadow-lg"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }`}
                            >
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                                        selectedRating === option.value
                                            ? "bg-white text-blue-500"
                                            : "bg-white text-gray-700"
                                    }`}
                                >
                                    {option.value}
                                </div>
                                <span className="text-sm font-medium text-center">
                                    {option.label}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Scale labels */}
                    {question.options && question.options.length > 0 && (
                        <div className="flex justify-between text-sm text-gray-500 px-4">
                            <span>{question.options[0].label}</span>
                            <span>
                                {
                                    question.options[
                                        question.options.length - 1
                                    ].label
                                }
                            </span>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Selected rating display */}
            {selectedRating !== null && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <p className="text-lg text-gray-600">
                        You selected:{" "}
                        <span className="font-semibold text-blue-600">
                            {selectedRating}
                        </span>
                    </p>
                </motion.div>
            )}

            {/* Required indicator */}
            {question.required && (
                <p className="text-center text-sm text-gray-500">
                    * This question is required
                </p>
            )}
        </motion.div>
    );
};

export default ComprehensionQuestion;
