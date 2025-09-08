// src/components/Alerts.jsx
// src/components/Alerts.jsx
import React from "react";
import "../styles/Alerts.css";
import { filterByTimeframe } from "../utils/timeframeFilter";

function Alerts({ balance = 0, budgets = {}, transactions = [], timeframe = "monthly" }) {
  const filteredTx = filterByTimeframe(transactions, timeframe);
  const alerts = [];

  if (balance < 50) alerts.push({ type: "low-balance", text: "Your balance is running low." });

  Object.entries(budgets).forEach(([category, limit]) => {
    const spent = filteredTx
      .filter((t) => t.type === "expense" && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
    if (spent > limit) alerts.push({ type: "over-budget", text: `You exceeded your ${category} budget.` });
  });

  const getIcon = (type) => {
    switch (type) {
      case "low-balance":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff9800" viewBox="0 0 16 16">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm.93 10.588-1 .57V11h1v.588zM8 4.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5z"/>
          </svg>
        );
      case "over-budget":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f44336" viewBox="0 0 16 16">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3 9.5a.5.5 0 0 1-.5.5H5.5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5zm0-3a.5.5 0 0 1-.5.5H5.5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="alerts">
      <h3>Alerts</h3>
      {alerts.length === 0 ? (
        <p className="all-good">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#4caf50"
            viewBox="0 0 16 16"
          >
            <path d="M16 2L6 14 0 8l2-2 4 4 8-10z" />
          </svg>
          All good!
        </p>
      ) : (
        <ul>
          {alerts.map((a, i) => (
            <li
              key={i}
              className={
                ["low-balance", "over-budget"].includes(a.type) ? "pulse" : ""
              }
            >
              {getIcon(a.type)}
              <span>{a.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Alerts;
