// src/components/Goals.jsx

// src/components/Goals.jsx
// src/components/Goals.jsx
import React, { useState } from "react";
import "../styles/Goals.css";
import { filterByTimeframe } from "../utils/timeframeFilter";

function Goals({ goals = [], transactions = [], timeframe = "monthly", onAddGoal }) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");

  const filteredTx = filterByTimeframe(transactions, timeframe);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !target) return;

    onAddGoal({
      id: Date.now(),
      name,
      target: parseFloat(target),
    });

    setName("");
    setTarget("");
  };

  // Returns progress bar class based on completion %
  const getProgressClass = (percent) => {
    if (percent >= 100) return "goal-fill high";
    if (percent >= 50) return "goal-fill medium";
    return "goal-fill low";
  };

  return (
    <div className="chart-card goals">
      <h3>Savings Goals</h3>

      <form onSubmit={handleSubmit} className="add-goal-form">
        <input
          type="text"
          placeholder="Goal Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          min="0.01"
          required
        />
        <button type="submit">Add Goal</button>
      </form>

      {goals.length === 0 ? (
        <p>No goals yet.</p>
      ) : (
        goals.map((goal, i) => {
          const progress = filteredTx
            .filter((t) => t.type === "income" && t.goal === goal.name)
            .reduce((sum, t) => sum + t.amount, 0);

          const percent = Math.min((progress / goal.target) * 100, 100);

          // ...inside map() for each goal
          const isComplete = percent >= 100;

          return (
            <div key={goal.id || i} className="goal-item">
              <span>{goal.name}</span>
              <div className="goal-bar">
                <div
                  className={`${getProgressClass(percent)} ${
                    isComplete ? "pulse" : ""
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="goal-progress">
                ${progress.toFixed(2)} / ${goal.target.toFixed(2)}
                {isComplete && <span className="checkmark">✔</span>}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Goals;
