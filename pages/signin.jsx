import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

export default function SignIn() {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Clear error when user starts typing
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Use auth context to handle login
                login(data.user, data.token);

                // Redirect to form builder or dashboard
                router.push("/form-builder");
            } else {
                setError(data.message || "Something went wrong");
            }
        } catch (error) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style jsx global>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
            <Layout>
                <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
                        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-2000"></div>
                    </div>

                    <div className="max-w-md w-full space-y-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
                        >
                            {/* Header */}
                            <div className="text-center mb-8">
                                <Link
                                    href="/"
                                    className="inline-flex items-center mb-6"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mr-3 flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">
                                            F
                                        </span>
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900">
                                        Forminate
                                    </span>
                                </Link>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                    Welcome back
                                </h2>
                                <p className="text-gray-600">
                                    Sign in to your account to continue building
                                    amazing forms
                                </p>
                            </div>

                            {/* Demo credentials */}
                            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                <p className="text-sm font-medium text-blue-800 mb-2">
                                    Demo Credentials:
                                </p>
                                <p className="text-sm text-blue-700">
                                    Email:{" "}
                                    <span className="font-mono font-bold">
                                        demo@forminate.com
                                    </span>
                                </p>
                                <p className="text-sm text-blue-700">
                                    Password:{" "}
                                    <span className="font-mono font-bold">
                                        password123
                                    </span>
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white/70"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white/70"
                                        placeholder="Enter your password"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label
                                            htmlFor="remember-me"
                                            className="ml-2 block text-sm text-gray-700"
                                        >
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <a
                                            href="#"
                                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    disabled={loading}
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white font-semibold shadow-xl"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Signing in...
                                        </div>
                                    ) : (
                                        "Sign in"
                                    )}
                                </Button>

                                <div className="text-center">
                                    <span className="text-gray-600">
                                        Don't have an account?{" "}
                                        <Link
                                            href="/signup"
                                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                                        >
                                            Sign up
                                        </Link>
                                    </span>
                                </div>
                            </form>

                            {/* Social signin options */}
                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
                                        <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            />
                                        </svg>
                                        <span className="ml-2">Google</span>
                                    </button>

                                    <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                        <span className="ml-2">Facebook</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
