// src/pages/Register.jsx

// src/pages/Register.jsx
// src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowRight,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import PublicHeader from "../components/PublicHeader.jsx";
import PublicFooter from "../components/PublicFooter.jsx";
import LoadingScreen from "../components/LoadingScreen";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();
  const { user, loading, register } = useAuth();

  // State for form data
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  // State for UI feedback and visibility (Fixes the ESLint "no-undef" errors)
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Redirect if session exists
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <LoadingScreen />;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="register-page">
      <PublicHeader />

      <main className="register-split-container">
        <section className="register-visual-pane">
          <div className="visual-content">
            <span className="badge">Institutional Grade</span>
            <h1>
              Architecting <br /> Your <span>Wealth.</span>
            </h1>
            <p>
              Join a secure ecosystem designed for high-precision asset
              management.
            </p>
          </div>
        </section>

        <section className="register-form-pane">
          <div className="form-wrapper">
            <header className="form-header">
              <h2>Create Account</h2>
              <p>Please provide your professional details.</p>
            </header>

            <form className="register-form" onSubmit={handleSubmit}>
              {error && <div className="error-msg">{error}</div>}

              {/* Name Field */}
              <div className="input-field">
                <div className="field-inner">
                  <FiUser className="field-icon" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="input-field">
                <div className="field-inner">
                  <FiMail className="field-icon" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="input-field">
                <div className="field-inner">
                  <FiLock className="field-icon" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="toggle-visibility"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="input-field">
                <div className="field-inner">
                  <FiLock className="field-icon" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={form.confirm}
                    onChange={(e) =>
                      setForm({ ...form, confirm: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="toggle-visibility"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="prime-register-btn">
                Initialize Account <FiArrowRight />
              </button>
            </form>

            <div className="auth-divider">
              <span>Or Register With</span>
            </div>

            <button type="button" className="social-btn google">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
              />
              Google Account
            </button>

            <p className="footer-prompt">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}

export default Register;