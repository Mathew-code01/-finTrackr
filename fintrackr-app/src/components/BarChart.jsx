// src/components/BarChart.jsx
// src/components/BarChart.jsx
import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function BarChart({ transactions, timeframe }) {
  const now = new Date();
  let data = [];

  if (timeframe === "daily") {
    const todayTx = transactions.filter(
      (t) => new Date(t.date).toDateString() === now.toDateString()
    );
    data = [
      {
        day: now.toLocaleDateString("en-US", { weekday: "short" }),
        income: todayTx
          .filter((t) => t.type === "income")
          .reduce((s, t) => s + t.amount, 0),
        expense: todayTx
          .filter((t) => t.type === "expense")
          .reduce((s, t) => s + t.amount, 0),
      },
    ];
  } else if (timeframe === "weekly") {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    data = Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const dayTx = transactions.filter(
        (t) => new Date(t.date).toDateString() === day.toDateString()
      );
      return {
        day: day.toLocaleDateString("en-US", { weekday: "short" }),
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
        month: [
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
        year: y,
        income: yearTx
          .filter((t) => t.type === "income")
          .reduce((s, t) => s + t.amount, 0),
        expense: yearTx
          .filter((t) => t.type === "expense")
          .reduce((s, t) => s + t.amount, 0),
      };
    });
  }

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
          <ReBarChart data={data} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey={
                timeframe === "daily" || timeframe === "weekly"
                  ? "day"
                  : timeframe === "monthly"
                  ? "month"
                  : "year"
              }
            />
            <YAxis />
            <Tooltip formatter={(v) => `$${v.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="income" fill="#22c55e" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </ReBarChart>
        </ResponsiveContainer>
      )}
    </div>
  );

}


export default BarChart;
