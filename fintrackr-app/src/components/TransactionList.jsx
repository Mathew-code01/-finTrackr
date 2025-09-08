// src/components/TransactionList.jsx
// src/components/TransactionList.jsx
import React, { useState } from "react";
import {
  FiArrowUp,
  FiArrowDown,
  FiTrash2,
  FiEdit2,
  FiSearch,
} from "react-icons/fi";
import "../styles/TransactionList.css";
import { filterByTimeframe } from "../utils/timeframeFilter";

function TransactionList({ transactions, timeframe, onDelete, onEdit }) {
  const [filter, setFilter] = useState("");
  const [query, setQuery] = useState("");

  const formatCurrency = (amt) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amt);

  const formatDate = (d) => new Date(d).toLocaleDateString();

  const filteredTx = filterByTimeframe(transactions, timeframe);

  const sortedTx = [...filteredTx]
    .filter((tx) => (filter ? tx.type === filter : true))
    .filter(
      (tx) =>
        tx.description?.toLowerCase().includes(query.toLowerCase()) ||
        tx.category?.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="transaction-list">
      <div className="list-header">
        <h3>Recent Transactions</h3>
        <div className="filters">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedTx.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                You have no transactions yet. Start by adding one!
              </td>
            </tr>
          ) : (
            sortedTx.map((tx) => (
              <tr key={tx.id} className={tx.type}>
                <td data-label="Date">{formatDate(tx.date)}</td>
                <td data-label="Description">{tx.description || "-"}</td>
                <td data-label="Category">
                  <span className={`category-badge ${tx.category}`}>
                    {tx.category}
                  </span>
                </td>
                <td data-label="Amount">
                  {tx.type === "income" ? (
                    <span className="income">
                      <FiArrowUp /> {formatCurrency(tx.amount)}
                    </span>
                  ) : (
                    <span className="expense">
                      <FiArrowDown /> {formatCurrency(tx.amount)}
                    </span>
                  )}
                </td>
                <td data-label="Actions">
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(tx)}
                    title="Edit"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(tx.id)}
                    title="Delete"
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
  );
}

export default TransactionList;
