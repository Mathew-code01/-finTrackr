// src/components/AppFooter.jsx
import React from "react";
import { FiShield, FiExternalLink, FiCircle } from "react-icons/fi";
import "../styles/AppFooter.css";

function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-left">
          <p className="copyright">
            &copy; {currentYear} <span className="brand-accent">FinTrackr</span>
            <span className="separator">|</span>
            <span className="vision-text">
              Visual Excellence Built for Impact
            </span>
          </p>
        </div>

        <div className="footer-center hide-on-mobile">
          <div className="security-badge">
            <FiShield className="shield-icon" />
            <span>AES-256 Military Grade Encryption</span>
          </div>
        </div>

        <div className="footer-right">
          <nav className="footer-nav">
            <div className="system-status">
              <FiCircle className="status-dot-active" />
              <span>Systems Nominal</span>
            </div>
            <a
              href="https://status.fintrackr.com"
              target="_blank"
              rel="noreferrer"
              className="footer-link status-link"
            >
              Network Status <FiExternalLink className="link-icon" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;