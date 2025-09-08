// src/components/LineChart.jsx
// src/components/LineChart.jsx
import React from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          padding: "8px 12px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <p style={{ margin: 0 }}>{label}</p>
        <p style={{ margin: 0, color: "#1e88e5" }}>
          Balance: ${payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
}

function LineChart({ transactions, timeframe }) {
  const now = new Date();

  // Filter transactions by timeframe
  const filtered = transactions.filter((t) => {
    const txDate = new Date(t.date);
    if (timeframe === "daily")
      return txDate.toDateString() === now.toDateString();
    if (timeframe === "weekly") {
      const start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return txDate >= start && txDate <= end;
    }
    if (timeframe === "monthly")
      return (
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear()
      );
    if (timeframe === "yearly")
      return txDate.getFullYear() === now.getFullYear();
    return true;
  });

  // Sort and calculate cumulative balance
  const sorted = [...filtered].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  let balance = 0;
  const data = sorted.map((t) => {
    balance += t.type === "income" ? t.amount : -t.amount;
    return {
      date: new Date(t.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      balance,
    };
  });

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
      {data.length === 0 ? (
        <p style={{ color: "#888", fontStyle: "italic" }}>No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <ReLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 5, fill: "#4f46e5" }}
              activeDot={{ r: 7 }}
            />
          </ReLineChart>
        </ResponsiveContainer>
      )}
    </div>
  );

}

export default LineChart;
