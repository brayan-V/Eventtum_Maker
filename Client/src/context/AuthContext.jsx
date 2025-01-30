// client/src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)// depurando
            setErrors(error.response?.data?.message || "An unexpected error occurred");
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)//depurando
            setErrors(error.response?.data?.message || "An unexpected error occurred");
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const checkLogin = async () => {
            const token = Cookies.get("token");
            if (!token) return;

            try {
                const res = await verifyTokenRequest();
                if (!res.data) {
                    setIsAuthenticated(false);
                    setUser(null);
                } else {
                    setIsAuthenticated(true);
                    setUser(res.data.user);
                }
            } catch (error) {
                console.log(error)//depurando
                setIsAuthenticated(false);
                setUser(null);
                setErrors(error.response?.data?.message || "An unexpected error occurred");
            }
        };
        checkLogin();
    }, []);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => setErrors([]), 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <AuthContext.Provider value={{ signup, signin, logout, user, isAuthenticated, errors }}>
            {children}
        </AuthContext.Provider>
    );
};
