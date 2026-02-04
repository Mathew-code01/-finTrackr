// src/components/Sidebar.jsx
// src/components/Sidebar.jsx
// src/components/Sidebar.jsx
import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiActivity,
  FiUser,
  FiBell,
  FiSearch,
  FiLayers,
  FiShield,
} from "react-icons/fi";
import "../styles/Sidebar.css";
import { useNotifications } from "../hooks/useNotifications";
import Logo from "../components/Logo.jsx";

function Sidebar({ isOpen, onClose }) {
  const { notifications, clearNotifications } = useNotifications();
  const [notifOpen, setNotifOpen] = useState(false);
  const notifDropdownRef = useRef(null);

  // Inside Sidebar({ isOpen, onClose })
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isOpen) {
        onClose(); // Automatically close mobile sidebar if window becomes large
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notifDropdownRef.current &&
        !notifDropdownRef.current.contains(event.target)
      ) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* <div className="sidebar-brand-area">
          <Logo />
        </div> */}

        {/* Mobile-only Search & Alerts Container */}
        <div className="mobile-utility-zone hide-on-desktop">
          <div className="utility-card search-card">
            <FiSearch />
            <input type="text" placeholder="Global Search..." />
          </div>

          <div
            className="utility-card alert-card"
            ref={notifDropdownRef}
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <div className="alert-trigger">
              <FiBell /> <span>System Alerts</span>
              {notifications.length > 0 && (
                <span className="alert-badge">{notifications.length}</span>
              )}
            </div>

            {notifOpen && (
              <div className="sidebar-notif-panel glass-panel">
                <div className="panel-header">Notifications</div>
                <div className="panel-scroll">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div key={n.id} className="panel-item">
                        {n.message}
                      </div>
                    ))
                  ) : (
                    <div className="panel-empty">No pending alerts</div>
                  )}
                </div>
                {notifications.length > 0 && (
                  <button className="panel-clear" onClick={clearNotifications}>
                    Acknowledge All
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-label">Main Menu</div>
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FiHome className="nav-icon" /> <span>Overview</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transactions"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FiActivity className="nav-icon" /> <span>Ledger</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FiShield className="nav-icon" /> <span>Security</span>
              </NavLink>
            </li>
          </ul>

          <div className="nav-label mt-xl">Account</div>
          <ul>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FiUser className="nav-icon" /> <span>Identity</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="system-status">
            <span className="status-dot"></span> Secure Connection
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;