// src/components/TransactionList.jsx
// src/components/TransactionList.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Use Link for internal navigation
import {
  FiArrowUp,
  FiArrowDown,
  FiTrash2,
  FiEdit2,
  FiSearch,
  FiChevronRight,
} from "react-icons/fi";
import "../styles/TransactionList.css";
import { filterByTimeframe } from "../utils/timeframeFilter";

function TransactionList({ transactions, timeframe, onDelete, onEdit, limit }) {
  const [filter, setFilter] = useState("");
  const [query, setQuery] = useState("");

  const formatCurrency = (amt) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amt);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const filteredTx = filterByTimeframe(transactions, timeframe);

  const sortedTx = [...filteredTx]
    .filter((tx) => (filter ? tx.type === filter : true))
    .filter(
      (tx) =>
        tx.description?.toLowerCase().includes(query.toLowerCase()) ||
        tx.category?.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // ✅ Apply Limit Logic
  const displayTx = limit ? sortedTx.slice(0, limit) : sortedTx;
  const hasMore = limit && sortedTx.length > limit;

  return (
    <div className="tx-ledger-container">
      {/* Search and Filter Row */}
      <div className="tx-controls">
        <div className="tx-search-bar">
          <FiSearch className="tx-search-icon" />
          <input
            type="text"
            placeholder="Search ledger..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="tx-filter-select">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Transactions</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
        </div>
      </div>

      <div className="tx-table-wrapper">
        <table className="tx-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="text-right">Amount</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayTx.length === 0 ? (
              <tr>
                <td colSpan="5" className="tx-empty-state">
                  No records found.
                </td>
              </tr>
            ) : (
              displayTx.map((tx) => (
                <tr key={tx.id} className="tx-row">
                  <td data-label="Date" className="tx-date">
                    {formatDate(tx.date)}
                  </td>
                  <td data-label="Description" className="tx-description">
                    <div className="tx-desc-stack">
                      {tx.description || "Untitled Entry"}
                      {/* NEW: AUTOMATION BADGE */}
                      {tx.recurring && (
                        <span className="auto-status-badge">
                          Automated {tx.frequency}
                        </span>
                      )}
                    </div>
                  </td>
                  <td data-label="Category">
                    <span className="tx-badge">{tx.category}</span>
                  </td>
                  <td data-label="Amount" className={`tx-amount ${tx.type}`}>
                    <span className="tx-type-icon">
                      {tx.type === "income" ? <FiArrowUp /> : <FiArrowDown />}
                    </span>
                    {formatCurrency(tx.amount)}
                  </td>
                  <td data-label="Actions" className="tx-actions">
                    <button className="tx-btn-edit" onClick={() => onEdit(tx)}>
                      <FiEdit2 />
                    </button>
                    <button
                      className="tx-btn-delete"
                      onClick={() => onDelete(tx.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ See More Action */}
      {hasMore && (
        <div className="tx-see-more-wrapper">
          <Link to="/transactions" className="tx-see-more-link">
            See Full History <FiChevronRight />
          </Link>
        </div>
      )}
    </div>
  );
}

export default TransactionList;