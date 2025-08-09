import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import Button from "../components/Button";

export default function Home() {
    return (
        <>
            <style jsx global>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }

                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                @keyframes gradient-x {
                    0%,
                    100% {
                        background-size: 200% 200%;
                        background-position: left center;
                    }
                    50% {
                        background-size: 200% 200%;
                        background-position: right center;
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-gradient-x {
                    animation: gradient-x 3s ease infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                .animation-delay-1000 {
                    animation-delay: 1s;
                }

                .perspective-1000 {
                    perspective: 1000px;
                }

                .bg-grid-pattern {
                    background-image: radial-gradient(
                        circle,
                        #e5e7eb 1px,
                        transparent 1px
                    );
                    background-size: 50px 50px;
                }

                .shadow-3xl {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
                }
            `}</style>
            <Layout>
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 min-h-screen flex items-center">
                    {/* Animated background elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
                        <div className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-6 border border-blue-200">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                    Now with AI-powered form suggestions
                                </div>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tight">
                                    Beautiful forms that{" "}
                                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                                        convert
                                    </span>
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                                    Create stunning, interactive forms with the
                                    simplicity of Typeform. Engage your audience
                                    with smooth animations and professional
                                    design.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.3,
                                    ease: "easeOut",
                                }}
                                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                            >
                                <Link href="/form-builder">
                                    <Button
                                        variant="primary"
                                        size="xl"
                                        className="px-10 py-5 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                                    >
                                        Create Your First Form
                                        <svg
                                            className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="xl"
                                    className="px-10 py-5 text-lg font-semibold border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    View Live Demo
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                    rotateX: -15,
                                }}
                                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.6,
                                    ease: "easeOut",
                                }}
                                className="mt-20 perspective-1000"
                            >
                                <div className="relative max-w-6xl mx-auto">
                                    {/* Floating elements around the main card */}
                                    <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl rotate-12 opacity-80 animate-float"></div>
                                    <div className="absolute -top-4 -right-8 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-70 animate-float animation-delay-1000"></div>
                                    <div className="absolute -bottom-6 -left-8 w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg -rotate-12 opacity-60 animate-float animation-delay-2000"></div>

                                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                                        <div className="flex items-center space-x-4 mb-10">
                                            <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-lg"></div>
                                            <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg"></div>
                                            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg"></div>
                                            <div className="flex-1 bg-gray-100 rounded-full h-2 ml-4">
                                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-3/4 animate-pulse"></div>
                                            </div>
                                        </div>

                                        {/* Form Creation Showcase */}
                                        <div className="text-center mb-12 relative">
                                            {/* Enhanced background decoration */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 via-purple-50/80 to-pink-50/80 rounded-3xl -m-6 opacity-60 blur-sm"></div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 via-purple-100/40 to-pink-100/40 rounded-3xl -m-4"></div>
                                            <div className="relative z-10 py-8">
                                                <motion.h3
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay: 0.8,
                                                        duration: 0.6,
                                                    }}
                                                    className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
                                                >
                                                    Create Professional Forms in
                                                    Minutes
                                                </motion.h3>
                                                <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{
                                                        delay: 1,
                                                        duration: 0.8,
                                                    }}
                                                    className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-6 rounded-full shadow-lg"
                                                ></motion.div>
                                                <motion.p
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay: 1.1,
                                                        duration: 0.6,
                                                    }}
                                                    className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium"
                                                >
                                                    Build engaging forms with
                                                    multiple question types,
                                                    interactive elements, and
                                                    beautiful animations
                                                </motion.p>
                                                {/* Enhanced decorative elements */}
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    transition={{
                                                        delay: 1.3,
                                                        duration: 0.5,
                                                    }}
                                                    className="flex justify-center space-x-3 mt-8"
                                                >
                                                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce shadow-lg"></div>
                                                    <div
                                                        className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-bounce shadow-lg"
                                                        style={{
                                                            animationDelay:
                                                                "0.2s",
                                                        }}
                                                    ></div>
                                                    <div
                                                        className="w-3 h-3 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full animate-bounce shadow-lg"
                                                        style={{
                                                            animationDelay:
                                                                "0.4s",
                                                        }}
                                                    ></div>
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Question Types Grid */}
                                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                                            {/* Categorize Question */}
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: 40,
                                                    rotateY: -15,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    rotateY: 0,
                                                }}
                                                transition={{
                                                    delay: 1.4,
                                                    duration: 0.7,
                                                }}
                                                whileHover={{
                                                    y: -8,
                                                    scale: 1.05,
                                                }}
                                                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
                                            >
                                                <div className="flex items-center mb-6">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                                        <span className="text-white text-xl font-bold">
                                                            📝
                                                        </span>
                                                    </div>
                                                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                                                        Categorize Questions
                                                    </h4>
                                                </div>
                                                <p className="text-gray-600 mb-6 font-medium">
                                                    Let users choose from
                                                    predefined categories or
                                                    options
                                                </p>
                                                <div className="space-y-3">
                                                    {[
                                                        "Product Manager",
                                                        "Designer",
                                                        "Developer",
                                                    ].map((option, index) => (
                                                        <motion.div
                                                            key={option}
                                                            initial={{
                                                                opacity: 0,
                                                                x: -20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                x: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    1.6 +
                                                                    index * 0.1,
                                                            }}
                                                            className="p-3 bg-white border border-blue-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 cursor-pointer shadow-sm"
                                                        >
                                                            {option}
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>

                                            {/* Cloze Question */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 40 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: 1.5,
                                                    duration: 0.7,
                                                }}
                                                whileHover={{
                                                    y: -8,
                                                    scale: 1.05,
                                                }}
                                                className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
                                            >
                                                <div className="flex items-center mb-6">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                                        <span className="text-white text-xl font-bold">
                                                            ✏️
                                                        </span>
                                                    </div>
                                                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                                                        Fill-in-the-Blank
                                                    </h4>
                                                </div>
                                                <p className="text-gray-600 mb-6 font-medium">
                                                    Create interactive text
                                                    completion exercises
                                                </p>
                                                <div className="bg-white p-4 rounded-xl border border-green-200 text-base text-gray-700 shadow-sm">
                                                    The quick{" "}
                                                    <input
                                                        className="border-b-2 border-green-400 w-20 px-2 text-center bg-green-50 rounded-md focus:border-green-600 transition-colors duration-200"
                                                        placeholder="___"
                                                    />{" "}
                                                    fox jumps over the{" "}
                                                    <input
                                                        className="border-b-2 border-green-400 w-20 px-2 text-center bg-green-50 rounded-md focus:border-green-600 transition-colors duration-200"
                                                        placeholder="___"
                                                    />{" "}
                                                    dog.
                                                </div>
                                            </motion.div>

                                            {/* Comprehension Question */}
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: 40,
                                                    rotateY: 15,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    rotateY: 0,
                                                }}
                                                transition={{
                                                    delay: 1.6,
                                                    duration: 0.7,
                                                }}
                                                whileHover={{
                                                    y: -8,
                                                    scale: 1.05,
                                                }}
                                                className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
                                            >
                                                <div className="flex items-center mb-6">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                                        <span className="text-white text-xl font-bold">
                                                            📖
                                                        </span>
                                                    </div>
                                                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                                                        Comprehension
                                                    </h4>
                                                </div>
                                                <p className="text-gray-600 mb-6 font-medium">
                                                    Combine text passages with
                                                    multiple questions
                                                </p>
                                                <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-sm">
                                                    <div className="flex items-center text-xs text-gray-500 mb-3">
                                                        <span className="mr-2">
                                                            📄
                                                        </span>
                                                        <span className="font-medium">
                                                            Reading Passage
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-gray-700 mb-4 italic leading-relaxed">
                                                        "Lorem ipsum dolor sit
                                                        amet, consectetur
                                                        adipiscing elit..."
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-xs font-medium text-purple-600">
                                                            3 questions •
                                                            Progress: 0/3
                                                        </div>
                                                        <div className="w-16 h-2 bg-purple-200 rounded-full">
                                                            <div className="w-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Key Features */}
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <motion.div
                                                initial={{ opacity: 0, x: -40 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: 1.8,
                                                    duration: 0.6,
                                                }}
                                                className="space-y-6 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200"
                                            >
                                                <h4 className="text-xl font-bold text-gray-900 flex items-center">
                                                    <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3 text-white text-lg shadow-lg">
                                                        ✨
                                                    </span>
                                                    Smart Form Builder
                                                </h4>
                                                <ul className="space-y-4">
                                                    {[
                                                        "Drag & drop question editor",
                                                        "Real-time preview",
                                                        "Custom styling options",
                                                    ].map((feature, index) => (
                                                        <motion.li
                                                            key={feature}
                                                            initial={{
                                                                opacity: 0,
                                                                x: -20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                x: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    1.9 +
                                                                    index * 0.1,
                                                            }}
                                                            className="flex items-center text-gray-700 font-medium"
                                                        >
                                                            <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-3 flex-shrink-0 shadow-sm"></span>
                                                            {feature}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, x: 40 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: 1.9,
                                                    duration: 0.6,
                                                }}
                                                className="space-y-6 bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200"
                                            >
                                                <h4 className="text-xl font-bold text-gray-900 flex items-center">
                                                    <span className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3 text-white text-lg shadow-lg">
                                                        🎯
                                                    </span>
                                                    Enhanced Experience
                                                </h4>
                                                <ul className="space-y-4">
                                                    {[
                                                        "Smooth animations",
                                                        "Progress tracking",
                                                        "Mobile responsive",
                                                    ].map((feature, index) => (
                                                        <motion.li
                                                            key={feature}
                                                            initial={{
                                                                opacity: 0,
                                                                x: -20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                x: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    2.0 +
                                                                    index * 0.1,
                                                            }}
                                                            className="flex items-center text-gray-700 font-medium"
                                                        >
                                                            <span className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-3 flex-shrink-0 shadow-sm"></span>
                                                            {feature}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                    <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
                    <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-green-200 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-2000"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-20"
                        >
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm font-medium text-purple-800 mb-6 border border-purple-200">
                                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                                Everything you need
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                                Create amazing forms with
                                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    powerful features
                                </span>
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                                Powerful features that make form creation
                                effortless and form filling delightful
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                {
                                    icon: (
                                        <svg
                                            className="w-10 h-10"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z"
                                            />
                                        </svg>
                                    ),
                                    title: "Drag & Drop Builder",
                                    description:
                                        "Create forms visually with our intuitive drag and drop interface. No coding required.",
                                    gradient: "from-blue-500 to-cyan-600",
                                    bgGradient: "from-blue-50 to-cyan-100",
                                    borderColor: "border-blue-200",
                                },
                                {
                                    icon: (
                                        <svg
                                            className="w-10 h-10"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                            />
                                        </svg>
                                    ),
                                    title: "Mobile Responsive",
                                    description:
                                        "Forms look perfect on any device. Optimized for mobile, tablet, and desktop experiences.",
                                    gradient: "from-purple-500 to-pink-600",
                                    bgGradient: "from-purple-50 to-pink-100",
                                    borderColor: "border-purple-200",
                                },
                                {
                                    icon: (
                                        <svg
                                            className="w-10 h-10"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            />
                                        </svg>
                                    ),
                                    title: "Real-time Analytics",
                                    description:
                                        "Track responses, completion rates, and gather insights with built-in analytics dashboard.",
                                    gradient: "from-green-500 to-emerald-600",
                                    bgGradient: "from-green-50 to-emerald-100",
                                    borderColor: "border-green-200",
                                },
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{
                                        opacity: 0,
                                        y: 50,
                                        rotateX: -15,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        rotateX: 0,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.2,
                                        ease: "easeOut",
                                    }}
                                    whileHover={{
                                        y: -12,
                                        scale: 1.05,
                                        rotateY: 5,
                                        transition: { duration: 0.3 },
                                    }}
                                    viewport={{ once: true }}
                                    className={`bg-gradient-to-br ${feature.bgGradient} p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border ${feature.borderColor} group cursor-pointer relative overflow-hidden`}
                                >
                                    {/* Background decoration */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>

                                    <div
                                        className={`text-white mb-6 w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 relative z-10`}
                                    >
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed font-medium group-hover:text-gray-600 transition-colors duration-300">
                                        {feature.description}
                                    </p>

                                    {/* Hover indicator */}
                                    <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <svg
                                            className="w-4 h-4 text-gray-700"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full animate-float"></div>
                        <div className="absolute top-20 right-20 w-24 h-24 bg-white/5 rounded-full animate-float animation-delay-2000"></div>
                        <div className="absolute bottom-10 left-1/3 w-32 h-32 bg-white/5 rounded-full animate-float animation-delay-4000"></div>
                        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-1000"></div>
                    </div>

                    <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="mb-8"
                            >
                                <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium text-white mb-6 border border-white/30">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                    Join 10,000+ creators
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                                    Ready to get started?
                                </h2>
                                <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                                    Join thousands of creators who trust
                                    Forminate for their form needs. Start
                                    building beautiful forms today.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                            >
                                <Link href="/form-builder">
                                    <Button
                                        variant="secondary"
                                        size="xl"
                                        className="px-12 py-6 text-lg font-bold bg-white text-purple-600 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border-0"
                                    >
                                        Start Building for Free
                                        <svg
                                            className="w-6 h-6 ml-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </Button>
                                </Link>
                                <button className="px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                                    Watch Demo
                                    <svg
                                        className="w-5 h-5 ml-2 inline"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="mt-8 flex justify-center space-x-6 text-sm text-blue-100"
                            >
                                <div className="flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-2 text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    No credit card required
                                </div>
                                <div className="flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-2 text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Free forever plan
                                </div>
                                <div className="flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-2 text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Setup in 2 minutes
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
