// src/pages/Settings.jsx

import React, { useState } from "react";
import { FiBell, FiMoon, FiTrash2, FiLogOut } from "react-icons/fi";
import AppHeader from "../components/AppHeader.jsx";
import Sidebar from "../components/Sidebar.jsx";
import AppFooter from "../components/AppFooter.jsx";
import "../styles/Settings.css";

import STORAGE_KEYS, { removeFromStorage } from "../utils/localStorage";

function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  // --- Handlers ---
  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-theme", !darkMode);
  };

  const handleToggleNotifications = () => {
    setNotifications((prev) => !prev);
  };

  const handleClearData = () => {
    removeFromStorage(STORAGE_KEYS.TRANSACTIONS);
    removeFromStorage(STORAGE_KEYS.GOALS);
    removeFromStorage(STORAGE_KEYS.BILLS);
    removeFromStorage(STORAGE_KEYS.BUDGETS);
    alert("All data cleared successfully!");
    setShowConfirm(false);
  };

  const handleLogout = () => {
    removeFromStorage(STORAGE_KEYS.USER);
    window.location.href = "/login";
  };

  return (
    <div
      className={`settings-page-container ${sidebarOpen ? "sidebar-open" : ""}`}
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
      <main className="settings-page-main">
        <header className="settings-banner">
          <h1>⚙ Settings</h1>
          <p>Manage your app preferences and account options.</p>
        </header>

        <div className="settings-layout">
          {/* Preferences */}
          <section className="settings-card">
            <h2>Preferences</h2>
            <div className="settings-option">
              <span>
                <FiMoon /> Dark Mode
              </span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={handleToggleDarkMode}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="settings-option">
              <span>
                <FiBell /> Notifications
              </span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={handleToggleNotifications}
                />
                <span className="slider"></span>
              </label>
            </div>
          </section>

          {/* Account */}
          <section className="settings-card danger-zone">
            <h2>Account</h2>
            <button className="clear-btn" onClick={() => setShowConfirm(true)}>
              <FiTrash2 /> Clear All Data
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <FiLogOut /> Log Out
            </button>
          </section>
        </div>
      </main>

      <AppFooter />

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>⚠ Confirm Action</h3>
            <p>
              This will permanently delete all your financial data. Continue?
            </p>
            <div className="confirm-actions">
              <button className="yes-btn" onClick={handleClearData}>
                Yes
              </button>
              <button className="no-btn" onClick={() => setShowConfirm(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
