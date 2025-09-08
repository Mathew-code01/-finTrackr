// src/components/AreaChart.jsx
// src/components/AreaChart.jsx
// src/components/AreaChart.jsx
import React from "react";
import {
  AreaChart as ReAreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function AreaChart({ transactions, timeframe }) {
  const now = new Date();
  let data = [];

  if (timeframe === "daily") {
    const todayTx = transactions.filter(
      (t) => new Date(t.date).toDateString() === now.toDateString()
    );
    data = [
      {
        label: now.toLocaleDateString("en-US", { weekday: "short" }),
        income: todayTx
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0),
        expense: todayTx
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0),
      },
    ];
  } else if (timeframe === "weekly") {
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    data = Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      const dayTx = transactions.filter(
        (t) => new Date(t.date).toDateString() === day.toDateString()
      );
      return {
        label: day.toLocaleDateString("en-US", { weekday: "short" }),
        income: dayTx
          .filter((t) => t.type === "income")
          .reduce((s, t) => s + t.amount, 0),
        expense: dayTx
          .filter((t) => t.type === "expense")
          .reduce((s, t) => s + t.amount, 0),
      };
    });
  } else if (timeframe === "monthly") {
    const months = Array.from({ length: 12 }, (_, i) => i);
    data = months.map((m) => {
      const monthTx = transactions.filter(
        (t) =>
          new Date(t.date).getMonth() === m &&
          new Date(t.date).getFullYear() === now.getFullYear()
      );
      return {
        label: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ][m],
        income: monthTx
          .filter((t) => t.type === "income")
          .reduce((s, t) => s + t.amount, 0),
        expense: monthTx
          .filter((t) => t.type === "expense")
          .reduce((s, t) => s + t.amount, 0),
      };
    });
  } else if (timeframe === "yearly") {
    const years = Array.from(
      new Set(transactions.map((t) => new Date(t.date).getFullYear()))
    );
    data = years.map((y) => {
      const yearTx = transactions.filter(
        (t) => new Date(t.date).getFullYear() === y
      );
      return {
        label: y,
        income: yearTx
          .filter((t) => t.type === "income")
          .reduce((s, t) => s + t.amount, 0),
        expense: yearTx
          .filter((t) => t.type === "expense")
          .reduce((s, t) => s + t.amount, 0),
      };
    });
  }

  // ✅ Only show chart if there’s real data (income or expense > 0)
  const hasData = data.some((d) => d.income > 0 || d.expense > 0);

  return (
    <div
      style={{
        width: "100%",
        height: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!hasData ? (
        <p style={{ color: "#888", fontStyle: "italic" }}>No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <ReAreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip formatter={(v) => `$${v.toFixed(2)}`} />
            <Legend />
            <Area
              type="monotone"
              dataKey="income"
              stackId="1"
              stroke="#22c55e"
              fill="url(#incomeGradient)"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stackId="1"
              stroke="#ef4444"
              fill="url(#expenseGradient)"
            />
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
            </defs>
          </ReAreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default AreaChart;
