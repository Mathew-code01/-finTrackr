// src/components/Goals.jsx

// src/components/Goals.jsx
// src/components/Goals.jsx
import React, { useState } from "react";
import "../styles/Goals.css";
import { filterByTimeframe } from "../utils/timeframeFilter";

function Goals({
  goals = [],
  transactions = [],
  timeframe = "monthly",
  onAddGoal,
}) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");

  const filteredTx = filterByTimeframe(transactions, timeframe);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !target) return;
    onAddGoal({ id: Date.now(), name, target: parseFloat(target) });
    setName("");
    setTarget("");
  };

  const getProgressClass = (percent) => {
    if (percent >= 100) return "goal-fill high pulse";
    if (percent >= 50) return "goal-fill medium";
    return "goal-fill low";
  };

  return (
    <div className="dark-glass-card goals-container">
      <h3 className="elegant-heading-xs">Strategic Goals</h3>

      <form onSubmit={handleSubmit} className="dark-mini-form">
        <input
          type="text"
          placeholder="Objective"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="dark-input-sm"
          required
        />
        <input
          type="number"
          placeholder="Target $"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="dark-input-sm"
          required
        />
        <button type="submit" className="btn-accent-sm">
          Set
        </button>
      </form>

      <div className="goals-scroll-area">
        {goals.length === 0 ? (
          <p className="text-muted-dark">No active objectives.</p>
        ) : (
          goals.map((goal, i) => {
            const progress = filteredTx
              .filter((t) => t.type === "income" && t.goal === goal.name)
              .reduce((sum, t) => sum + t.amount, 0);
            const percent = Math.min((progress / goal.target) * 100, 100);
            const isComplete = percent >= 100;

            return (
              <div key={goal.id || i} className="goal-item-dark">
                <div className="goal-header">
                  <span className="goal-name">{goal.name}</span>
                  <span className="goal-status">{Math.round(percent)}%</span>
                </div>
                <div className="dark-progress-track">
                  <div
                    className={getProgressClass(percent)}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="goal-footer">
                  <span>
                    ${progress.toLocaleString()} / $
                    {goal.target.toLocaleString()}
                  </span>
                  {isComplete && (
                    <span className="checkmark-gold">✦ COMPLETE</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Goals;