// src/pages/NotFound.jsx
// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <div className="notfound-root">
      {/* Upper White Section */}
      <section className="zebra-section section-white full-height-center">
        <div className="container-elegant">
          <header className="hero-centered">
            <span className="eyebrow">Error Protocol 404</span>
            <h1 className="section-title">Navigation Lost</h1>
            <p className="notfound-description">
              The requested financial resource or terminal page is currently
              unavailable or has been relocated within the vault.
            </p>
            <div className="notfound-actions">
              <Link to="/" className="btn-agency-primary">
                <FiArrowLeft /> Return to Dashboard
              </Link>
            </div>
          </header>
        </div>
      </section>

      {/* Decorative Blur Bottom to maintain Zebra rhythm */}
      <div className="section-dark mini-footer-accent"></div>
    </div>
  );
}

export default NotFound;