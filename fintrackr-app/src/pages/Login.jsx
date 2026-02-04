// src/pages/Login.jsx
// src/pages/Login.jsx
// src/pages/Login.jsx
// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import PublicHeader from "../components/PublicHeader.jsx";
import PublicFooter from "../components/PublicFooter.jsx";
import LoadingScreen from "../components/LoadingScreen"; 
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { user, loading, login, loginWithGoogle } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  // Unified loading and user checks
  if (loading) return <LoadingScreen />;
  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email: form.email, password: form.password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // This will trigger your OAuth flow (Firebase/Supabase/etc)
      if (loginWithGoogle) {
        await loginWithGoogle();
        navigate("/dashboard");
      } else {
        console.warn("Google Login function not yet implemented in useAuth");
      }
    } catch (err) {
      console.log(err);
      setError("Google authentication failed.");
    }
  };

  if (loading)
    return (
      <div className="loading-overlay">
        <div className="loader"></div>
      </div>
    );
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="login-page">
      <PublicHeader />

      <main className="login-split-container">
        <section className="login-visual-pane">
          <div className="visual-content">
            <span className="badge">Secured Gateway</span>
            <h1>
              Intelligence <br /> Behind <span>Capital.</span>
            </h1>
            <p>
              Access your portfolio with the industry's most refined financial
              management dashboard.
            </p>
          </div>
        </section>

        <section className="login-form-pane">
          <div className="form-wrapper">
            <header className="form-header">
              <h2>Secure Login</h2>
              <p>Enter your credentials to access your vault.</p>
            </header>

            <form className="login-form" onSubmit={handleSubmit}>
              {error && (
                <div
                  className="auth-error"
                  style={{ color: "var(--color-danger)", marginBottom: "10px" }}
                >
                  {error}
                </div>
              )}

              <div className="input-field">
                <FiMail className="field-icon" />
                <input
                  type="email"
                  placeholder="Corporate Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="input-field">
                <FiLock className="field-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-utility">
                <label className="custom-checkbox">
                  <input type="checkbox" /> Keep me signed in
                </label>
                <Link to="/forgot-password">Recovery Access</Link>
              </div>

              <button type="submit" className="prime-login-btn">
                Authorize Access <FiArrowRight />
              </button>
            </form>

            <div className="auth-separator">
              <span>SOCIAL AUTHENTICATION</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="social-auth-btn"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
              />
              Continue with Google
            </button>

            <p className="onboarding-prompt">
              First time here?{" "}
              <Link to="/register">Create Institutional Account</Link>
            </p>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}

export default Login;