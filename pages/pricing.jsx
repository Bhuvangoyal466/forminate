import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import Button from "../components/Button";

export default function Pricing() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Perfect for getting started",
            features: [
                "Up to 3 forms",
                "100 responses per month",
                "Basic question types",
                "Email notifications",
                "Basic analytics",
                "Mobile responsive",
            ],
            limitations: ["Forminate branding", "Limited customization"],
            buttonText: "Get Started",
            buttonVariant: "outline",
            popular: false,
            gradient: "from-gray-50 to-gray-100",
            borderColor: "border-gray-200",
            textColor: "text-gray-900",
        },
        {
            name: "Pro",
            price: "$29",
            period: "per month",
            description: "Best for growing businesses",
            features: [
                "Unlimited forms",
                "10,000 responses per month",
                "All question types",
                "Advanced analytics",
                "Custom branding",
                "Email & webhook integrations",
                "File uploads",
                "Logic jumps",
                "Export data (CSV, PDF)",
                "Priority support",
            ],
            limitations: [],
            buttonText: "Start Free Trial",
            buttonVariant: "primary",
            popular: true,
            gradient: "from-blue-50 to-purple-100",
            borderColor: "border-blue-300",
            textColor: "text-gray-900",
        },
        {
            name: "Enterprise",
            price: "$99",
            period: "per month",
            description: "For large teams and organizations",
            features: [
                "Everything in Pro",
                "Unlimited responses",
                "Advanced security (SSO)",
                "Team collaboration",
                "White-label solution",
                "API access",
                "Custom integrations",
                "Dedicated support",
                "SLA guarantee",
                "On-premise deployment",
            ],
            limitations: [],
            buttonText: "Contact Sales",
            buttonVariant: "outline",
            popular: false,
            gradient: "from-purple-50 to-pink-100",
            borderColor: "border-purple-200",
            textColor: "text-gray-900",
        },
    ];

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

                @keyframes pulse-glow {
                    0%,
                    100% {
                        box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
                    }
                    50% {
                        box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
                    }
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-pulse-glow {
                    animation: pulse-glow 2s ease-in-out infinite;
                }

                .animation-delay-1000 {
                    animation-delay: 1s;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
            <Layout>
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
                    {/* Background decoration */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
                        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-2000"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-6 border border-blue-200">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                Simple, transparent pricing
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
                                Choose your{" "}
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    perfect plan
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                                Start for free and scale as you grow. No hidden
                                fees, no surprises.
                            </p>

                            {/* Billing Toggle */}
                            <div className="flex items-center justify-center space-x-4 mb-8">
                                <span className="text-gray-600 font-medium">
                                    Monthly
                                </span>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                    />
                                    <div className="w-12 h-6 bg-gray-300 rounded-full cursor-pointer transition-colors duration-200"></div>
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200"></div>
                                </div>
                                <span className="text-gray-600 font-medium">
                                    Yearly
                                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                        Save 20%
                                    </span>
                                </span>
                            </div>
                        </motion.div>

                        {/* Pricing Cards */}
                        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {plans.map((plan, index) => (
                                <motion.div
                                    key={plan.name}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                    }}
                                    className={`relative bg-gradient-to-br ${
                                        plan.gradient
                                    } rounded-3xl p-8 border-2 ${
                                        plan.borderColor
                                    } shadow-lg hover:shadow-2xl transition-all duration-300 ${
                                        plan.popular
                                            ? "transform lg:scale-105 animate-pulse-glow"
                                            : "hover:scale-105"
                                    }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                                Most Popular
                                            </div>
                                        </div>
                                    )}

                                    {/* Plan Header */}
                                    <div className="text-center mb-8">
                                        <h3
                                            className={`text-2xl font-bold ${plan.textColor} mb-2`}
                                        >
                                            {plan.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {plan.description}
                                        </p>
                                        <div className="flex items-baseline justify-center">
                                            <span className="text-5xl font-black text-gray-900">
                                                {plan.price}
                                            </span>
                                            <span className="text-gray-600 ml-2">
                                                /{plan.period}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Features List */}
                                    <div className="mb-8">
                                        <ul className="space-y-4">
                                            {plan.features.map(
                                                (feature, featureIndex) => (
                                                    <li
                                                        key={featureIndex}
                                                        className="flex items-start"
                                                    >
                                                        <svg
                                                            className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        <span className="text-gray-700 font-medium">
                                                            {feature}
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                            {plan.limitations.map(
                                                (limitation, limitIndex) => (
                                                    <li
                                                        key={limitIndex}
                                                        className="flex items-start"
                                                    >
                                                        <svg
                                                            className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        <span className="text-gray-500">
                                                            {limitation}
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>

                                    {/* CTA Button */}
                                    <div className="text-center">
                                        <Button
                                            variant={plan.buttonVariant}
                                            size="lg"
                                            className={`w-full py-4 text-lg font-semibold ${
                                                plan.popular
                                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-xl"
                                                    : ""
                                            } transform hover:scale-105 transition-all duration-300`}
                                        >
                                            {plan.buttonText}
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Additional Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-center mt-16"
                        >
                            <p className="text-gray-600 mb-8">
                                All plans include a 14-day free trial. No credit
                                card required.
                            </p>
                            <div className="flex flex-wrap justify-center items-center space-x-8 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-2 text-green-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Cancel anytime
                                </div>
                                <div className="flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-2 text-green-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    24/7 support
                                </div>
                                <div className="flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-2 text-green-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    GDPR compliant
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-xl text-gray-600">
                                Everything you need to know about our pricing
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {[
                                {
                                    question:
                                        "Can I change my plan at any time?",
                                    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate the billing accordingly.",
                                },
                                {
                                    question:
                                        "What happens when I exceed my response limit?",
                                    answer: "We'll notify you when you're approaching your limit. On the Free plan, new responses will be paused. On paid plans, we'll contact you about upgrading.",
                                },
                                {
                                    question: "Do you offer refunds?",
                                    answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll provide a full refund.",
                                },
                                {
                                    question: "Is there a setup fee?",
                                    answer: "No, there are no setup fees or hidden charges. You only pay the monthly or yearly subscription fee.",
                                },
                                {
                                    question:
                                        "Can I cancel my subscription anytime?",
                                    answer: "Absolutely. You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.",
                                },
                            ].map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="text-center mt-12"
                        >
                            <p className="text-gray-600 mb-6">
                                Still have questions? We're here to help.
                            </p>
                            <Button
                                variant="outline"
                                size="lg"
                                className="px-8 py-3"
                            >
                                Contact Support
                            </Button>
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Ready to get started?
                            </h2>
                            <p className="text-xl text-blue-100 mb-8">
                                Join thousands of creators building beautiful
                                forms with Forminate
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/form-builder">
                                    <Button
                                        variant="secondary"
                                        size="xl"
                                        className="px-8 py-4 bg-white text-purple-600 hover:bg-gray-50 font-semibold"
                                    >
                                        Start Free Trial
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="xl"
                                    className="px-8 py-4 border-white/30 text-white hover:bg-white/10"
                                >
                                    Contact Sales
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
