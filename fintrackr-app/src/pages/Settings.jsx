// src/pages/Settings.jsx
import React, { useState } from "react";
import {
  FiBell,
  FiMoon,
  FiTrash2,
  FiLogOut,
  FiShield,
  FiSliders,
  FiCheckCircle,
  FiCpu,
} from "react-icons/fi";

// Layout Components
import AppHeader from "../components/AppHeader.jsx";
import Sidebar from "../components/Sidebar.jsx";
import AppFooter from "../components/AppFooter.jsx";

// Hooks & Utils
import STORAGE_KEYS, {
  removeFromStorage,
  saveToStorage,
  getFromStorage,
} from "../utils/localStorage";
import { useNotifications } from "../hooks/useNotifications";

import "../styles/Settings.css";

function Settings() {
  const { addNotification } = useNotifications();

  // --- Global State ---
  const [transactions, setTransactions] = useState(() =>
    getFromStorage(STORAGE_KEYS.TRANSACTIONS, []),
  );

  // --- UI State ---
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // --- Interface Handlers ---
  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-theme", !darkMode);
  };

  const handleToggleNotifications = () => setNotifications((prev) => !prev);
  const handleToggle2FA = () => setTwoFactor((prev) => !prev);

  const handleLogout = () => {
    removeFromStorage(STORAGE_KEYS.USER);
    window.location.href = "/login";
  };

  // --- Data & Automation Handlers ---
  const handleClearData = () => {
    const keysToRemove = [
      STORAGE_KEYS.TRANSACTIONS,
      STORAGE_KEYS.GOALS,
      STORAGE_KEYS.BILLS,
      STORAGE_KEYS.BUDGETS,
    ];
    keysToRemove.forEach((key) => removeFromStorage(key));
    setTransactions([]);
    setShowConfirm(false);
    addNotification("System: Financial data purged successfully.");
  };

  // 1. To stop just ONE specific recurring transaction
  const handleStopSingleRecurring = (id) => {
    const updated = transactions.map((t) =>
      t.id === id ? { ...t, recurring: false } : t,
    );
    setTransactions(updated);
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, updated);
    addNotification("Standing Order Deactivated");
  };

  // 2. To stop ALL recurring transactions (The Kill Switch)
  const handleDeleteAllRecurring = () => {
    const updated = transactions.map((t) => ({ ...t, recurring: false }));
    setTransactions(updated);
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, updated);
    addNotification("All Automated Protocols Terminated 🛑");
  };

  const recurringTransactions = transactions.filter((t) => t.recurring);

  return (
    <div
      className={`fintrack-settings-v2-root ${sidebarOpen ? "sidebar-open" : ""}`}
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

      <main className="fintrack-settings-v2-main">
        <header className="fintrack-settings-v2-hero">
          <span className="eyebrow">Workspace Control</span>
          <h1 className="fintrack-settings-v2-title">Configuration</h1>
          <p className="fintrack-settings-v2-subtitle">
            Tailor your workspace, security protocols, and automated ledger
            logic.
          </p>
        </header>

        <div className="fintrack-settings-v2-grid">
          {/* Section: Automation Management (Full Width) */}
          <section className="fintrack-settings-v2-card full-width-card">
            <div className="fintrack-settings-v2-card-header">
              <FiCpu className="fintrack-settings-v2-header-icon" />
              <h2>Active Standing Orders</h2>
            </div>

            <div className="automation-audit-list">
              {recurringTransactions.length === 0 ? (
                <div className="empty-audit-state">
                  <p className="text-muted-dark">
                    No automated protocols currently active.
                  </p>
                </div>
              ) : (
                recurringTransactions.map((tx) => (
                  <div key={tx.id} className="ft-audit-row">
                    <div className="ft-audit-id-col">
                      <span className="ft-audit-category">{tx.category}</span>
                      <h5 className="ft-audit-description">
                        {tx.description || "Untitled Protocol"}
                      </h5>
                    </div>

                    <div className="ft-audit-logic-col">
                      <div className="ft-audit-frequency-pill">
                        <span>Frequency: {tx.frequency}</span>
                      </div>
                      <span className={`ft-audit-amount ${tx.type}`}>
                        {tx.type === "income" ? "+" : "-"}$
                        {tx.amount.toLocaleString()}
                      </span>
                    </div>

                    <div className="ft-audit-action-col">
                      <button
                        className="ft-btn-stop-protocol"
                        onClick={() => handleStopSingleRecurring(tx.id)}
                      >
                        Stop
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {recurringTransactions.length > 0 && (
              <div
                className="fintrack-settings-v2-danger-zone"
                style={{ marginTop: "2.5rem" }}
              >
                <p>System Override</p>
                <div className="fintrack-settings-v2-actions">
                  <button
                    className="fintrack-settings-v2-btn-clear"
                    onClick={handleDeleteAllRecurring}
                  >
                    <FiTrash2 /> Terminate All Standing Orders
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Section: Interface Preferences */}
          <section className="fintrack-settings-v2-card">
            <div className="fintrack-settings-v2-card-header">
              <FiSliders className="fintrack-settings-v2-header-icon" />
              <h2>Interface</h2>
            </div>

            <div className="fintrack-settings-v2-row">
              <div className="fintrack-settings-v2-info">
                <FiMoon />
                <div className="fintrack-settings-v2-text">
                  <label>Dark Aesthetic</label>
                  <span>Midnight mode for low-light environments.</span>
                </div>
              </div>
              <button
                className={`fintrack-settings-v2-switch ${darkMode ? "active" : ""}`}
                onClick={handleToggleDarkMode}
              >
                <div className="fintrack-settings-v2-toggle-knob" />
              </button>
            </div>

            <div className="fintrack-settings-v2-row">
              <div className="fintrack-settings-v2-info">
                <FiBell />
                <div className="fintrack-settings-v2-text">
                  <label>Smart Notifications</label>
                  <span>Alerts for significant budget shifts.</span>
                </div>
              </div>
              <button
                className={`fintrack-settings-v2-switch ${notifications ? "active" : ""}`}
                onClick={handleToggleNotifications}
              >
                <div className="fintrack-settings-v2-toggle-knob" />
              </button>
            </div>
          </section>

          {/* Section: Security & Privacy */}
          <section className="fintrack-settings-v2-card">
            <div className="fintrack-settings-v2-card-header">
              <FiShield className="fintrack-settings-v2-header-icon" />
              <h2>Security</h2>
            </div>

            <div className="fintrack-settings-v2-row">
              <div className="fintrack-settings-v2-info">
                <FiCheckCircle />
                <div className="fintrack-settings-v2-text">
                  <label>Two-Factor Auth</label>
                  <span>Enhanced account security protocols.</span>
                </div>
              </div>
              <button
                className={`fintrack-settings-v2-switch ${twoFactor ? "active" : ""}`}
                onClick={handleToggle2FA}
              >
                <div className="fintrack-settings-v2-toggle-knob" />
              </button>
            </div>

            <div className="fintrack-settings-v2-divider" />

            <div className="fintrack-settings-v2-danger-zone">
              <p>Critical Actions</p>
              <div className="fintrack-settings-v2-actions">
                <button
                  className="fintrack-settings-v2-btn-clear"
                  onClick={() => setShowConfirm(true)}
                >
                  <FiTrash2 /> Clear Financial Records
                </button>
                <button
                  className="fintrack-settings-v2-btn-logout"
                  onClick={handleLogout}
                >
                  <FiLogOut /> Sign Out Session
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <AppFooter />

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fintrack-settings-v2-modal-overlay">
          <div className="fintrack-settings-v2-modal">
            <div className="fintrack-settings-v2-modal-icon">
              <FiTrash2 />
            </div>
            <h3>Purge All Data?</h3>
            <p>
              This action is irreversible. All transactions, budgets, and goals
              will be permanently erased from the local vault.
            </p>
            <div className="fintrack-settings-v2-modal-actions">
              <button
                className="fintrack-settings-v2-modal-cancel"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="fintrack-settings-v2-modal-confirm"
                onClick={handleClearData}
              >
                Confirm Purge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;