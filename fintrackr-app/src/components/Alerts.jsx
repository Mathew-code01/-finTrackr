// src/components/Alerts.jsx
// src/components/Alerts.jsx
import React from "react";
import "../styles/Alerts.css";
import { filterByTimeframe } from "../utils/timeframeFilter";

function Alerts({
  balance = 0,
  budgets = {},
  transactions = [],
  timeframe = "monthly",
}) {
  const filteredTx = filterByTimeframe(transactions, timeframe);
  const alerts = [];

  if (balance < 50)
    alerts.push({
      type: "critical",
      text: "Low Capital: Immediate deposit recommended.",
    });

  Object.entries(budgets).forEach(([category, limit]) => {
    const spent = filteredTx
      .filter((t) => t.type === "expense" && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
    if (spent > limit)
      alerts.push({
        type: "warning",
        text: `Limit Breached: ${category} exceeds threshold.`,
      });
  });

  return (
    <div className="dark-glass-card alerts-container">
      <h3 className="elegant-heading-xs">System Alerts</h3>
      {alerts.length === 0 ? (
        <div className="all-clear">
          <span className="status-dot success"></span>
          <p className="text-muted-dark">All systems within parameters.</p>
        </div>
      ) : (
        <div className="alerts-list">
          {alerts.map((a, i) => (
            <div key={i} className={`alert-toast ${a.type}`}>
              <span className={`status-dot ${a.type} pulse`}></span>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Alerts;