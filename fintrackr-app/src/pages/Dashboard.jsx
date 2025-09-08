// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { FiArrowUp, FiArrowDown, FiDollarSign } from "react-icons/fi";
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
import RadarChart from "../components/RadarChart.jsx";
import RecentActivity from "../components/RecentActivity.jsx";
import BudgetTracker from "../components/BudgetTracker.jsx";
import Goals from "../components/Goals.jsx";
import ExportData from "../components/ExportData.jsx";
import TopCategories from "../components/TopCategories.jsx";
import UpcomingBills from "../components/UpcomingBills.jsx";
import Alerts from "../components/Alerts.jsx";
import { useNotifications } from "../hooks/useNotifications";

import "../styles/Dashboard.css";
import STORAGE_KEYS, {
  saveToStorage,
  getFromStorage,
} from "../utils/localStorage.js";


function Dashboard() {
  const [transactions, setTransactions] = useState(() =>
    getFromStorage(STORAGE_KEYS.TRANSACTIONS, [])
  );

  const [goals, setGoals] = useState(() =>
    getFromStorage(STORAGE_KEYS.GOALS, [])
  );
  const [bills, setBills] = useState(() =>
    getFromStorage(STORAGE_KEYS.BILLS, [])
  );
  const [budgets, setBudgets] = useState(() =>
    getFromStorage(STORAGE_KEYS.BUDGETS, {})
  );

    const { addNotification } = useNotifications(); // ✅ grab from context

    // Handlers
    const handleAddTransaction = (tx) => {
      setTransactions([tx, ...transactions]);
      addNotification("New transaction added! ✅");
    };

    const handleAddGoal = (goal) => {
      setGoals([...goals, goal]);
      addNotification("New goal created 🎯");
    };

    const handleAddBill = (bill) => {
      setBills([...bills, bill]);
      addNotification("New bill scheduled 📅");
    };


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("monthly");

  // Persist changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
  }, [transactions]);

  useEffect(() => saveToStorage(STORAGE_KEYS.GOALS, goals), [goals]);
  useEffect(() => saveToStorage(STORAGE_KEYS.BILLS, bills), [bills]);
  useEffect(() => saveToStorage(STORAGE_KEYS.BUDGETS, budgets), [budgets]);

  // Totals
  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = incomeTotal - expenseTotal;



  const [activeChart, setActiveChart] = useState("pie");

  return (
    <div className="dashboard-page">
      <AppHeader
        isSidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        selectedTimeframe={selectedTimeframe}
        onTimeframeChange={setSelectedTimeframe}
      />

      <div className="dashboard-body">
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="dashboard-main">
          <main className="dashboard-content">
            {/* Summary Cards */}
            <div className="summary-cards">
              <SummaryCard
                title="Income"
                amount={incomeTotal}
                icon={<FiArrowUp />}
                type="income"
              />
              <SummaryCard
                title="Expenses"
                amount={expenseTotal}
                icon={<FiArrowDown />}
                type="expense"
              />
              <SummaryCard
                title="Balance"
                amount={balance}
                icon={<FiDollarSign />}
                type="balance"
              />
            </div>

            {/* Charts */}
            <div className="charts-section">
              {/* Mobile Tabs */}
              <div className="charts-tabs">
                <button
                  className={activeChart === "pie" ? "active" : ""}
                  onClick={() => setActiveChart("pie")}
                >
                  Pie
                </button>
                <button
                  className={activeChart === "bar" ? "active" : ""}
                  onClick={() => setActiveChart("bar")}
                >
                  Bar
                </button>
                <button
                  className={activeChart === "line" ? "active" : ""}
                  onClick={() => setActiveChart("line")}
                >
                  Line
                </button>
                <button
                  className={activeChart === "area" ? "active" : ""}
                  onClick={() => setActiveChart("area")}
                >
                  Area
                </button>
                <button
                  className={activeChart === "radar" ? "active" : ""}
                  onClick={() => setActiveChart("radar")}
                >
                  Radar
                </button>
              </div>

              {/* Desktop Grid */}
              <div className="charts-grid">
                <div className="chart-card">
                  <h3>Expenses by Category</h3>
                  <PieChart
                    transactions={transactions}
                    timeframe={selectedTimeframe}
                  />
                </div>
                <div className="chart-card">
                  <h3>Income vs Expenses</h3>
                  <BarChart
                    transactions={transactions}
                    timeframe={selectedTimeframe}
                  />
                </div>
                <div className="chart-card">
                  <h3>Balance Trend</h3>
                  <LineChart
                    transactions={transactions}
                    timeframe={selectedTimeframe}
                  />
                </div>
                <div className="chart-card">
                  <h3>Income vs Expense (Area)</h3>
                  <AreaChart
                    transactions={transactions}
                    timeframe={selectedTimeframe}
                  />
                </div>
                <div className="chart-card">
                  <h3>Spending by Category (Radar)</h3>
                  <RadarChart
                    transactions={transactions}
                    timeframe={selectedTimeframe}
                  />
                </div>
              </div>

              {/* Mobile Single Chart */}
              <div className="charts-single">
                {activeChart === "pie" && (
                  <div className="chart-card">
                    <h3>Expenses by Category</h3>
                    <PieChart
                      transactions={transactions}
                      timeframe={selectedTimeframe}
                    />
                  </div>
                )}
                {activeChart === "bar" && (
                  <div className="chart-card">
                    <h3>Income vs Expenses</h3>
                    <BarChart
                      transactions={transactions}
                      timeframe={selectedTimeframe}
                    />
                  </div>
                )}
                {activeChart === "line" && (
                  <div className="chart-card">
                    <h3>Balance Trend</h3>
                    <LineChart
                      transactions={transactions}
                      timeframe={selectedTimeframe}
                    />
                  </div>
                )}
                {activeChart === "area" && (
                  <div className="chart-card">
                    <h3>Income vs Expense (Area)</h3>
                    <AreaChart
                      transactions={transactions}
                      timeframe={selectedTimeframe}
                    />
                  </div>
                )}
                {activeChart === "radar" && (
                  <div className="chart-card">
                    <h3>Spending by Category (Radar)</h3>
                    <RadarChart
                      transactions={transactions}
                      timeframe={selectedTimeframe}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Extra Widgets */}
            <div className="extra-section grid-layout">
              <RecentActivity
                transactions={transactions}
                timeframe={selectedTimeframe}
              />
              <BudgetTracker
                budgets={budgets}
                transactions={transactions}
                timeframe={selectedTimeframe}
              />
              <Goals
                goals={goals}
                transactions={transactions}
                onAddGoal={handleAddGoal}
              />
              <TopCategories
                transactions={transactions}
                timeframe={selectedTimeframe}
              />
              <UpcomingBills bills={bills} onAddBill={handleAddBill} />
              <Alerts
                balance={balance}
                budgets={budgets}
                transactions={transactions}
                timeframe={selectedTimeframe}
              />
              <ExportData
                transactions={transactions}
                onImport={setTransactions} // <-- this makes import/export work
              />
            </div>

            {/* Transaction Form + List */}
            <TransactionForm
              onAdd={handleAddTransaction}
              goals={goals}
              budgets={budgets} // Pass current budgets
              onSaveBudgets={setBudgets} // Allow form to update budgets dynamically
            />
            <TransactionList
              transactions={transactions}
              timeframe={selectedTimeframe}
              onDelete={(id) =>
                setTransactions(transactions.filter((t) => t.id !== id))
              }
              onEdit={(updatedTx) =>
                setTransactions(
                  transactions.map((t) =>
                    t.id === updatedTx.id ? updatedTx : t
                  )
                )
              }
            />
          </main>
          <AppFooter />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
