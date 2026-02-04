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
import { FiDollarSign } from "react-icons/fi"; // Import the icon

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "var(--bg-glass)",
          backdropFilter: "var(--glass-blur)",
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
            fontSize: "11px",
            opacity: 0.6,
            letterSpacing: "0.05em",
          }}
        >
          {label.toUpperCase()}
        </p>
        {payload.map((p, i) => (
          <p
            key={i}
            style={{
              margin: "4px 0",
              color: p.color,
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            {p.name}: ${p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function AreaChart({ transactions, timeframe }) {
  const now = new Date();
  let data = [];

  // Data processing logic
  if (timeframe === "daily") {
    const todayTx = transactions.filter(
      (t) => new Date(t.date).toDateString() === now.toDateString(),
    );
    data = [
      {
        label: now.toLocaleDateString("en-US", { weekday: "short" }),
        income: todayTx
          .filter((t) => t.type === "income")
          .reduce((s, t) => s + t.amount, 0),
        expense: todayTx
          .filter((t) => t.type === "expense")
          .reduce((s, t) => s + t.amount, 0),
      },
    ];
  } else if (timeframe === "weekly") {
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    data = Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      const dayTx = transactions.filter(
        (t) => new Date(t.date).toDateString() === day.toDateString(),
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
        /* --- PROFESSIONAL PLACEHOLDER --- */
        <div className="chart-placeholder">
          <div style={{ opacity: 0.2, marginBottom: "12px", display: "flex", justifyContent: "center"}}>
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
          <ReAreaChart data={data}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-success)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-success)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-danger)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-danger)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
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
              cursor={{ stroke: "var(--border-on-dark)", strokeWidth: 1 }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{
                paddingTop: "20px",
                color: "var(--text-on-dark)",
              }}
            />
            <Area
              name="Inbound"
              type="monotone"
              dataKey="income"
              stroke="var(--color-success)"
              fillOpacity={1}
              fill="url(#incomeGradient)"
            />
            <Area
              name="Outbound"
              type="monotone"
              dataKey="expense"
              stroke="var(--color-danger)"
              fillOpacity={1}
              fill="url(#expenseGradient)"
            />
          </ReAreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default AreaChart;