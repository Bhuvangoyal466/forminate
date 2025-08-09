import { motion } from "framer-motion";

const QuestionCard = ({
    question,
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
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-blue-600"
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
                );
            case "cloze":
                return (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-green-600"
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
                );
            case "comprehension":
                return (
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-purple-600"
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
                );
            default:
                return null;
        }
    };

    const getQuestionTypeName = (type) => {
        switch (type) {
            case "categorize":
                return "Categorize";
            case "cloze":
                return "Cloze";
            case "comprehension":
                return "Comprehension";
            default:
                return "Unknown";
        }
    };

    const renderQuestionPreview = () => {
        switch (question.type) {
            case "categorize":
                return (
                    <div className="mt-4 space-y-3">
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Options:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {question.options?.map((option, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                                    >
                                        {option}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Categories:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {question.categories?.map((category, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border-2 border-dashed border-gray-300"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case "cloze":
                return (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            Text:
                        </p>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded border">
                            {question.text}
                        </p>
                        {question.blanks && question.blanks.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm font-medium text-gray-700 mb-1">
                                    Answers:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {question.blanks.map((blank, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm"
                                        >
                                            {blank}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            case "comprehension":
                return (
                    <div className="mt-4 space-y-3">
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Passage:
                            </p>
                            <p className="text-gray-600 bg-gray-50 p-3 rounded border text-sm">
                                {question.passage?.substring(0, 150)}
                                {question.passage?.length > 150 ? "..." : ""}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Questions ({question.questions?.length || 0}):
                            </p>
                            <div className="space-y-2">
                                {question.questions
                                    ?.slice(0, 2)
                                    .map((q, index) => (
                                        <div
                                            key={q.id}
                                            className="text-sm text-gray-600 bg-gray-50 p-2 rounded"
                                        >
                                            {index + 1}. {q.question}
                                        </div>
                                    ))}
                                {question.questions?.length > 2 && (
                                    <p className="text-xs text-gray-500">
                                        +{question.questions.length - 2} more
                                        questions
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <motion.div
            layout
            className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {getQuestionTypeIcon(question.type)}
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">
                                {question.title || "Untitled Question"}
                            </h3>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                {getQuestionTypeName(question.type)}
                            </span>
                        </div>
                        {question.description && (
                            <p className="text-gray-600 text-sm mt-1">
                                {question.description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                    {/* Move buttons */}
                    <button
                        onClick={onMoveUp}
                        disabled={!canMoveUp}
                        className={`p-1 rounded hover:bg-gray-100 ${
                            !canMoveUp ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        title="Move up"
                    >
                        <svg
                            className="w-4 h-4 text-gray-600"
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
                        onClick={onMoveDown}
                        disabled={!canMoveDown}
                        className={`p-1 rounded hover:bg-gray-100 ${
                            !canMoveDown ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        title="Move down"
                    >
                        <svg
                            className="w-4 h-4 text-gray-600"
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

                    {/* Edit button */}
                    <button
                        onClick={onEdit}
                        className="p-1 rounded hover:bg-gray-100"
                        title="Edit question"
                    >
                        <svg
                            className="w-4 h-4 text-gray-600"
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
                    </button>

                    {/* Delete button */}
                    <button
                        onClick={onDelete}
                        className="p-1 rounded hover:bg-red-50"
                        title="Delete question"
                    >
                        <svg
                            className="w-4 h-4 text-red-600"
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
                    </button>
                </div>
            </div>

            {/* Question Image */}
            {question.image && (
                <div className="mb-4">
                    <img
                        src={question.image}
                        alt="Question"
                        className="max-w-full h-auto rounded border"
                    />
                </div>
            )}

            {/* Question Preview */}
            {renderQuestionPreview()}
        </motion.div>
    );
};

export default QuestionCard;
