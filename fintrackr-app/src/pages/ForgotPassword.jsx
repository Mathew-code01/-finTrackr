// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { authService } from "../services/authService";
import PublicHeader from "../components/PublicHeader.jsx";
import PublicFooter from "../components/PublicFooter.jsx";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      const users = authService.getAllUsers();
      const found = users.find((u) => u.email === email);

      if (found) {
        // Create reset token
        const token = Math.random().toString(36).substring(2);
        const resetData = JSON.parse(
          localStorage.getItem("resetTokens") || "{}"
        );
        resetData[token] = email;
        localStorage.setItem("resetTokens", JSON.stringify(resetData));

        // Redirect to reset page
        navigate(`/reset-password/${token}`);
      } else {
        setError("No account found with this email.");
        setMessage("");
      }
    };


  return (
    <div className="forgot-page">
      <PublicHeader />

      <main className="forgot-content">
        <div className="forgot-box">
          <h2>Reset Your Password</h2>
          <p className="subtitle">
            Enter your email and we’ll send you a link to reset your password.
          </p>

          <form className="forgot-form" onSubmit={handleSubmit}>
            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}

            <div className="input-group">
              <FiMail className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="forgot-btn">
              Send Reset Link
            </button>
          </form>

          <p className="back-link">
            <Link to="/login">← Back to Login</Link>
          </p>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

export default ForgotPassword;
