// src/pages/ResetPassword.jsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import PublicHeader from "../components/PublicHeader";
import PublicFooter from "../components/PublicFooter";
import "../styles/ResetPassword.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get token info from localStorage
    const resetData = JSON.parse(localStorage.getItem("resetTokens") || "{}");
    const email = resetData[token];

    if (!email) {
      setError("Invalid or expired reset link.");
      return;
    }

    // Update password
    const users = authService.getAllUsers();
    const updatedUsers = users.map((u) =>
      u.email === email ? { ...u, password } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Clear token
    delete resetData[token];
    localStorage.setItem("resetTokens", JSON.stringify(resetData));

    setMessage("✅ Password updated! You can now log in.");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="reset-page">
      <PublicHeader />
      <main className="reset-content">
        <div className="reset-box">
          <h2>Set New Password</h2>
          {message && (
            <div className="success success-box">
              <span className="checkmark"></span>
              {message}
            </div>
          )}

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Update Password</button>
          </form>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}

export default ResetPassword;
