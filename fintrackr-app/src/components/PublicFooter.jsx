// src/components/PublicFooter.jsx

import React from "react";
import "../styles/PublicFooter.css";

function PublicFooter() {
  return (
    <footer className="public-footer">
      <p>© {new Date().getFullYear()} FinTrackr. All rights reserved.</p>
    </footer>
  );
}

export default PublicFooter;
