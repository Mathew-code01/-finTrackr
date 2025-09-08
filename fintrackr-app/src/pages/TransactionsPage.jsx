// src/pages/TransactionsPage.jsx
// src/pages/TransactionsPage.jsx
// src/pages/TransactionsPage.jsx
import React, { useState, useEffect } from "react";
import TransactionList from "../components/TransactionList";
import Sidebar from "../components/Sidebar.jsx";
import AppHeader from "../components/AppHeader.jsx";
import AppFooter from "../components/AppFooter.jsx";
import "../styles/TransactionList.css";
import "../styles/TransactionsPage.css";

import STORAGE_KEYS, {
  getFromStorage,
  saveToStorage,
} from "../utils/localStorage";

function TransactionsPage() {
  const [transactions, setTransactions] = useState(() =>
    getFromStorage(STORAGE_KEYS.TRANSACTIONS, [])
  );
  const [timeframe, setTimeframe] = useState("all");

  // ✅ Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // keep localStorage updated
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
  }, [transactions]);

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const handleEdit = (tx) => {
    alert(`Edit transaction: ${tx.description}`);
  };

  return (
    <div className="app-layout transactions-page">
      <AppHeader
        isSidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        selectedTimeframe={timeframe}
        onTimeframeChange={setTimeframe}
      />

      <div className="app-body">
        {/* Sidebar overlay when open (mobile) */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="app-content">
          <h1>Transactions</h1>

          <div className="timeframe-filter">
            <label>Filter by:</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="all">All</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="365d">Last year</option>
            </select>
          </div>

          <TransactionList
            transactions={transactions}
            timeframe={timeframe}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </main>
      </div>

      <AppFooter />
    </div>
  );
}

export default TransactionsPage;
