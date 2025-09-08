// src/routes/ProtectedRoute.jsx
// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaSpinner } from "react-icons/fa"; // spinner icon

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // ⏳ Still checking auth → show spinner
  if (loading) {
    return (
      <div className="protected-loading">
        <FaSpinner className="spinner" />
        <p>Checking authentication...</p>
      </div>
    );
  }

  // ❌ Not logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → render child route
  return children;
}

export default ProtectedRoute;
