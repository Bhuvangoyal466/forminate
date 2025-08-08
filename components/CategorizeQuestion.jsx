import { useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button";

const CategorizeQuestion = ({
    question,
    onAnswer,
    selectedAnswer,
    isPreview = false,
    className = "",
}) => {
    const [selectedOption, setSelectedOption] = useState(selectedAnswer || "");

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        if (onAnswer) {
            onAnswer(option);
        }
    };

    if (!question) {
        return (
            <div className={`space-y-6 ${className}`}>
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <svg
                            className="w-8 h-8 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2a2 2 0 002-2V7a2 2 0 00-2-2H9m0 10V9a2 2 0 012-2h2"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                        Categorize Question
                    </h3>
                    <p className="text-gray-600">
                        This question type allows users to select from
                        predefined categories
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

            {/* Options */}
            <div className="space-y-3 max-w-lg mx-auto">
                {question.options?.map((option, index) => (
                    <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOptionSelect(option)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                            selectedOption === option
                                ? "border-blue-500 bg-blue-50 text-blue-900"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                        <div className="flex items-center space-x-3">
                            <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    selectedOption === option
                                        ? "border-blue-500 bg-blue-500"
                                        : "border-gray-300"
                                }`}
                            >
                                {selectedOption === option && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                            </div>
                            <span className="font-medium">{option}</span>
                        </div>
                    </motion.button>
                ))}
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

export default CategorizeQuestion;
