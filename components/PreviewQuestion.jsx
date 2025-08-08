import { motion } from "framer-motion";
import CategorizeQuestion from "./CategorizeQuestion";
import ClozeQuestion from "./ClozeQuestion";
import ComprehensionQuestion from "./ComprehensionQuestion";

const PreviewQuestion = ({
    question,
    onAnswer,
    selectedAnswer,
    className = "",
}) => {
    const renderQuestion = () => {
        switch (question?.type) {
            case "categorize":
                return (
                    <CategorizeQuestion
                        question={question}
                        onAnswer={onAnswer}
                        selectedAnswer={selectedAnswer}
                        isPreview={true}
                    />
                );
            case "cloze":
                return (
                    <ClozeQuestion
                        question={question}
                        onAnswer={onAnswer}
                        selectedAnswer={selectedAnswer}
                        isPreview={true}
                    />
                );
            case "comprehension":
                return (
                    <ComprehensionQuestion
                        question={question}
                        onAnswer={onAnswer}
                        selectedAnswer={selectedAnswer}
                        isPreview={true}
                    />
                );
            default:
                return (
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                            <svg
                                className="w-8 h-8 text-gray-400"
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
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            Unknown Question Type
                        </h3>
                        <p className="text-gray-600">
                            This question type is not supported yet
                        </p>
                    </div>
                );
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={`w-full ${className}`}
        >
            {renderQuestion()}
        </motion.div>
    );
};

export default PreviewQuestion;
