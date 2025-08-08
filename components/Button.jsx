import { motion } from "framer-motion";

const Button = ({
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    onClick,
    type = "button",
    className = "",
    ...props
}) => {
    const baseClasses =
        "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-md hover:shadow-lg",
        secondary:
            "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500 border border-gray-300",
        outline:
            "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500",
        ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
        danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-md hover:shadow-lg",
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
        xl: "px-8 py-4 text-xl",
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className={classes}
            disabled={disabled}
            onClick={onClick}
            type={type}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
