import { useState } from "react";

const DragDropCategorize = ({ question, onResponseChange }) => {
    const [categoryItems, setCategoryItems] = useState(() => {
        const categories = {};
        question.categories.forEach((cat) => {
            categories[cat] = [];
        });
        return categories;
    });

    const [availableItems, setAvailableItems] = useState([...question.options]);
    const [draggedItem, setDraggedItem] = useState(null);

    const handleDragStart = (e, item, source) => {
        setDraggedItem({ item, source });
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e, targetCategory) => {
        e.preventDefault();
        if (!draggedItem) return;

        const { item, source } = draggedItem;

        // Remove item from source
        if (source === "available") {
            setAvailableItems((prev) => prev.filter((i) => i !== item));
        } else {
            setCategoryItems((prev) => ({
                ...prev,
                [source]: prev[source].filter((i) => i !== item),
            }));
        }

        // Add item to target
        if (targetCategory === "available") {
            setAvailableItems((prev) => [...prev, item]);
        } else {
            setCategoryItems((prev) => ({
                ...prev,
                [targetCategory]: [...prev[targetCategory], item],
            }));
        }

        setDraggedItem(null);

        // Update response
        const newCategoryItems = { ...categoryItems };
        if (targetCategory !== "available") {
            newCategoryItems[targetCategory] = [
                ...(newCategoryItems[targetCategory] || []),
                item,
            ];
        }
        if (source !== "available") {
            newCategoryItems[source] = newCategoryItems[source].filter(
                (i) => i !== item
            );
        }
        onResponseChange(newCategoryItems);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    return (
        <div className="space-y-6">
            {/* Available Items */}
            <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                    Available Items
                </h4>
                <div
                    className="min-h-[80px] border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "available")}
                >
                    <div className="flex flex-wrap gap-2">
                        {availableItems.map((item, index) => (
                            <div
                                key={index}
                                draggable
                                onDragStart={(e) =>
                                    handleDragStart(e, item, "available")
                                }
                                onDragEnd={handleDragEnd}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-move hover:shadow-md transition-shadow"
                            >
                                {item}
                            </div>
                        ))}
                        {availableItems.length === 0 && (
                            <p className="text-gray-500 italic">
                                Drag items here or to categories below
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                    Categories
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.categories.map((category, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-lg p-4 bg-white"
                        >
                            <h5 className="font-medium text-gray-800 mb-3">
                                {category}
                            </h5>
                            <div
                                className="min-h-[100px] border-2 border-dashed border-blue-300 rounded-lg p-3 bg-blue-50"
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, category)}
                            >
                                <div className="space-y-2">
                                    {categoryItems[category]?.map(
                                        (item, itemIndex) => (
                                            <div
                                                key={itemIndex}
                                                draggable
                                                onDragStart={(e) =>
                                                    handleDragStart(
                                                        e,
                                                        item,
                                                        category
                                                    )
                                                }
                                                onDragEnd={handleDragEnd}
                                                className="px-3 py-2 bg-white border border-blue-300 rounded cursor-move hover:shadow-md transition-shadow"
                                            >
                                                {item}
                                            </div>
                                        )
                                    )}
                                    {(!categoryItems[category] ||
                                        categoryItems[category].length ===
                                            0) && (
                                        <p className="text-gray-500 italic text-sm">
                                            Drop items here
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Touch/Mobile Support Instructions */}
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <p>
                    <strong>Instructions:</strong> Drag and drop items from
                    "Available Items" into the appropriate categories below. You
                    can also move items between categories.
                </p>
            </div>
        </div>
    );
};

export default DragDropCategorize;
