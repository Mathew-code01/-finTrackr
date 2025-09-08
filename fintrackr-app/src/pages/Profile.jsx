// src/pages/Profile.jsx

// src/pages/Profile.jsx
// src/pages/Profile.jsx
// src/pages/Profile.jsx
// src/pages/Profile.jsx
// src/pages/Profile.jsx
// src/pages/Profile.jsx
// src/pages/Profile.jsx
// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiLock, FiLogOut } from "react-icons/fi";
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

  // ✅ Load user from localStorage on mount
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

  // --- Handlers ---
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

    // ✅ Get current user from session
    const currentUser = getFromStorage(STORAGE_KEYS.USER);
    if (!currentUser) return;

    // ✅ Create updated user object
    const updatedUser = {
      ...currentUser,
      name: form.name,
      email: form.email,
      avatar: form.avatar,
      // Only update password if entered
      ...(form.password ? { password: form.password } : {}),
    };

    // ✅ Update session user (but don’t store password here for security)
    const sessionUser = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
    };
    saveToStorage(STORAGE_KEYS.USER, sessionUser);

    // ✅ Update inside fintrackr_users too (with password if set)
    const allUsers = getFromStorage(STORAGE_KEYS.USERS, []);
    const updatedUsers = allUsers.map((u) =>
      u.id === currentUser.id ? { ...u, ...updatedUser } : u
    );
    saveToStorage(STORAGE_KEYS.USERS, updatedUsers);

    // ✅ Reset password fields after saving
    setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));

    setErrors({});
    setSuccessMsg("Profile updated successfully!");
    console.log("Updated Profile:", updatedUser);
  };



  const handleLogout = () => {
    removeFromStorage(STORAGE_KEYS.USER);
    window.location.href = "/login"; // redirect to login
  };

  return (
    <div
      className={`profile-page-container ${sidebarOpen ? "sidebar-open" : ""}`}
    >
      {/* Header + Sidebar */}
      <AppHeader
        isSidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <main className="profile-page-main">
        {/* Banner */}
        <header className="profile-banner">
          <h1>
            <FiUser /> My Profile
          </h1>
          <p>Update your details and password.</p>
        </header>

        <div className="profile-layout">
          {/* Profile Card */}
          <aside className="profile-card">
            <div className="avatar-section">
              {form.avatar ? (
                <img
                  src={
                    form.avatar instanceof File
                      ? URL.createObjectURL(form.avatar)
                      : form.avatar
                  }
                  alt="Avatar Preview"
                  className="avatar-img"
                />
              ) : (
                <div className="avatar-placeholder">Upload</div>
              )}
              <label className="upload-btn">
                Change Avatar
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  hidden
                />
              </label>
            </div>

            <h2>{form.name || "Your Name"}</h2>
            <p>{form.email || "your@email.com"}</p>

            <button className="logout-btn" onClick={handleLogout}>
              <FiLogOut /> Log Out
            </button>
          </aside>

          {/* Profile Form */}
          <section className="profile-form-wrapper">
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="input-group">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>

              <div className="form-row">
                <div className="input-group">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <span className="error-msg">{errors.email}</span>
                )}
              </div>

              <div className="form-row">
                <div className="input-group">
                  <FiLock className="input-icon" />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="New password"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <FiLock className="input-icon" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="error-msg">{errors.confirmPassword}</span>
                )}
              </div>

              <button type="submit" className="update-btn">
                Save Changes
              </button>
              {successMsg && <p className="success-msg">{successMsg}</p>}
            </form>
          </section>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

export default Profile;
