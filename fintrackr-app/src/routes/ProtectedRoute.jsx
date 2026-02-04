// src/routes/ProtectedRoute.jsx
// src/routes/ProtectedRoute.jsx
// src/routes/ProtectedRoute.jsx
// src/routes/ProtectedRoute.jsx
// src/routes/ProtectedRoute.jsx
// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // If not logged in, redirect to Home instead of Login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;