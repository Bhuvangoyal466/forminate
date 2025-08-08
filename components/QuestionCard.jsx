import { motion } from "framer-motion";
import Button from "./Button";

const QuestionCard = ({
    question,
    index,
    onEdit,
    onDelete,
    onMoveUp,
    onMoveDown,
    canMoveUp,
    canMoveDown,
    className = "",
}) => {
    const getQuestionTypeIcon = (type) => {
        switch (type) {
            case "categorize":
                return (
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
                            d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2a2 2 0 002-2V7a2 2 0 00-2-2H9m0 10V9a2 2 0 012-2h2"
                        />
                    </svg>
                );
            case "cloze":
                return (
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                );
            case "comprehension":
                return (
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
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                    </svg>
                );
            default:
                return (
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
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                );
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ y: -2 }}
            className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                    {/* Question Number & Type */}
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                                {index + 1}
                            </span>
                        </div>
                    </div>

                    {/* Question Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="text-blue-600">
                                {getQuestionTypeIcon(question.type)}
                            </div>
                            <span className="text-sm font-medium text-gray-500 capitalize">
                                {question.type} Question
                            </span>
                            {question.required && (
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                    Required
                                </span>
                            )}
                        </div>

                        <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                            {question.title || "Untitled Question"}
                        </h3>

                        {question.subtitle && (
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {question.subtitle}
                            </p>
                        )}

                        {question.image && (
                            <div className="mb-3">
                                <img
                                    src={question.image}
                                    alt="Question"
                                    className="w-20 h-12 object-cover rounded border"
                                />
                            </div>
                        )}

                        {/* Question Type Specific Preview */}
                        {question.type === "categorize" && question.options && (
                            <div className="flex flex-wrap gap-2">
                                {question.options
                                    .slice(0, 3)
                                    .map((option, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                                        >
                                            {option}
                                        </span>
                                    ))}
                                {question.options.length > 3 && (
                                    <span className="text-xs text-gray-500">
                                        +{question.options.length - 3} more
                                    </span>
                                )}
                            </div>
                        )}

                        {question.type === "cloze" && question.placeholder && (
                            <div className="text-sm text-gray-500 italic">
                                "{question.placeholder}"
                            </div>
                        )}

                        {question.type === "comprehension" &&
                            question.options && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">
                                        Rating scale:
                                    </span>
                                    <span className="text-sm font-medium">
                                        {question.options[0]?.value} -{" "}
                                        {
                                            question.options[
                                                question.options.length - 1
                                            ]?.value
                                        }
                                    </span>
                                </div>
                            )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2 ml-4">
                    {/* Move buttons */}
                    <div className="flex space-x-1">
                        <button
                            onClick={() => onMoveUp(question.id)}
                            disabled={!canMoveUp}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 15l7-7 7 7"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={() => onMoveDown(question.id)}
                            disabled={!canMoveDown}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Edit and Delete */}
                    <div className="flex space-x-1">
                        <Button
                            onClick={() => onEdit(question)}
                            variant="ghost"
                            size="sm"
                            className="p-2 h-8 w-8"
                        >
                            <svg
                                className="w-4 h-4"
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
                        </Button>
                        <Button
                            onClick={() => onDelete(question.id)}
                            variant="ghost"
                            size="sm"
                            className="p-2 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default QuestionCard;
