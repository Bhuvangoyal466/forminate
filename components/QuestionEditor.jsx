import { useState } from "react";
import Button from "./Button";

const QuestionEditor = ({ question, onSave, onCancel }) => {
    const [editedQuestion, setEditedQuestion] = useState({ ...question });

    const updateField = (field, value) => {
        setEditedQuestion((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateNestedField = (parentField, index, field, value) => {
        setEditedQuestion((prev) => ({
            ...prev,
            [parentField]: prev[parentField].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };

    const addOption = (field) => {
        setEditedQuestion((prev) => ({
            ...prev,
            [field]: [
                ...prev[field],
                field === "options"
                    ? `Option ${prev[field].length + 1}`
                    : `Category ${prev[field].length + 1}`,
            ],
        }));
    };

    const removeOption = (field, index) => {
        setEditedQuestion((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const addComprehensionQuestion = () => {
        setEditedQuestion((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    id: Date.now().toString(),
                    question: "New question?",
                    type: "multiple-choice",
                    options: ["Option A", "Option B", "Option C", "Option D"],
                },
            ],
        }));
    };

    const removeComprehensionQuestion = (index) => {
        setEditedQuestion((prev) => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index),
        }));
    };

    const renderTypeSpecificEditor = () => {
        switch (editedQuestion.type) {
            case "categorize":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Options to Categorize
                            </label>
                            {editedQuestion.options.map((option, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) =>
                                            updateField(
                                                "options",
                                                editedQuestion.options.map(
                                                    (opt, i) =>
                                                        i === index
                                                            ? e.target.value
                                                            : opt
                                                )
                                            )
                                        }
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {editedQuestion.options.length > 2 && (
                                        <button
                                            onClick={() =>
                                                removeOption("options", index)
                                            }
                                            className="px-2 py-2 text-red-600 hover:bg-red-50 rounded"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addOption("options")}
                            >
                                Add Option
                            </Button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Categories
                            </label>
                            {editedQuestion.categories.map(
                                (category, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2 mb-2"
                                    >
                                        <input
                                            type="text"
                                            value={category}
                                            onChange={(e) =>
                                                updateField(
                                                    "categories",
                                                    editedQuestion.categories.map(
                                                        (cat, i) =>
                                                            i === index
                                                                ? e.target.value
                                                                : cat
                                                    )
                                                )
                                            }
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {editedQuestion.categories.length >
                                            2 && (
                                            <button
                                                onClick={() =>
                                                    removeOption(
                                                        "categories",
                                                        index
                                                    )
                                                }
                                                className="px-2 py-2 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                )
                            )}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addOption("categories")}
                            >
                                Add Category
                            </Button>
                        </div>
                    </div>
                );

            case "cloze":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Text with blanks (use ___ for blanks)
                            </label>
                            <textarea
                                value={editedQuestion.text}
                                onChange={(e) =>
                                    updateField("text", e.target.value)
                                }
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="The quick ___ fox jumps over the ___ dog."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Correct answers (in order of blanks)
                            </label>
                            {editedQuestion.blanks.map((blank, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={blank}
                                        onChange={(e) =>
                                            updateField(
                                                "blanks",
                                                editedQuestion.blanks.map(
                                                    (b, i) =>
                                                        i === index
                                                            ? e.target.value
                                                            : b
                                                )
                                            )
                                        }
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={`Answer for blank ${
                                            index + 1
                                        }`}
                                    />
                                    {editedQuestion.blanks.length > 1 && (
                                        <button
                                            onClick={() =>
                                                removeOption("blanks", index)
                                            }
                                            className="px-2 py-2 text-red-600 hover:bg-red-50 rounded"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addOption("blanks")}
                            >
                                Add Blank
                            </Button>
                        </div>
                    </div>
                );

            case "comprehension":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Passage
                            </label>
                            <textarea
                                value={editedQuestion.passage}
                                onChange={(e) =>
                                    updateField("passage", e.target.value)
                                }
                                rows={5}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter the passage text here..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Questions
                            </label>
                            {editedQuestion.questions.map(
                                (compQuestion, index) => (
                                    <div
                                        key={compQuestion.id}
                                        className="border border-gray-200 rounded p-4 mb-4"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="font-medium text-gray-900">
                                                Question {index + 1}
                                            </h4>
                                            {editedQuestion.questions.length >
                                                1 && (
                                                <button
                                                    onClick={() =>
                                                        removeComprehensionQuestion(
                                                            index
                                                        )
                                                    }
                                                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            value={compQuestion.question}
                                            onChange={(e) =>
                                                updateNestedField(
                                                    "questions",
                                                    index,
                                                    "question",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                                            placeholder="Enter question..."
                                        />
                                        <div className="space-y-2">
                                            {compQuestion.options.map(
                                                (option, optIndex) => (
                                                    <input
                                                        key={optIndex}
                                                        type="text"
                                                        value={option}
                                                        onChange={(e) => {
                                                            const newOptions = [
                                                                ...compQuestion.options,
                                                            ];
                                                            newOptions[
                                                                optIndex
                                                            ] = e.target.value;
                                                            updateNestedField(
                                                                "questions",
                                                                index,
                                                                "options",
                                                                newOptions
                                                            );
                                                        }}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder={`Option ${
                                                            optIndex + 1
                                                        }`}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={addComprehensionQuestion}
                            >
                                Add Question
                            </Button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question Title
                    </label>
                    <input
                        type="text"
                        value={editedQuestion.title}
                        onChange={(e) => updateField("title", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter question title..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description (Optional)
                    </label>
                    <textarea
                        value={editedQuestion.description}
                        onChange={(e) =>
                            updateField("description", e.target.value)
                        }
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter question description..."
                    />
                </div>

                {renderTypeSpecificEditor()}

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => onSave(editedQuestion)}
                    >
                        Save Question
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuestionEditor;
