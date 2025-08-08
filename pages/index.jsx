import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import Button from "../components/Button";

export default function Home() {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                                Beautiful forms that{" "}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    convert
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                                Create stunning, interactive forms with the
                                simplicity of Typeform. Engage your audience
                                with smooth animations and professional design.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Link href="/builder">
                                <Button
                                    variant="primary"
                                    size="xl"
                                    className="px-8 py-4"
                                >
                                    Create Your First Form
                                    <svg
                                        className="w-5 h-5 ml-2"
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
                                className="px-8 py-4"
                            >
                                View Demo
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mt-16"
                        >
                            <div className="relative max-w-4xl mx-auto">
                                <div className="bg-white rounded-2xl shadow-2xl border p-8">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div className="text-left space-y-4">
                                        <h3 className="text-2xl font-semibold text-gray-900">
                                            Which category best describes your
                                            role?
                                        </h3>
                                        <p className="text-gray-600">
                                            This helps us understand our
                                            audience better
                                        </p>
                                        <div className="space-y-3">
                                            {[
                                                "Developer",
                                                "Designer",
                                                "Product Manager",
                                                "Marketing",
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
                                                            0.6 + index * 0.1,
                                                    }}
                                                    className="p-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
                                                >
                                                    {option}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Everything you need to create amazing forms
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Powerful features that make form creation effortless
                            and form filling delightful
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
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
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
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
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
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
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="text-blue-600 mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to get started?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Join thousands of creators who trust Forminate for
                            their form needs
                        </p>
                        <Link href="/builder">
                            <Button
                                variant="secondary"
                                size="xl"
                                className="px-8 py-4"
                            >
                                Start Building for Free
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}
