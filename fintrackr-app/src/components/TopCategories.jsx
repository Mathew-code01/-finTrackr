// src/components/TopCategories.jsx
// src/components/TopCategories.jsx
import React from "react";
import "../styles/TopCategories.css";
import { filterByTimeframe } from "../utils/timeframeFilter";

function TopCategories({ transactions = [], timeframe = "monthly" }) {
  const filteredTx = filterByTimeframe(transactions, timeframe);
  const expenses = filteredTx.filter((t) => t.type === "expense");

  const totals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const sorted = Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  return (
    <div className="top-cats-widget">
      <h4 className="widget-label">Allocation</h4>
      {sorted.length === 0 ? (
        <p className="empty-msg">Data unavailable</p>
      ) : (
        <ul className="cat-list">
          {sorted.map((c, i) => (
            <li key={i} className="cat-item">
              <span className="cat-label">{c.category}</span>
              <div className="cat-divider"></div>
              <span className="cat-value">${c.amount.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TopCategories;