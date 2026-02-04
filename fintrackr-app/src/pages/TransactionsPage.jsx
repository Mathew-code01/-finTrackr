// src/pages/TransactionsPage.jsx
// src/pages/TransactionsPage.jsx
// src/pages/TransactionsPage.jsx
// src/pages/TransactionsPage.jsx
import React, { useState, useEffect } from "react";
import TransactionList from "../components/TransactionList";
import Sidebar from "../components/Sidebar.jsx";
import AppHeader from "../components/AppHeader.jsx";
import AppFooter from "../components/AppFooter.jsx";
import { FiFilter, FiActivity } from "react-icons/fi";
import "../styles/TransactionsPage.css";

import STORAGE_KEYS, { getFromStorage, saveToStorage } from "../utils/localStorage";

function TransactionsPage() {
  const [transactions, setTransactions] = useState(() =>
    getFromStorage(STORAGE_KEYS.TRANSACTIONS, [])
  );
  const [timeframe, setTimeframe] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
  }, [transactions]);

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const handleEdit = (tx) => {
    // Logic for opening an edit modal would go here
    console.log(`System: Accessing record ${tx.id}`);
  };

  return (
    <div className={`fintrack-tx-vault-root ${sidebarOpen ? "sidebar-active" : ""}`}>
      <AppHeader
        isSidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        selectedTimeframe={timeframe}
        onTimeframeChange={setTimeframe}
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {sidebarOpen && <div className="fintrack-tx-vault-overlay" onClick={() => setSidebarOpen(false)} />}

      <main className="fintrack-tx-vault-main">
        {/* Zebra Section 1: Pure White Header */}
        <section className="fintrack-tx-vault-hero">
          <div className="fintrack-tx-vault-container">
            <header className="fintrack-tx-vault-header">
              <div className="fintrack-tx-vault-title-group">
                <FiActivity className="fintrack-tx-vault-icon" />
                <h1 className="fintrack-tx-vault-title">Financial Archives</h1>
              </div>
              
              <div className="fintrack-tx-vault-filter-pill">
                <FiFilter />
                <label>Period:</label>
                <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
                  <option value="all">Full History</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="365d">Annual View</option>
                </select>
              </div>
            </header>
          </div>
        </section>

        {/* Zebra Section 2: Deep/Blur Soft Gray */}
        <section className="fintrack-tx-vault-content-section">
          <div className="fintrack-tx-vault-container">
            <div className="fintrack-tx-vault-ledger-wrapper">
              <TransactionList
                transactions={transactions}
                timeframe={timeframe}
                onDelete={handleDelete}
                onEdit={handleEdit}
                // No limit here as this is the full page view
              />
            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

export default TransactionsPage;