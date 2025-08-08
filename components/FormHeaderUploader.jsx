import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Button from "./Button";

const FormHeaderUploader = ({ headerImage, onImageChange, className = "" }) => {
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = async (file) => {
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file");
            return;
        }

        setUploading(true);

        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const reader = new FileReader();
        reader.onload = (e) => {
            onImageChange(e.target.result);
            setUploading(false);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        onImageChange(null);
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <label className="block text-sm font-medium text-gray-700">
                Header Image
            </label>

            {headerImage ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group"
                >
                    <img
                        src={headerImage}
                        alt="Header"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <Button
                            onClick={removeImage}
                            variant="danger"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                            Remove Image
                        </Button>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                        dragActive
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    whileHover={{ scale: 1.01 }}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                    />

                    {uploading ? (
                        <div className="space-y-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="text-gray-600">Uploading image...</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div>
                                <p className="text-gray-600">
                                    <span
                                        className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                    >
                                        Upload an image
                                    </span>{" "}
                                    or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default FormHeaderUploader;
