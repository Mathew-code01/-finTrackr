// src/components/PieChart.jsx
// src/components/PieChart.jsx
import React from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function CustomTooltip({ active, payload }) {
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
        <p style={{ margin: 0, fontWeight: 600 }}>{payload[0].name}</p>
        <p style={{ margin: 0, color: "#555" }}>
          ${payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
}

function PieChart({ transactions, timeframe }) {
  // Filter transactions by timeframe
  const now = new Date();
  const filteredTx = transactions.filter((t) => {
    const txDate = new Date(t.date);
    if (timeframe === "daily") {
      return txDate.toDateString() === now.toDateString();
    } else if (timeframe === "weekly") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return txDate >= startOfWeek && txDate <= endOfWeek;
    } else if (timeframe === "monthly") {
      return (
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear()
      );
    } else if (timeframe === "yearly") {
      return txDate.getFullYear() === now.getFullYear();
    }
    return true;
  });

  const data = filteredTx.reduce((acc, t) => {
    const existing = acc.find((item) => item.name === t.category);
    if (existing) existing.value += t.amount;
    else acc.push({ name: t.category, value: t.amount });
    return acc;
  }, []);

  const COLORS = [
    "#4f46e5",
    "#f97316",
    "#22c55e",
    "#e11d48",
    "#6366f1",
    "#06b6d4",
  ];

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
          <RePieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              innerRadius={60}
              paddingAngle={4}
              cornerRadius={6}
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
          </RePieChart>
        </ResponsiveContainer>
      )}
    </div>
  );

}


export default PieChart;
