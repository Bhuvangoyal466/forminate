import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";
import apiClient from "../lib/api";
import { toast } from "react-toastify";

const Dashboard = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [forms, setForms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/signin");
            return;
        }

        if (isAuthenticated) {
            fetchForms();
        }
    }, [isAuthenticated, loading, router]);

    const fetchForms = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.getForms();
            if (response.success) {
                setForms(response.data.forms || []);
            } else {
                setError("Failed to load forms");
                toast.error("Failed to load forms");
            }
        } catch (error) {
            console.error("Error fetching forms:", error);
            const errorMessage = "Failed to load forms";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateForm = async () => {
        try {
            const newForm = {
                title: "Untitled Form",
                description: "A new form created from dashboard",
                questions: [],
            };

            const response = await apiClient.createForm(newForm);
            if (response.success) {
                toast.success("Form created successfully!");
                router.push(`/builder/${response.data._id}`);
            } else {
                toast.error(response.error || "Failed to create form");
            }
        } catch (error) {
            console.error("Error creating form:", error);
            toast.error("Failed to create form");
        }
    };

    const getPublicFormUrl = (slug) => {
        return `${window.location.origin}/f/${slug}`;
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Link copied to clipboard!");
        } catch (error) {
            toast.error("Failed to copy link");
        }
    };

    if (loading || isLoading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                </div>
            </Layout>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect to signin
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Dashboard
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Welcome back, {user?.name}! Manage your forms and
                            view submissions.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">
                                        Total Forms
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        {forms.length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <svg
                                        className="w-6 h-6 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">
                                        Total Submissions
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        {forms.reduce(
                                            (total, form) =>
                                                total +
                                                (form.analytics
                                                    ?.totalSubmissions || 0),
                                            0
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <svg
                                        className="w-6 h-6 text-purple-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">
                                        Total Views
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        {forms.reduce(
                                            (total, form) =>
                                                total +
                                                (form.analytics?.totalViews ||
                                                    0),
                                            0
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mb-8">
                        <button
                            onClick={handleCreateForm}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                            Create New Form
                        </button>
                    </div>

                    {/* Forms Table */}
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">
                                Your Forms
                            </h2>
                        </div>

                        {error && (
                            <div className="px-6 py-4 bg-red-50 border-b border-red-200">
                                <p className="text-red-600">{error}</p>
                            </div>
                        )}

                        {forms.length === 0 ? (
                            <div className="text-center py-12">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    No forms yet
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Get started by creating your first form.
                                </p>
                                <div className="mt-6">
                                    <button
                                        onClick={handleCreateForm}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        Create Form
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Form
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Views
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Submissions
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Public Link
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {forms.map((form) => (
                                            <tr
                                                key={form._id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {form.title}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {form.description}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            form.status ===
                                                            "published"
                                                                ? "bg-green-100 text-green-800"
                                                                : form.status ===
                                                                  "draft"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-gray-100 text-gray-800"
                                                        }`}
                                                    >
                                                        {form.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {form.analytics
                                                        ?.totalViews || 0}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {form.analytics
                                                        ?.totalSubmissions || 0}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {form.status ===
                                                        "published" &&
                                                    form.slug ? (
                                                        <div className="flex items-center space-x-2">
                                                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                                /f/{form.slug}
                                                            </code>
                                                            <button
                                                                onClick={() =>
                                                                    copyToClipboard(
                                                                        getPublicFormUrl(
                                                                            form.slug
                                                                        )
                                                                    )
                                                                }
                                                                className="text-blue-600 hover:text-blue-800 text-xs"
                                                                title="Copy full URL"
                                                            >
                                                                Copy
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 text-sm">
                                                            Not published
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <Link
                                                        href={`/builder/${form._id}`}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        Edit
                                                    </Link>
                                                    {form.status ===
                                                        "published" && (
                                                        <Link
                                                            href={`/responses/${form._id}`}
                                                            className="text-green-600 hover:text-green-900"
                                                        >
                                                            Responses
                                                        </Link>
                                                    )}
                                                    {form.status ===
                                                        "published" &&
                                                        form.slug && (
                                                            <Link
                                                                href={`/f/${form.slug}`}
                                                                target="_blank"
                                                                className="text-purple-600 hover:text-purple-900"
                                                            >
                                                                View
                                                            </Link>
                                                        )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
