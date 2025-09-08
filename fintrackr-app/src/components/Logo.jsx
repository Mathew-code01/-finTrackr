// src/components/Logo.jsx
// src/components/Logo.jsx
import React from "react";
import "../styles/Logo.css";

function Logo() {
  return (
    <div className="app-logo">
      <svg
        className="logo-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <circle cx="24" cy="24" r="22" className="logo-circle" />
        <polyline
          points="12,28 20,20 28,26 36,14"
          className="logo-chart"
        />
      </svg>
      <span className="logo-text">FinTrackr</span>
    </div>
  );
}

export default Logo;

