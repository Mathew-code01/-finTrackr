// src/components/LoadingScreen.jsx
import React from "react";
import "../styles/LoadingScreen.css";

function LoadingScreen() {
  return (
    <div className="ft-loading-overlay">
      <div className="ft-loading-content">
        <div className="ft-loading-pillars">
          <span className="pillar p1"></span>
          <span className="pillar p2"></span>
          <span className="pillar p3"></span>
        </div>
        <p className="ft-loading-text">Securing Session</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
