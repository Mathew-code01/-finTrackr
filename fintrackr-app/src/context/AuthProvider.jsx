// src/context/AuthProvider.jsx
// src/context/AuthProvider.jsx
import React, { useState, useEffect } from "react";
import { authService } from "../services/authService";
import { AuthContext } from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen"; // ✅ Import added

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const current = authService.getCurrentUser();
        if (current) {
          setUser(current);
        }
      } catch (error) {
        console.error("Auth initialization failed", error);
      } finally {
        // A small delay (500ms) makes the transition feel more high-end and stable
        setTimeout(() => setLoading(false), 500);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    const loggedInUser = await authService.login(credentials);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = async (data) => {
    const newUser = await authService.register(data);
    return newUser;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // ✅ GLOBAL LOADING CHECK: This covers all pages on initial load
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}