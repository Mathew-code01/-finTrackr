// src/components/BudgetTracker.jsx
// src/components/BudgetTracker.jsx
import React, { useState } from "react";
import "../styles/BudgetTracker.css";
import { filterByTimeframe } from "../utils/timeframeFilter";

function BudgetTracker({ budgets = {}, transactions = [], timeframe = "monthly", onSaveBudgets }) {
  const [editableBudgets, setEditableBudgets] = useState(budgets);
  const filteredTx = filterByTimeframe(transactions, timeframe);

  const handleChange = (category, value) => {
    const updated = { ...editableBudgets, [category]: Number(value) };
    setEditableBudgets(updated);
    onSaveBudgets(updated); // persist to Dashboard
  };

  return (
    <div className="chart-card budget-tracker">
      <h3>Budgets</h3>
      {Object.keys(editableBudgets).length === 0 ? (
        <p>No budgets set.</p>
      ) : (
        Object.entries(editableBudgets).map(([category, limit]) => {
          const spent = filteredTx
            .filter((t) => t.type === "expense" && t.category === category)
            .reduce((sum, t) => sum + t.amount, 0);
          const percent = Math.min((spent / limit) * 100, 100);

          return (
            <div key={category} className="budget-item">
              <span className="category-name">{category}</span>
              <div className="budget-bar">
                <div
                  className={`budget-fill ${spent > limit ? "over" : ""}`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <div className="budget-values">
                <input
                  type="number"
                  min="0"
                  value={limit}
                  onChange={(e) => handleChange(category, e.target.value)}
                />
                <span className="spent">
                  ${spent} / ${limit}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default BudgetTracker;
