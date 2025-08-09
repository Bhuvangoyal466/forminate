import { useState } from "react";

const ClozeQuestion = ({ question, onResponseChange }) => {
    const [answers, setAnswers] = useState({});

    // Parse the text to find blanks and create input fields
    const parseTextWithBlanks = () => {
        if (!question?.text) return [];

        const parts = question.text.split("___");
        const elements = [];

        for (let i = 0; i < parts.length; i++) {
            // Add text part
            if (parts[i]) {
                elements.push(
                    <span key={`text-${i}`} className="text-gray-800">
                        {parts[i]}
                    </span>
                );
            }

            // Add input for blank (except after the last part)
            if (i < parts.length - 1) {
                elements.push(
                    <input
                        key={`blank-${i}`}
                        type="text"
                        value={answers[i] || ""}
                        onChange={(e) => handleAnswerChange(i, e.target.value)}
                        className="inline-block mx-1 px-2 py-1 border-b-2 border-blue-300 bg-transparent focus:border-blue-500 focus:outline-none min-w-[80px] text-center"
                        placeholder={`Blank ${i + 1}`}
                    />
                );
            }
        }

        return elements;
    };

    const handleAnswerChange = (blankIndex, value) => {
        const newAnswers = { ...answers, [blankIndex]: value };
        setAnswers(newAnswers);
        if (onResponseChange) {
            onResponseChange(newAnswers);
        }
    };

    return (
        <div className="space-y-6">
            {/* Instructions */}
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <p>
                    <strong>Instructions:</strong> Fill in the blanks with
                    appropriate words to complete the text.
                </p>
            </div>

            {/* Text with blanks */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-lg leading-relaxed">
                    {parseTextWithBlanks()}
                </div>
            </div>

            {/* Answer summary */}
            {Object.keys(answers).length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">
                        Your Answers:
                    </h4>
                    <div className="space-y-1">
                        {Object.entries(answers).map(([index, answer]) => (
                            <div key={index} className="text-sm text-blue-700">
                                Blank {parseInt(index) + 1}:{" "}
                                <span className="font-medium">
                                    {answer || "(empty)"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClozeQuestion;
