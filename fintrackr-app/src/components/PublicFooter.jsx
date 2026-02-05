// src/components/PublicFooter.jsx

// src/components/PublicFooter.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import "../styles/PublicFooter.css";

function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ft-public-minimal">
      <div className="ft-public-container">
        {/* Institutional Call to Action */}
        <div className="ft-public-cta-box">
          <h2 className="ft-public-cta-title">
            Take control of your financial architecture.
          </h2>
          <p className="ft-public-vision-sub">
            Your data stays private. Your growth remains personal.
          </p>
          <Link to="/register" className="ft-public-btn-action">
            Initialize Your Dashboard
          </Link>
        </div>

        <div className="ft-public-brand-row">
          <div className="ft-public-identity">
            <Logo variant="light" />
            <p className="ft-public-tagline">
              Sophisticated asset management and high-precision tracking 
              for modern capital allocation.
            </p>
          </div>

          {/* Privacy/Security Badge instead of Design Badge */}
          <div className="ft-public-impact-badge">
            Institutional-Grade Security & Privacy
          </div>
        </div>

        <div className="ft-public-copyright-row">
          <p>&copy; {currentYear} FinTrackr. Precision Asset Management.</p>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;