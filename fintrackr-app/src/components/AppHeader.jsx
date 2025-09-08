// src/components/AppHeader.jsx
// src/components/AppHeader.jsx
// src/components/AppHeader.jsx
// src/components/AppHeader.jsx
// src/components/AppHeader.jsx
// src/components/AppHeader.jsx
// src/components/AppHeader.jsx
// src/components/AppHeader.jsx
// src/components/AppHeader.jsx
// src/components/AppHeader.jsx
// src/components/AppHeader.jsx
// src/components/AppHeader.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";
import "../styles/AppHeader.css";
import { useNotifications } from "../hooks/useNotifications";
import { useAuth } from "../hooks/useAuth"; // ✅ import auth context
import Logo from "./Logo";

function AppHeader({
  selectedTimeframe,
  onTimeframeChange,
  isSidebarOpen,
  onToggleSidebar,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const notifDropdownRef = useRef(null);

  const { notifications, clearNotifications } = useNotifications();
  const { logout } = useAuth(); // ✅ get logout from context
  const timeframes = ["Daily", "Weekly", "Monthly", "Yearly"];

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
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
    <header className="app-header">
      {/* Mobile Menu toggle */}
      <button className="menu-btn" onClick={onToggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* ✅ Brand logo */}
      <div className="header-logo">
        {/* <Logo /> */}
        <span className="header-subtitle hide-on-mobile">Dashboard</span>
      </div>

      {/* Desktop: Pill-style selector */}
      <div className="timeframe-dropdown hide-on-mobile">
        {timeframes.map((tf) => {
          const lower = tf.toLowerCase();
          return (
            <span
              key={tf}
              className={`timeframe-pill ${
                selectedTimeframe === lower ? "active" : ""
              }`}
              onClick={() => onTimeframeChange(lower)}
            >
              {tf}
            </span>
          );
        })}
      </div>

      {/* Mobile: Native select */}
      <div className="timeframe-dropdown show-on-mobile">
        <select
          value={selectedTimeframe}
          onChange={(e) => onTimeframeChange(e.target.value)}
          className="timeframe-select"
        >
          {timeframes.map((tf) => (
            <option key={tf} value={tf.toLowerCase()}>
              {tf}
            </option>
          ))}
        </select>
      </div>

      {/* Search bar */}
      <div className="header-search hide-on-mobile">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search transactions..." />
      </div>

      {/* Right side actions */}
      <div className="header-actions">
        {/* 🔔 Notifications */}
        <div
          className="header-bell hide-on-mobile"
          ref={notifDropdownRef}
          onClick={() => setNotifOpen((prev) => !prev)}
        >
          <FaBell />
          {notifications.length > 0 && (
            <span className="badge">{notifications.length}</span>
          )}

          {notifOpen && (
            <div className="notif-dropdown">
              <ul>
                {notifications.length > 0 ? (
                  notifications.map((n) => <li key={n.id}>{n.message}</li>)
                ) : (
                  <li className="empty">No notifications</li>
                )}
              </ul>
              {notifications.length > 0 && (
                <button className="clear-btn" onClick={clearNotifications}>
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>

        {/* 👤 User dropdown */}
        <div
          className="header-user"
          ref={userDropdownRef}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <FaUserCircle className="user-icon" />
          <FaChevronDown className={`chevron ${menuOpen ? "open" : ""}`} />

          {menuOpen && (
            <ul className="user-dropdown">
              <li
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/profile");
                }}
              >
                Profile
              </li>
              <li
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/settings");
                }}
              >
                Settings
              </li>
              <li
                onClick={() => {
                  logout(); // ✅ call context logout
                  setMenuOpen(false);
                  navigate("/login"); // redirect to login
                }}
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
