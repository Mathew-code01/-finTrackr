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
        {/* Simplified Financial CTA */}
        <div className="ft-public-cta-box">
          <h2 className="ft-public-cta-title">
            Take control of your financial future.
          </h2>
          <p className="ft-public-vision-sub">
            Let's build your vision. Get in touch
          </p>
          <Link to="/register" className="ft-public-btn-action">
            Start Tracking Now
          </Link>
        </div>

        <div className="ft-public-brand-row">
          <div className="ft-public-identity">
            <Logo variant="light" />
            <p className="ft-public-tagline">
              Advanced analytics and precision tracking for your personal and
              commercial assets.
            </p>
          </div>

          {/* Visual Excellence text moved here for clean spacing */}
          <div className="ft-public-impact-badge">
            Visual Excellence Built for Impact
          </div>
        </div>

        <div className="ft-public-copyright-row">
          <p>&copy; {currentYear} FinTrackr. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;