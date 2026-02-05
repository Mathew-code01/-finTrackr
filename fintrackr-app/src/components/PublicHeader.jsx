// src/components/PublicHeader.jsx
// src/components/PublicHeader.jsx
// src/components/PublicHeader.jsx
// src/components/PublicHeader.jsx
// src/components/PublicHeader.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/PublicHeader.css";
import Logo from "./Logo";

function PublicHeader({ forceTheme }) { // Added forceTheme prop
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

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

  // LOGIC: 
  // 1. If forceTheme is provided (e.g., "dark"), use it.
  // 2. Otherwise, use the dynamic scroll logic.
  const logoVariant = forceTheme ? forceTheme : (isMobile || scrolled || menuOpen ? "dark" : "light");

  return (
    <header className={`public-header ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-active" : ""} theme-${logoVariant}`}>
      <div className="container header-content">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo variant={logoVariant} />
        </Link>

        <div className={`menu-toggle ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={() => setMenuOpen(false)}>
            Overview
          </Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Log in</Link>
          <Link to="/register" className="btn-register" onClick={() => setMenuOpen(false)}>
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default PublicHeader;