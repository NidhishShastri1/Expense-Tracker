import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, registerUser } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simple check: if token exists, we assume user is logged in for now.
        // Ideally, we would fetch user profile here.
        if (token) {
            // You might want to decode token or fetch user details here if needed
            // For now, we'll just set a flag or keep user as truthy
            setUser({ token });
        }
        setLoading(false);
    }, [token]);

    const login = async (credentials) => {
        try {
            const jwtToken = await loginUser(credentials);
            localStorage.setItem('token', jwtToken);
            setToken(jwtToken);
            setUser({ token: jwtToken });
            return { success: true };
        } catch (error) {
            console.error("Login failed", error);
            return { success: false, error: error.response?.data || "Login failed" };
        }
    };

    const register = async (userData) => {
        try {
            await registerUser(userData);
            return { success: true };
        } catch (error) {
            console.error("Registration failed", error);
            return { success: false, error: error.response?.data || "Registration failed" };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
