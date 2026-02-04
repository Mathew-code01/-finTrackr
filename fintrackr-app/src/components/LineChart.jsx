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
import { FiDollarSign } from "react-icons/fi";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "var(--bg-deep-obsidian)",
          padding: "12px",
          border: "var(--border-on-dark)",
          borderRadius: "var(--radius-pro)",
          color: "var(--text-on-dark)",
          fontSize: "13px",
        }}
      >
        <p style={{ margin: "0 0 4px 0", opacity: 0.5 }}>{label}</p>
        <p style={{ margin: 0, color: "var(--color-accent)", fontWeight: 700 }}>
          Balance: ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

function LineChart({ transactions, timeframe }) {
  const now = new Date();

  const filtered = transactions.filter((t) => {
    const txDate = new Date(t.date);
    if (timeframe === "daily")
      return txDate.toDateString() === now.toDateString();
    if (timeframe === "monthly") return txDate.getMonth() === now.getMonth();
    return true;
  });

  const sorted = [...filtered].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
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
        <div className="chart-placeholder">
          <div style={{  opacity: 0.2, marginBottom: "12px", display: "flex", justifyContent: "center"}}>
            <FiDollarSign size={40} color="var(--text-on-dark)" />
          </div>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-muted-on-dark)",
              fontWeight: 600,
            }}
          >
            Awaiting Financial Data
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <ReLineChart data={data}>
            <CartesianGrid
              strokeDasharray="2 2"
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-muted-on-dark)", fontSize: 11 }}
            />
            <YAxis hide domain={["auto", "auto"]} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="var(--color-accent)"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "var(--bg-deep-obsidian)",
                stroke: "var(--color-accent)",
                strokeWidth: 2,
              }}
              activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-accent)" }}
            />
          </ReLineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default LineChart;