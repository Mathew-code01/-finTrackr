// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { authService } from "../services/authService";
import PublicHeader from "../components/PublicHeader.jsx";
import PublicFooter from "../components/PublicFooter.jsx";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = authService.getAllUsers();
    const found = users.find((u) => u.email === email);

    if (found) {
      const token = Math.random().toString(36).substring(2);
      const resetData = JSON.parse(localStorage.getItem("resetTokens") || "{}");
      resetData[token] = email;
      localStorage.setItem("resetTokens", JSON.stringify(resetData));

      // Navigate to reset page with high-end transition feel
      navigate(`/reset-password/${token}`);
    } else {
      setError("No institutional account found with this email.");
    }
  };

  return (
    <div className="forgot-page">
      <PublicHeader />

      <main className="forgot-split-container">
        {/* Left Visual Pane - Institutional Identity */}
        <section className="forgot-visual-pane">
          <div className="visual-content">
            <span className="badge">Security Protocols</span>
            <h1>
              Restore Your <br /> Account <span>Access.</span>
            </h1>
            <p>
              Our secure recovery system ensures your financial data remains
              protected while you regain access.
            </p>
          </div>
        </section>

        {/* Right Form Pane */}
        <section className="forgot-form-pane">
          <div className="form-wrapper">
            <header className="form-header">
              <h2>Password Recovery</h2>
              <p>Enter your verified email to receive a secure reset link.</p>
            </header>

            <form className="forgot-form" onSubmit={handleSubmit}>
              {error && <div className="error-msg">{error}</div>}

              <div className="input-field">
                <div className="field-inner">
                  <FiMail className="field-icon" />
                  <input
                    type="email"
                    placeholder="Corporate Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="prime-forgot-btn">
                Send Recovery Link <FiArrowRight />
              </button>
            </form>

            <div className="auth-footer">
              <Link to="/login" className="back-link">
                <FiArrowLeft /> Return to Secure Login
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}

export default ForgotPassword;