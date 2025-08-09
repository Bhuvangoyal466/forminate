import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/signin");
        }
    }, [isAuthenticated, loading, router]);

    // Show loading while checking auth
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Show children if authenticated
    if (isAuthenticated) {
        return children;
    }

    // Show loading if redirecting
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );
};

export default ProtectedRoute;
