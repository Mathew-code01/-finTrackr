// src/pages/Login.jsx
// src/pages/Login.jsx
// src/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate, Navigate } from "react-router-dom"; // ✅ import Navigate
import { FiMail, FiLock } from "react-icons/fi";
import PublicHeader from "../components/PublicHeader.jsx";
import PublicFooter from "../components/PublicFooter.jsx";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { user, loading, login } = useAuth(); // ✅ use loading + login from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({
        email: form.email,
        password: form.password,
      });
      navigate("/dashboard"); // ✅ redirect after login
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ While checking session
  if (loading) {
    return (
      <div className="login-page">
        <PublicHeader />
        <main className="login-content">
          <div className="login-box">
            <p>⏳ Checking session...</p>
          </div>
        </main>
        <PublicFooter />
      </div>
    );
  }

  // ✅ If already logged in, redirect
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="login-page">
      <PublicHeader />

      <main className="login-content">
        <div className="login-box">
          <h2>Welcome Back</h2>
          <p className="subtitle">Log in to continue tracking your finances.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="input-group">
              <FiMail className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <FiLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="login-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="login-btn">
              Log In
            </button>
          </form>

          <div className="divider">or</div>
          <button className="google-btn">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
            />
            Sign in with Google
          </button>

          <p className="register-link">
            Don’t have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

export default Login;
