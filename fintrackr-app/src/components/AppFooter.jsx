// src/components/AppFooter.jsx
import React from "react";
import "../styles/AppFooter.css";

function AppFooter() {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} FinTrackr. All rights reserved.</p>
    </footer>
  );
}

export default AppFooter;
