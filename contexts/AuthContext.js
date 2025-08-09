import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

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
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/");
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
