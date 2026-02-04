// src/pages/ResetPassword.jsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import { authService } from "../services/authService";
import PublicHeader from "../components/PublicHeader.jsx";
import PublicFooter from "../components/PublicFooter.jsx";
import "../styles/ResetPassword.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const resetData = JSON.parse(localStorage.getItem("resetTokens") || "{}");
    const email = resetData[token];

    if (!email) {
      setError("This security link has expired or is invalid.");
      return;
    }

    const users = authService.getAllUsers();
    const updatedUsers = users.map((u) =>
      u.email === email ? { ...u, password } : u,
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    delete resetData[token];
    localStorage.setItem("resetTokens", JSON.stringify(resetData));

    setMessage("Security credentials updated successfully.");
    setTimeout(() => navigate("/login"), 2500);
  };

  return (
    <div className="reset-page">
      <PublicHeader />

      <main className="reset-split-container">
        {/* Left Visual Pane */}
        <section className="reset-visual-pane">
          <div className="visual-content">
            <span className="badge">Account Recovery</span>
            <h1>
              Secure Your <br /> New <span>Identity.</span>
            </h1>
            <p>
              Establish a high-entropy password to maintain the integrity of
              your wealth management profile.
            </p>
          </div>
        </section>

        {/* Right Form Pane */}
        <section className="reset-form-pane">
          <div className="form-wrapper">
            <header className="form-header">
              <h2>Reset Password</h2>
              <p>Please enter your new institutional-grade password.</p>
            </header>

            {message ? (
              <div className="success-screen">
                <FiCheckCircle className="success-icon" />
                <h3>Success</h3>
                <p>{message}</p>
                <div className="loading-bar"></div>
              </div>
            ) : (
              <form className="reset-form" onSubmit={handleSubmit}>
                {error && <div className="error-msg">{error}</div>}

                <div className="input-field">
                  <div className="field-inner">
                    <FiLock className="field-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="New Security Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="prime-reset-btn">
                  Update Credentials <FiArrowRight />
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}

export default ResetPassword;