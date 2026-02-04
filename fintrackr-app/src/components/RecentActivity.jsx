// src/components/RecentActivity.jsx

import React from "react";
import "../styles/RecentActivity.css";

function RecentActivity({ transactions }) {
  // Logic to get the 5 most recent entries
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dark-glass-card recent-activity">
      <h3 className="elegant-heading-xs">Ledger / Latest Movements</h3>

      {recent.length === 0 ? (
        <p className="text-muted-dark">No recent movements detected.</p>
      ) : (
        <div className="activity-list">
          {recent.map((tx) => (
            <div key={tx.id} className={`activity-row ${tx.type}`}>
              <div className="activity-info">
                <span className="activity-date">
                  {new Date(tx.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="activity-desc">
                  {tx.description || "General Entry"}
                  {/* NEW: SUBTLE DOT FOR AUTOMATION */}
                  {tx.recurring && (
                    <span
                      className="auto-dot"
                      title="Automated Movement"
                    ></span>
                  )}
                </span>
              </div>

              <div className="activity-value-wrapper">
                <span className={`activity-amount ${tx.type}`}>
                  {tx.type === "income" ? "+" : "-"}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(tx.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;