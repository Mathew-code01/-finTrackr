// src/components/SummaryCard.jsx
// src/components/SummaryCard.jsx
// src/components/SummaryCard.jsx
import React from "react";
import "../styles/SummaryCard.css";

function SummaryCard({ title, amount, icon, type, change }) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return (
    <div className={`summary-card ${type}`}>
      <div className={`card-icon ${type}`}>{icon}</div>
      <div className="card-details">
        <h3>{title}</h3>
        <p className="amount">{formatted}</p>
        {change !== undefined && (
          <span className={`change-badge ${change >= 0 ? "positive" : "negative"}`}>
            {change >= 0 ? "▲" : "▼"} {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  );
}

export default SummaryCard;
