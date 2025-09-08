// src/pages/Register.jsx

// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { authService } from "../services/authService";
import PublicHeader from "../components/PublicHeader.jsx";
import PublicFooter from "../components/PublicFooter.jsx";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await authService.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      navigate("/login"); // redirect after success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-page">
      <PublicHeader />
      <main className="register-content">
        <div className="register-box">
          <h2>Create Your FinTrackr Account</h2>
          <p className="subtitle">
            Manage your money smarter — it’s free to get started.
          </p>

          <form className="register-form" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="input-group">
              <FiUser className="input-icon" />
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
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
            <div className="input-group">
              <FiLock className="input-icon" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="register-btn">
              Create Account
            </button>
          </form>

          <div className="divider">or</div>
          <button className="google-btn">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
            />
            Sign up with Google
          </button>
          <p className="login-link">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}

export default Register;
