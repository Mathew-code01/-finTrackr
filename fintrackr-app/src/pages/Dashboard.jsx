// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
import React, { useState, useEffect, } from "react";
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
  // --- STATE INITIALIZATION ---
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
  const [activeChart, setActiveChart] = useState("pie");

  const { addNotification } = useNotifications();

  // --- PERSISTENCE LAYER ---
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
    saveToStorage(STORAGE_KEYS.GOALS, goals);
    saveToStorage(STORAGE_KEYS.BILLS, bills);
    saveToStorage(STORAGE_KEYS.BUDGETS, budgets);
  }, [transactions, goals, bills, budgets]);

  // --- FINANCIAL CALCULATIONS ---
  const incomeTotal = transactions
    .filter(
      (t) =>
        t.type?.toLowerCase().includes("income") ||
        t.type?.toLowerCase().includes("credit"),
    )
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expenseTotal = transactions
    .filter(
      (t) =>
        t.type?.toLowerCase().includes("expense") ||
        t.type?.toLowerCase().includes("debit"),
    )
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const balance = incomeTotal - expenseTotal;

  // --- UPDATED AUTOMATION ENGINE (DASHBOARD.JSX) ---
  useEffect(() => {
    const processAutomations = () => {
      // 1. Define "Today" clearly in local time
      const now = new Date();
      const todayStr = now.toLocaleDateString("en-CA"); // Gets YYYY-MM-DD
      const todayTime = new Date(todayStr).getTime();

      const recurringTemplates = transactions.filter((t) => t.recurring);
      let newEntries = [];

      recurringTemplates.forEach((template) => {
        // Start from the template date
        let runner = new Date(template.date);

        const incrementDate = (date) => {
          const d = new Date(date);
          if (template.frequency === "daily") d.setDate(d.getDate() + 1);
          else if (template.frequency === "weekly") d.setDate(d.getDate() + 7);
          else if (template.frequency === "monthly")
            d.setMonth(d.getMonth() + 1);
          return d;
        };

        // Move to the first scheduled occurrence
        runner = incrementDate(runner);

        // 2. Loop until the runner surpasses today's timestamp
        while (runner.getTime() <= todayTime) {
          const dateStr = runner.toLocaleDateString("en-CA");
          const occurrenceId = `auto-${template.id}-${dateStr}`;

          // 3. Strict check for existence to prevent those Feb 7 duplicates
          const exists = transactions.some((t) => t.id === occurrenceId);

          if (!exists) {
            newEntries.push({
              ...template,
              id: occurrenceId,
              date: dateStr,
              recurring: false,
              status: "Automated Standing Order",
            });
          }

          runner = incrementDate(runner);

          // Safety break to prevent infinite loops if frequency is undefined
          if (!template.frequency) break;
        }
      });

      if (newEntries.length > 0) {
        setTransactions((prev) => [...newEntries, ...prev]);
        addNotification(
          `${newEntries.length} Strategic movements synchronized.`,
        );
      }
    };

    processAutomations();
    // We add transactions.length as a dependency so it checks when things change
  }, [transactions.length, addNotification]);

  // --- HANDLERS ---
  const handleAddTransaction = (tx) => {
    setTransactions((prev) => [tx, ...prev]);
    addNotification("Ledger Updated ✅");
  };

  const handleAddGoal = (goal) => {
    setGoals([...goals, goal]);
    addNotification("Strategic Goal Established 🎯");
  };

  const handleAddBill = (bill) => {
    setBills([...bills, bill]);
    addNotification("Payment Obligation Noted 📅");
  };

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
        {/* SECTION 1: SUMMARY (White) */}
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

        {/* SECTION 2: CHARTS (Dark) */}
        <section className="zebra-section section-dark">
          <div className="container-elegant">
            <div className="section-header-row">
              <h2
                className="elegant-heading-sm"
                style={{ color: "var(--text-on-dark)" }}
              >
                Analytics Suite
              </h2>
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

        {/* SECTION 3: TRANSACTION LIST (White) */}
        <section className="zebra-section section-white">
          <div className="container-elegant">
            <div className="layout-master-stack">
              <div className="layout-full-width-top">
                <h3 className="elegant-small-heading">Active Ledger</h3>
                <div className="grid-item-card layout-ledger-expansion">
                  <TransactionList
                    transactions={transactions}
                    timeframe={selectedTimeframe}
                    limit={8}
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
                <div className="grid-item-card layout-span-footer-widget">
                  <UpcomingBills bills={bills} onAddBill={handleAddBill} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: ACTIONS (Dark) */}
        <section className="zebra-section section-dark">
          <div className="container-elegant">
            <div className="section-header-adaptive">
              <span className="eyebrow-dark">Data Input</span>
              <h2
                className="elegant-heading-sm"
                style={{ color: "var(--text-on-dark)", marginBottom: "2rem" }}
              >
                Asset Entry
              </h2>
            </div>

            <div className="two-column-grid">
              <div className="grid-item-card">
                <TransactionForm
                  onAdd={handleAddTransaction}
                  goals={goals}
                  budgets={budgets}
                  onSaveBudgets={setBudgets}
                />
              </div>
              <div className="grid-item-card">
                <Goals
                  goals={goals}
                  transactions={transactions}
                  onAddGoal={handleAddGoal}
                />
              </div>
              <div className="grid-item-card">
                <RecentActivity transactions={transactions} />
              </div>
              <div className="grid-item-card">
                <Alerts
                  balance={balance}
                  budgets={budgets}
                  transactions={transactions}
                  timeframe={selectedTimeframe}
                />
                <div
                  className="export-container"
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