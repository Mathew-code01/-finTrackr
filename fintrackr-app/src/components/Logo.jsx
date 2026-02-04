// src/components/Logo.jsx
// src/components/Logo.jsx
import React from "react";
import "../styles/Logo.css";

function Logo({ variant = "dark" }) {
  return (
    <div className={`ft-brand-container ft-variant-${variant}`}>
      <svg
        className="ft-brand-symbol"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Three geometric pillars representing institutional stability */}
        <rect x="4" y="12" width="3" height="8" className="ft-pillar-1" />
        <rect x="10" y="8" width="3" height="12" className="ft-pillar-2" />
        <rect x="16" y="4" width="3" height="16" className="ft-pillar-3" />
      </svg>

      <div className="ft-brand-typography">
        <span className="ft-logo-fin">Fin</span>
        <span className="ft-logo-trackr">Trackr</span>
      </div>
    </div>
  );
}

export default Logo;