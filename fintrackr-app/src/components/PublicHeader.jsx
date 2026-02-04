// src/components/PublicHeader.jsx
// src/components/PublicHeader.jsx
// src/components/PublicHeader.jsx
// src/components/PublicHeader.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/PublicHeader.css";
import Logo from "./Logo";

function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /** * LOGIC FOR HIGH-END VISIBILITY:
   * 1. If we are on mobile (isMobile), logo is ALWAYS "dark" because the background is white.
   * 2. If we are on desktop:
   * - "dark" if scrolled or menu is open.
   * - "light" if at the top (over the dark hero section).
   */
  const logoVariant = isMobile || scrolled || menuOpen ? "dark" : "light";

  return (
    <header
      className={`public-header ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-active" : ""}`}
    >
      <div className="container header-content">
        <Logo variant={logoVariant} />

        <div
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
        </div>

        <nav ref={menuRef} className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Overview
          </Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            Log in
          </Link>
          <Link
            to="/register"
            className="btn-register"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default PublicHeader;