// src/components/RecentActivity.jsx

import React from "react";
import "../styles/RecentActivity.css";

function RecentActivity({ transactions }) {
  const recent = transactions.slice(0, 5); // last 5

  return (
    <div className="chart-card recent-activity">
      <h3>Recent Activity</h3>
      {recent.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {recent.map((tx) => (
            <li key={tx.id} className={tx.type}>
              <span>{new Date(tx.date).toLocaleDateString()}</span>
              <span>{tx.description || "-"}</span>
              <span>
                {tx.type === "income" ? "+" : "-"}${tx.amount}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentActivity;
