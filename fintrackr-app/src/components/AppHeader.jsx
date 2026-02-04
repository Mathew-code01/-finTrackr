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
  FiMenu,
  FiX,
  FiSearch,
  FiBell,
  FiUser,
  FiChevronDown,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import "../styles/AppHeader.css";
import { useNotifications } from "../hooks/useNotifications";
import { useAuth } from "../hooks/useAuth";
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
  const { logout } = useAuth();
  const timeframes = ["Daily", "Weekly", "Monthly", "Yearly"];
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      )
        setMenuOpen(false);
      if (
        notifDropdownRef.current &&
        !notifDropdownRef.current.contains(event.target)
      )
        setNotifOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="app-header">
      <div className="header-left">
        {/* Toggle Sidebar - Visible only on mobile/tablet */}
        <button
          className="menu-btn hide-on-desktop"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className="header-brand">
          <Logo />
          <span className="brand-divider hide-on-mobile">/</span>
          <span className="header-context hide-on-mobile">Intelligence</span>
        </div>
      </div>

      <div className="header-center hide-on-tablet">
        <div className="timeframe-group">
          {timeframes.map((tf) => {
            const lower = tf.toLowerCase();
            return (
              <button
                key={tf}
                className={`tf-btn ${selectedTimeframe === lower ? "active" : ""}`}
                onClick={() => onTimeframeChange(lower)}
              >
                {tf}
              </button>
            );
          })}
        </div>
      </div>

      <div className="header-right">
        <div className="search-wrapper hide-on-mobile">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search systems..." />
        </div>

        <div className="action-icons">
          <div className="notif-wrapper" ref={notifDropdownRef}>
            <button
              className="icon-btn"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              <FiBell />
              {notifications.length > 0 && <span className="notif-dot"></span>}
            </button>

            {notifOpen && (
              <div className="notif-panel glass-panel">
                <div className="panel-header">System Alerts</div>
                <div className="panel-body">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div key={n.id} className="notif-item">
                        {n.message}
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">Secure. No new alerts.</div>
                  )}
                </div>
                {notifications.length > 0 && (
                  <button className="clear-all" onClick={clearNotifications}>
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="user-wrapper" ref={userDropdownRef}>
            <button
              className="profile-trigger"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="avatar-placeholder">
                <FiUser />
              </div>
              <FiChevronDown
                className={`chevron hide-on-mobile ${menuOpen ? "open" : ""}`}
              />
            </button>

            {menuOpen && (
              <ul className="user-menu glass-panel">
                <li onClick={() => navigate("/profile")}>
                  <FiUser /> Profile
                </li>
                <li onClick={() => navigate("/settings")}>
                  <FiSettings /> Settings
                </li>
                <li className="logout-item" onClick={logout}>
                  <FiLogOut /> Sign Out
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;