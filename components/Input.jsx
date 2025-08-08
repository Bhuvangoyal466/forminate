import { forwardRef } from "react";
import { motion } from "framer-motion";

const Input = forwardRef(
    (
        {
            label,
            error,
            type = "text",
            placeholder,
            className = "",
            containerClassName = "",
            required = false,
            ...props
        },
        ref
    ) => {
        const baseInputClasses =
            "w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
        const errorClasses = error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300";
        const inputClasses = `${baseInputClasses} ${errorClasses} ${className}`;

        return (
            <motion.div
                className={`space-y-2 ${containerClassName}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                {label && (
                    <label className="block text-sm font-medium text-gray-700">
                        {label}
                        {required && (
                            <span className="text-red-500 ml-1">*</span>
                        )}
                    </label>
                )}
                <input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    className={inputClasses}
                    {...props}
                />
                {error && (
                    <motion.p
                        className="text-red-500 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {error}
                    </motion.p>
                )}
            </motion.div>
        );
    }
);

Input.displayName = "Input";

export default Input;
