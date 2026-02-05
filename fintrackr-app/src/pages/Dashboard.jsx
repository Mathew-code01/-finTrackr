// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { FiArrowUp, FiArrowDown, FiDollarSign } from "react-icons/fi";

// Components
import Sidebar from "../components/Sidebar.jsx";
import AppHeader from "../components/AppHeader.jsx";
import AppFooter from "../components/AppFooter.jsx";
import SummaryCard from "../components/SummaryCard.jsx";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import PieChart from "../components/PieChart.jsx";
import BarChart from "../components/BarChart.jsx";
import LineChart from "../components/LineChart.jsx";
import AreaChart from "../components/AreaChart.jsx";
import RecentActivity from "../components/RecentActivity.jsx";
import BudgetTracker from "../components/BudgetTracker.jsx";
import Goals from "../components/Goals.jsx";
import ExportData from "../components/ExportData.jsx";
import TopCategories from "../components/TopCategories.jsx";
import UpcomingBills from "../components/UpcomingBills.jsx";
import Alerts from "../components/Alerts.jsx";

// Hooks & Utils
import { useNotifications } from "../hooks/useNotifications";
import STORAGE_KEYS, {
  saveToStorage,
  getFromStorage,
} from "../utils/localStorage.js";

import "../styles/Dashboard.css";

