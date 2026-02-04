// src/components/SummaryCard.jsx
// src/components/SummaryCard.jsx
// src/components/SummaryCard.jsx
// src/components/SummaryCard.jsx
import React from "react";
import "../styles/SummaryCard.css";

function SummaryCard({ title, amount, icon, type, change }) {
  const isPositive = change >= 0;
  
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return (
    <article className={`fintrack-stat-v2-card ${type}`}>
      <div className="fintrack-stat-v2-inner">
        <header className="fintrack-stat-v2-header">
          <div className={`fintrack-stat-v2-icon-box ${type}`}>
            {icon}
          </div>
          <span className="fintrack-stat-v2-label">{title}</span>
        </header>

        <div className="fintrack-stat-v2-body">
          <h2 className="fintrack-stat-v2-amount">{formatted}</h2>
          
          {change !== undefined && (
            <div className={`fintrack-stat-v2-trend ${isPositive ? "up" : "down"}`}>
              <span className="fintrack-stat-v2-badge">
                {isPositive ? "+" : ""}{change}%
              </span>
              <span className="fintrack-stat-v2-trend-text">vs last month</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Subtle background glow for high-end depth */}
      <div className="fintrack-stat-v2-glow" />
    </article>
  );
}

export default SummaryCard;