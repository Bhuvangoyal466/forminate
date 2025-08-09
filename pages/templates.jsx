import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import Button from "../components/Button";

const templates = [
    {
        id: 1,
        name: "Customer Feedback Survey",
        description:
            "Gather valuable feedback from your customers to improve your products and services.",
        category: "Survey",
        image: "/template-preview-1.jpg",
        questions: 8,
        responses: "2.5k+",
        featured: true,
    },
    {
        id: 2,
        name: "Employee Onboarding",
        description:
            "Streamline your employee onboarding process with this comprehensive form.",
        category: "HR",
        image: "/template-preview-2.jpg",
        questions: 12,
        responses: "1.8k+",
        featured: true,
    },
    {
        id: 3,
        name: "Event Registration",
        description:
            "Collect attendee information and manage event registrations efficiently.",
        category: "Event",
        image: "/template-preview-3.jpg",
        questions: 6,
        responses: "3.2k+",
        featured: false,
    },
    {
        id: 4,
        name: "Lead Generation",
        description:
            "Capture potential leads and grow your business with this optimized form.",
        category: "Marketing",
        image: "/template-preview-4.jpg",
        questions: 5,
        responses: "4.1k+",
        featured: true,
    },
    {
        id: 5,
        name: "Product Order Form",
        description:
            "Simple and effective order form for your products with payment integration.",
        category: "E-commerce",
        image: "/template-preview-5.jpg",
        questions: 10,
        responses: "1.5k+",
        featured: false,
    },
    {
        id: 6,
        name: "Contact Us",
        description:
            "Professional contact form for customer inquiries and support requests.",
        category: "Support",
        image: "/template-preview-6.jpg",
        questions: 4,
        responses: "5.7k+",
        featured: false,
    },
    {
        id: 7,
        name: "Job Application",
        description:
            "Comprehensive job application form to streamline your hiring process.",
        category: "HR",
        image: "/template-preview-7.jpg",
        questions: 15,
        responses: "980+",
        featured: false,
    },
    {
        id: 8,
        name: "Newsletter Signup",
        description:
            "Build your email list with this simple and effective newsletter signup form.",
        category: "Marketing",
        image: "/template-preview-8.jpg",
        questions: 3,
        responses: "8.3k+",
        featured: false,
    },
];

const categories = [
    "All",
    "Survey",
    "HR",
    "Event",
    "Marketing",
    "E-commerce",
    "Support",
];

export default function Templates() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTemplates = templates.filter((template) => {
        const matchesCategory =
            selectedCategory === "All" ||
            template.category === selectedCategory;
        const matchesSearch =
            template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredTemplates = templates.filter((template) => template.featured);

    return (
        <Layout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Ready-to-use{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Templates
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Jump-start your form creation with our
                            professionally designed templates. Customize them to
                            match your brand and requirements.
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-md mx-auto"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search templates..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <svg
                                className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Templates */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Featured Templates
                        </h2>
                        <p className="text-xl text-gray-600">
                            Our most popular and effective form templates
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {featuredTemplates.map((template, index) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border"
                            >
                                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                    <div className="text-gray-400 text-center">
                                        <svg
                                            className="w-16 h-16 mx-auto mb-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        <p className="text-sm">
                                            Template Preview
                                        </p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            {template.category}
                                        </span>
                                        <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            Featured
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {template.name}
                                    </h3>
                                    <p className="text-gray-600 mb-4 text-sm">
                                        {template.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <span>
                                            {template.questions} questions
                                        </span>
                                        <span>
                                            {template.responses} responses
                                        </span>
                                    </div>
                                    <Link href="/form-builder">
                                        <Button
                                            variant="primary"
                                            className="w-full"
                                        >
                                            Use Template
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* All Templates */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            All Templates
                        </h2>
                        <p className="text-xl text-gray-600">
                            Browse our complete collection of form templates
                        </p>
                    </motion.div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                                    selectedCategory === category
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredTemplates.map((template, index) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.05,
                                }}
                                viewport={{ once: true }}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border"
                            >
                                <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                    <svg
                                        className="w-12 h-12 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                                            {template.category}
                                        </span>
                                        {template.featured && (
                                            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded">
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {template.name}
                                    </h3>
                                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                                        {template.description}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                        <span>
                                            {template.questions} questions
                                        </span>
                                        <span>{template.responses}</span>
                                    </div>
                                    <Link href="/form-builder">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                        >
                                            Use Template
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredTemplates.length === 0 && (
                        <div className="text-center py-16">
                            <svg
                                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No templates found
                            </h3>
                            <p className="text-gray-600">
                                Try adjusting your search or filter criteria.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Don't see what you need?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Create a custom form from scratch with our intuitive
                            form builder
                        </p>
                        <Link href="/form-builder">
                            <Button
                                variant="secondary"
                                size="xl"
                                className="px-8 py-4"
                            >
                                Create Custom Form
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}
