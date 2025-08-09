import { useState } from "react";

const ComprehensionQuestion = ({ question, onResponseChange }) => {
    const [responses, setResponses] = useState({});

    const handleOptionSelect = (questionId, selectedOption) => {
        const newResponses = { ...responses, [questionId]: selectedOption };
        setResponses(newResponses);
        if (onResponseChange) {
            onResponseChange(newResponses);
        }
    };

    return (
        <div className="space-y-8">
            {/* Instructions */}
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <p>
                    <strong>Instructions:</strong> Read the passage below
                    carefully and then answer the questions that follow.
                </p>
            </div>

            {/* Passage */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Reading Passage
                </h4>
                <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {question.passage}
                    </p>
                </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900">
                    Questions
                </h4>
                {question.questions?.map((subQuestion, index) => (
                    <div
                        key={subQuestion.id}
                        className="bg-white border border-gray-200 rounded-lg p-6"
                    >
                        <div className="mb-4">
                            <h5 className="text-base font-medium text-gray-900 mb-2">
                                {index + 1}. {subQuestion.question}
                            </h5>
                        </div>

                        {subQuestion.type === "multiple-choice" && (
                            <div className="space-y-3">
                                {subQuestion.options?.map(
                                    (option, optionIndex) => (
                                        <label
                                            key={optionIndex}
                                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                                                responses[subQuestion.id] ===
                                                option
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name={subQuestion.id}
                                                value={option}
                                                checked={
                                                    responses[
                                                        subQuestion.id
                                                    ] === option
                                                }
                                                onChange={() =>
                                                    handleOptionSelect(
                                                        subQuestion.id,
                                                        option
                                                    )
                                                }
                                                className="sr-only"
                                            />
                                            <div
                                                className={`w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center ${
                                                    responses[
                                                        subQuestion.id
                                                    ] === option
                                                        ? "border-blue-500"
                                                        : "border-gray-300"
                                                }`}
                                            >
                                                {responses[subQuestion.id] ===
                                                    option && (
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                )}
                                            </div>
                                            <span className="text-gray-700">
                                                {option}
                                            </span>
                                        </label>
                                    )
                                )}
                            </div>
                        )}

                        {subQuestion.type === "text" && (
                            <textarea
                                value={responses[subQuestion.id] || ""}
                                onChange={(e) =>
                                    handleOptionSelect(
                                        subQuestion.id,
                                        e.target.value
                                    )
                                }
                                placeholder="Type your answer here..."
                                rows={3}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Progress indicator */}
            {question.questions && question.questions.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between text-sm text-blue-800">
                        <span>Progress:</span>
                        <span>
                            {Object.keys(responses).length} of{" "}
                            {question.questions.length} questions answered
                        </span>
                    </div>
                    <div className="mt-2 bg-blue-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{
                                width: `${
                                    (Object.keys(responses).length /
                                        question.questions.length) *
                                    100
                                }%`,
                            }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComprehensionQuestion;