function Dashboard() {
  const [transactions, setTransactions] = useState(() =>
    getFromStorage(STORAGE_KEYS.TRANSACTIONS, []),
  );
  const [goals, setGoals] = useState(() =>
    getFromStorage(STORAGE_KEYS.GOALS, []),
  );
  const [bills, setBills] = useState(() =>
    getFromStorage(STORAGE_KEYS.BILLS, []),
  );
  const [budgets, setBudgets] = useState(() =>
    getFromStorage(STORAGE_KEYS.BUDGETS, {}),
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("monthly");
  const [activeChart, setActiveChart] = useState("pie"); // State is now used below!

  const { addNotification } = useNotifications();

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
    saveToStorage(STORAGE_KEYS.GOALS, goals);
    saveToStorage(STORAGE_KEYS.BILLS, bills);
    saveToStorage(STORAGE_KEYS.BUDGETS, budgets);
  }, [transactions, goals, bills, budgets]);

  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = incomeTotal - expenseTotal;

  const handleAddTransaction = (tx) => {
    setTransactions([tx, ...transactions]);
    addNotification("Ledger Updated Successfully ✅");
  };

  const handleAddGoal = (goal) => {
    setGoals([...goals, goal]);
    addNotification("Strategic Goal Established 🎯");
  };

  const handleAddBill = (bill) => {
    setBills([...bills, bill]);
    addNotification("Payment Obligation Noted 📅");
  };

  // --- NEW: AUTOMATION ENGINE ---
  useEffect(() => {
    const processAutomations = () => {
      const lastRun = getFromStorage(
        "LAST_AUTOMATION_RUN",
        new Date().toISOString(),
      );
      const today = new Date();
      const lastRunDate = new Date(lastRun);

      // Check if at least one day has passed
      if (today.toDateString() !== lastRunDate.toDateString()) {
        const recurringTx = transactions.filter((t) => t.recurring);
        let newEntries = [];

        recurringTx.forEach((baseTx) => {
          // Logic to check if a new entry is needed based on frequency
          // This is a simplified version for 'Daily'
          if (baseTx.frequency === "daily") {
            // Calculate how many days missed
            const diffTime = Math.abs(today - lastRunDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            for (let i = 1; i <= diffDays; i++) {
              const newDate = new Date(lastRunDate);
              newDate.setDate(newDate.getDate() + i);

              newEntries.push({
                ...baseTx,
                id: Date.now() + Math.random(),
                date: newDate.toISOString().split("T")[0],
                status: "Automated Standing Order",
              });
            }
          }
          // Note: Weekly/Monthly logic follows the same date-diff pattern
        });

        if (newEntries.length > 0) {
          setTransactions((prev) => [...newEntries, ...prev]);
          addNotification(
            `${newEntries.length} Automated Ledger entries processed.`,
          );
        }

        // Update the last run marker
        saveToStorage("LAST_AUTOMATION_RUN", today.toISOString());
      }
    };

    processAutomations();
  }, []);

  return (
    <div className="dashboard-page">
      <AppHeader
        isSidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        selectedTimeframe={selectedTimeframe}
        onTimeframeChange={setSelectedTimeframe}
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="dashboard-main">
        {/* SECTION 1: SUMMARY */}
        <section className="zebra-section section-white">
          <div className="container-elegant">
            <header className="hero-centered">
              <span className="eyebrow">Financial Overview</span>
              <h1 className="section-title">Capital Intelligence</h1>
              <div className="automation-status">
                <span className="dot-active"></span> System Synchronized:{" "}
                {new Date().toLocaleDateString()}
              </div>
            </header>
            <div className="summary-cards-minimal">
              <SummaryCard
                title="Current Liquidity"
                amount={balance}
                icon={<FiDollarSign />}
                type="balance"
              />
              <SummaryCard
                title="Inbound Flow"
                amount={incomeTotal}
                icon={<FiArrowUp />}
                type="income"
              />
              <SummaryCard
                title="Outbound Flow"
                amount={expenseTotal}
                icon={<FiArrowDown />}
                type="expense"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: CHARTS (Responsive Grid) */}
        <section className="zebra-section section-dark">
          <div className="container-elegant">
            <div
              className="section-header-row"
              style={{
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <h2
                className="elegant-heading-sm"
                style={{ color: "var(--text-on-dark)" }}
              >
                Analytics Suite
              </h2>

              {/* USES setActiveChart: Navigation for mobile users */}
              <div className="filter-pill-group">
                {["pie", "bar", "line", "area"].map((type) => (
                  <button
                    key={type}
                    className={`filter-pill ${activeChart === type ? "active" : ""}`}
                    onClick={() => setActiveChart(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="two-column-grid">
              {/* USES activeChart: 'is-active' class controls visibility via CSS */}
              <div
                className={`chart-wrapper ${activeChart === "pie" ? "is-active" : ""}`}
              >
                <h4 className="eyebrow-dark">Allocation</h4>
                <PieChart
                  transactions={transactions}
                  timeframe={selectedTimeframe}
                />
              </div>
              <div
                className={`chart-wrapper ${activeChart === "bar" ? "is-active" : ""}`}
              >
                <h4 className="eyebrow-dark">Cash Flow</h4>
                <BarChart
                  transactions={transactions}
                  timeframe={selectedTimeframe}
                />
              </div>
              <div
                className={`chart-wrapper ${activeChart === "line" ? "is-active" : ""}`}
              >
                <h4 className="eyebrow-dark">Growth Trend</h4>
                <LineChart
                  transactions={transactions}
                  timeframe={selectedTimeframe}
                />
              </div>
              <div
                className={`chart-wrapper ${activeChart === "area" ? "is-active" : ""}`}
              >
                <h4 className="eyebrow-dark">Volume</h4>
                <AreaChart
                  transactions={transactions}
                  timeframe={selectedTimeframe}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TRANSACTION LIST - FULL WIDTH MASTER (Zebra White) */}
        <section className="zebra-section section-white">
          <div className="container-elegant">
            {/* NEW UNIQUE WRAPPER: Master Grid Stack */}
            <div className="layout-master-stack">
              {/* 1. TOP ROW: Transaction list takes full width */}
              <div className="layout-full-width-top">
                <h3 className="elegant-small-heading">Active Ledger</h3>
                <div className="grid-item-card layout-ledger-expansion">
                  <TransactionList
                    transactions={transactions}
                    timeframe={selectedTimeframe}
                    limit={6} /* Increased limit to fill the page properly */
                    onDelete={(id) =>
                      setTransactions(transactions.filter((t) => t.id !== id))
                    }
                    onEdit={(updatedTx) =>
                      setTransactions(
                        transactions.map((t) =>
                          t.id === updatedTx.id ? updatedTx : t,
                        ),
                      )
                    }
                  />
                </div>
              </div>

              {/* 2. BOTTOM ROW: The 2+1 Grid format */}
              <div className="layout-widget-grid-sub">
                <div className="grid-item-card">
                  <BudgetTracker
                    budgets={budgets}
                    transactions={transactions}
                    timeframe={selectedTimeframe}
                  />
                </div>
                <div className="grid-item-card">
                  <TopCategories
                    transactions={transactions}
                    timeframe={selectedTimeframe}
                  />
                </div>

                {/* The 'below one' - Spanning full width under the two above */}
                <div className="grid-item-card layout-span-footer-widget">
                  <UpcomingBills bills={bills} onAddBill={handleAddBill} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: ACTIONS & WIDGETS */}
        <section className="zebra-section section-dark">
          <div className="container-elegant">
            {/* Clean, adaptive header replacing inline styles */}
            <div className="section-header-adaptive">
              <div>
                <span className="eyebrow-dark">Data Input</span>
                <h2
                  className="elegant-heading-sm"
                  style={{ color: "var(--text-on-dark)", marginBottom: 0 }}
                >
                  Asset Entry
                </h2>
              </div>
              {/* Optional: Add a 'last updated' or status indicator here for desktop */}
            </div>

            {/* The grid now respects the stacking logic in your CSS */}
            <div className="two-column-grid">
              <div className="grid-item-card">
                <div
                  className="card-inner-padding"
                  // style={{ padding: "var(--space-lg)" }}
                >
                  <TransactionForm
                    onAdd={handleAddTransaction}
                    goals={goals}
                    budgets={budgets}
                    onSaveBudgets={setBudgets}
                  />
                </div>
              </div>

              <div className="grid-item-card">
                <div
                  className="card-inner-padding"
                  // style={{ padding: "var(--space-lg)" }}
                >
                  <Goals
                    goals={goals}
                    transactions={transactions}
                    onAddGoal={handleAddGoal}
                  />
                </div>
              </div>

              <div className="grid-item-card">
                <div
                  className="card-inner-padding"
                  // style={{ padding: "var(--space-lg)" }}
                >
                  <RecentActivity transactions={transactions} />
                </div>
              </div>

              <div className="grid-item-card">
                <div
                  className="card-inner-padding"
                  // style={{ padding: "var(--space-lg)" }}
                >
                  <Alerts
                    balance={balance}
                    budgets={budgets}
                    transactions={transactions}
                    timeframe={selectedTimeframe}
                  />
                  <div
                    style={{
                      marginTop: "2.5rem",
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                      paddingTop: "1.5rem",
                    }}
                  >
                    <ExportData
                      transactions={transactions}
                      onImport={setTransactions}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AppFooter />
      </main>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;