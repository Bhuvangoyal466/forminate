import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <motion.header
            className="bg-white border-b border-gray-200 sticky top-0 z-30"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-2"></div>
                        <span className="text-xl font-bold text-gray-900">
                            Forminate
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/form-builder"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                            Builder
                        </Link>
                        <Link
                            href="/templates"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                            Templates
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                            Pricing
                        </Link>
                    </nav>

                    {/* CTA Buttons */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 py-2"
                                >
                                    Dashboard
                                </Link>
                                <div className="hidden md:flex items-center space-x-3">
                                    <div className="text-sm text-gray-600">
                                        Welcome,{" "}
                                        <span className="font-medium text-gray-900">
                                            {user?.name}
                                        </span>
                                    </div>
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">
                                            {user?.name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={logout}
                                    className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/signin">
                                    <button className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2">
                                        Sign In
                                    </button>
                                </Link>
                                <Link href="/signup">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
