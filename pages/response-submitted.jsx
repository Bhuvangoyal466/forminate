import { motion } from "framer-motion";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { useRouter } from "next/router";

export default function ResponseSubmitted() {
    const router = useRouter();

    return (
        <Layout>
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-md mx-auto"
                >
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 200,
                        }}
                        className="mb-8"
                    >
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <svg
                                className="w-12 h-12 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Success Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Thank You!
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Your response has been successfully submitted. We
                            appreciate your time and feedback.
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-4"
                    >
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => router.push("/")}
                            className="w-full"
                        >
                            Go to Home
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => router.push("/form-builder")}
                            className="w-full"
                        >
                            Create Another Form
                        </Button>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 p-4 bg-blue-50 rounded-lg"
                    >
                        <p className="text-sm text-blue-800">
                            Your response ID: #
                            {Math.random()
                                .toString(36)
                                .substr(2, 9)
                                .toUpperCase()}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                            Keep this ID for your records
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </Layout>
    );
}
