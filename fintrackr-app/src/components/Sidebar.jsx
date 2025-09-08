// src/components/Sidebar.jsx
// src/components/Sidebar.jsx
// src/components/Sidebar.jsx
// src/components/Sidebar.jsx
// src/components/Sidebar.jsx
import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaListAlt, FaUser, FaBell, FaSearch } from "react-icons/fa";
import "../styles/Sidebar.css";
import { useNotifications } from "../hooks/useNotifications";
import Logo from "../components/Logo.jsx";

function Sidebar({ isOpen, onClose }) {
  const { notifications, clearNotifications } = useNotifications();
  const [notifOpen, setNotifOpen] = useState(false);
  const notifDropdownRef = useRef(null);

  // Close when clicking outside
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
        <div className="sidebar-header">
          <Logo />
        </div>

        {/* Mobile-only Search */}
        <div className="sidebar-search hide-on-desktop">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search transactions..." />
        </div>

        {/* Mobile-only Notifications */}
        <div
          className="sidebar-bell hide-on-desktop"
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

        {/* Navigation */}
        <nav>
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaHome className="sidebar-icon" /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transactions"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaListAlt className="sidebar-icon" /> Transactions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaUser className="sidebar-icon" /> Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
