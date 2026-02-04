// src/pages/Profile.jsx

// src/pages/Profile.jsx
// src/pages/Profile.jsx
// src/pages/Profile.jsx
// src/pages/Profile.jsx
// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiLock, FiLogOut, FiCamera } from "react-icons/fi";
import AppHeader from "../components/AppHeader.jsx";
import Sidebar from "../components/Sidebar.jsx";
import AppFooter from "../components/AppFooter.jsx";
import "../styles/Profile.css";

import STORAGE_KEYS, {
  getFromStorage,
  saveToStorage,
  removeFromStorage,
} from "../utils/localStorage";

function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = getFromStorage(STORAGE_KEYS.USER);
    if (storedUser) {
      setForm((prev) => ({
        ...prev,
        name: storedUser.name || "",
        email: storedUser.email || "",
        avatar: storedUser.avatar || null,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "avatar" ? files[0] : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required.";
    if (!form.email) newErrors.email = "Email is required.";
    if (form.password && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMsg("");
      return;
    }

    const currentUser = getFromStorage(STORAGE_KEYS.USER);
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      name: form.name,
      email: form.email,
      avatar: form.avatar,
      ...(form.password ? { password: form.password } : {}),
    };

    const sessionUser = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
    };
    saveToStorage(STORAGE_KEYS.USER, sessionUser);

    const allUsers = getFromStorage(STORAGE_KEYS.USERS, []);
    const updatedUsers = allUsers.map((u) =>
      u.id === currentUser.id ? { ...u, ...updatedUser } : u,
    );
    saveToStorage(STORAGE_KEYS.USERS, updatedUsers);

    setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    setErrors({});
    setSuccessMsg("Profile updated successfully.");
  };

  const handleLogout = () => {
    removeFromStorage(STORAGE_KEYS.USER);
    window.location.href = "/login";
  };

  return (
    <div
      className={`fintrack-profile-v2-root ${sidebarOpen ? "sidebar-open" : ""}`}
    >
      <AppHeader
        isSidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      {sidebarOpen && (
        <div
          className="fintrack-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="fintrack-profile-v2-main">
        <header className="fintrack-profile-v2-hero">
          <h1 className="fintrack-profile-v2-title">Account Settings</h1>
          <p className="fintrack-profile-v2-subtitle">
            Manage your digital identity and security.
          </p>
        </header>

        <div className="fintrack-profile-v2-content-grid">
          {/* Identity Card */}
          <aside className="fintrack-profile-v2-card-identity">
            <div className="fintrack-profile-v2-avatar-wrapper">
              <div className="fintrack-profile-v2-avatar-circle">
                {form.avatar ? (
                  <img
                    src={
                      form.avatar instanceof File
                        ? URL.createObjectURL(form.avatar)
                        : form.avatar
                    }
                    alt="Profile"
                    className="fintrack-profile-v2-img"
                  />
                ) : (
                  <FiUser className="fintrack-profile-v2-placeholder-icon" />
                )}
                <label className="fintrack-profile-v2-avatar-edit">
                  <FiCamera />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleChange}
                    hidden
                  />
                </label>
              </div>
            </div>

            <div className="fintrack-profile-v2-user-info">
              <h2>{form.name || "Member"}</h2>
              <p>{form.email || "Verification Pending"}</p>
            </div>

            <button
              className="fintrack-profile-v2-logout"
              onClick={handleLogout}
            >
              <FiLogOut /> <span>Sign Out</span>
            </button>
          </aside>

          {/* Security Form */}
          <section className="fintrack-profile-v2-form-container">
            <form className="fintrack-profile-v2-form" onSubmit={handleSubmit}>
              <div className="fintrack-profile-v2-input-section">
                <label className="fintrack-profile-v2-label">
                  Personal Details
                </label>
                <div className="fintrack-profile-v2-input-group">
                  <FiUser className="fintrack-profile-v2-icon" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                  />
                </div>
                {errors.name && (
                  <span className="fintrack-profile-v2-error">
                    {errors.name}
                  </span>
                )}

                <div className="fintrack-profile-v2-input-group">
                  <FiMail className="fintrack-profile-v2-icon" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                  />
                </div>
                {errors.email && (
                  <span className="fintrack-profile-v2-error">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="fintrack-profile-v2-input-section">
                <label className="fintrack-profile-v2-label">Security</label>
                <div className="fintrack-profile-v2-input-group">
                  <FiLock className="fintrack-profile-v2-icon" />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="New Password"
                  />
                </div>

                <div className="fintrack-profile-v2-input-group">
                  <FiLock className="fintrack-profile-v2-icon" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm New Password"
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="fintrack-profile-v2-error">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <div className="fintrack-profile-v2-footer">
                <button type="submit" className="fintrack-profile-v2-submit">
                  Apply Changes
                </button>
                {successMsg && (
                  <p className="fintrack-profile-v2-success">{successMsg}</p>
                )}
              </div>
            </form>
          </section>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

export default Profile;