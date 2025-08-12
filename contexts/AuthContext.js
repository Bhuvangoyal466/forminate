import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import apiClient from "../lib/api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in on app start
        checkAuth();
    }, []);

    const checkAuth = () => {
        try {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("token");

            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                apiClient.setToken(storedToken);
            }
        } catch (error) {
            console.error("Error checking auth:", error);
            // Clear invalid data
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    };

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        apiClient.setToken(token);
    };

    const logout = async () => {
        try {
            await apiClient.signOut();
            toast.success("Successfully signed out!");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Error during sign out");
        } finally {
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            apiClient.setToken(null);
            router.push("/");
        }
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
