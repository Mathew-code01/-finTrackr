// src/components/PublicHeader.jsx
// src/components/PublicHeader.jsx
// src/components/PublicHeader.jsx
// src/components/PublicHeader.jsx
// src/components/PublicHeader.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/PublicHeader.css";
import Logo from "./Logo"; // ✅ Import your logo component

function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="public-header">
      <div className="container">
        {/* ✅ Logo */}
        <Logo />

        {/* ✅ Hamburger (mobile menu) */}
        <div
          ref={toggleRef}
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            style={{
              transform: menuOpen ? "rotate(45deg) translateY(6px)" : "",
            }}
          ></span>
          <span style={{ opacity: menuOpen ? "0" : "1" }}></span>
          <span
            style={{
              transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "",
            }}
          ></span>
        </div>

        {/* ✅ Navigation */}
        <nav ref={menuRef} className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
          <Link to="/register" onClick={() => setMenuOpen(false)}>
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default PublicHeader;
