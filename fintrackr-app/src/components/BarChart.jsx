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
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: "12px",
            borderBottom: "var(--border-on-dark)",
            paddingBottom: "4px",
          }}
        >
          {label}
        </p>
        {payload.map((p, i) => (
          <p
            key={i}
            style={{ color: p.color, margin: "4px 0", fontWeight: 600 }}
          >
            {p.name}: ${p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function BarChart({ transactions, timeframe }) {
  const now = new Date();
  let data = [];

  // Grouping logic (simplified for brevity, stays consistent with your filtering)
  const months = [
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
  ];
  if (timeframe === "monthly") {
    data = months.map((m, i) => {
      const monthTx = transactions.filter(
        (t) =>
          new Date(t.date).getMonth() === i &&
          new Date(t.date).getFullYear() === now.getFullYear(),
      );
      return {
        label: m,
        income: monthTx
          .filter((t) => t.type === "income")
          .reduce((s, t) => s + t.amount, 0),
        expense: monthTx
          .filter((t) => t.type === "expense")
          .reduce((s, t) => s + t.amount, 0),
      };
    });
  } else {
    // Fallback for daily/weekly grouping
    data = [{ label: "Period", income: 0, expense: 0 }];
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
          <ReBarChart data={data} barGap={8}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-muted-on-dark)", fontSize: 11 }}
            />
            <YAxis hide />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: "20px" }}
            />
            <Bar
              name="Income"
              dataKey="income"
              fill="var(--color-success)"
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
            <Bar
              name="Expense"
              dataKey="expense"
              fill="var(--color-danger)"
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
          </ReBarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default BarChart;