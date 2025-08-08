import Link from "next/link";
import { motion } from "framer-motion";
import Button from "./Button";

const Header = () => {
    return (
        <motion.header
            className="bg-white border-b border-gray-200 sticky top-0 z-30"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl font-bold text-blue-600"
                        >
                            Forminate
                        </motion.div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/builder"
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
                        <Button variant="ghost" size="sm">
                            Sign In
                        </Button>
                        <Link href="/builder">
                            <Button variant="primary" size="sm">
                                Create Form
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
