import { motion } from "framer-motion";

const ProgressBar = ({ currentStep, totalSteps, className = "" }) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className={`w-full ${className}`}>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                    Question {currentStep} of {totalSteps}
                </span>
                <span className="text-sm text-gray-500">
                    {Math.round(progress)}% complete
                </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
