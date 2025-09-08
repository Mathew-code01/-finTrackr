// src/components/TopCategories.jsx
import React from "react";
import "../styles/TopCategories.css";
import { filterByTimeframe } from "../utils/timeframeFilter";

function TopCategories({ transactions = [], timeframe = "monthly" }) {
  // Filter transactions by timeframe
  const filteredTx = filterByTimeframe(transactions, timeframe);

  // Only consider expenses
  const expenses = filteredTx.filter((t) => t.type === "expense");

  // Sum totals per category
  const totals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  // Get top 3 categories
  const sorted = Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  return (
    <div className="top-categories">
      <h3>Top Spending Categories</h3>
      {sorted.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ul>
          {sorted.map((c, i) => (
            <li key={i}>
              <span>{c.category}</span>
              <strong>${c.amount.toFixed(2)}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TopCategories;
