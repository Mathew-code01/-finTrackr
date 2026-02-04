// src/components/BudgetTracker.jsx
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
    onSaveBudgets(updated);
  };

  return (
    <div className="budget-widget">
      <h4 className="widget-label">Budget Efficiency</h4>
      <div className="budget-stack">
        {Object.entries(editableBudgets).map(([category, limit]) => {
          const spent = filteredTx
            .filter((t) => t.type === "expense" && t.category === category)
            .reduce((sum, t) => sum + t.amount, 0);
          const percent = Math.min((spent / limit) * 100, 100);
          const isOver = spent > limit;

          return (
            <div key={category} className="budget-row">
              <div className="budget-info">
                <span className="cat-name">{category}</span>
                <span className={`cat-status ${isOver ? "status-over" : ""}`}>
                  {isOver ? "Over Limit" : `${Math.round(percent)}%`}
                </span>
              </div>
              <div className="budget-progress-bg">
                <div 
                  className={`budget-progress-fill ${isOver ? "fill-danger" : ""}`} 
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="budget-input-group">
                <span className="currency-symbol">$</span>
                <input
                  type="number"
                  value={limit}
                  onChange={(e) => handleChange(category, e.target.value)}
                />
                <span className="spent-total">Spent: ${spent.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BudgetTracker;