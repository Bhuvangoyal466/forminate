import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import Layout from "../../components/Layout";

export default function BuilderIndex() {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                router.push("/signin");
            } else {
                // Redirect to dashboard if no form ID is provided
                router.push("/dashboard");
            }
        }
    }, [isAuthenticated, loading, router]);

    return (
        <Layout>
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Redirecting...</p>
                </div>
            </div>
        </Layout>
    );
}
