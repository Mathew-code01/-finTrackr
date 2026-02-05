// src/components/LoadingScreen.jsx
import React from "react";
import "../styles/LoadingScreen.css";

function LoadingScreen() {
  return (
    <div className="ft-loading-overlay">
      <div className="ft-loading-wrapper">
        {/* The Brand Orbit - high-end motion element */}
        <div className="ft-loading-orbit">
          <div className="orbit-ring"></div>
          <div className="ft-loading-pillars">
            <span className="pillar p1"></span>
            <span className="pillar p2"></span>
            <span className="pillar p3"></span>
          </div>
        </div>

        <div className="ft-loading-meta">
          <p className="ft-loading-text">Securing Session</p>
          <div className="ft-loading-status-bar">
            <div className="status-progress"></div>
          </div>
          <span className="ft-loading-subtext">Encryption 256-bit active</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;