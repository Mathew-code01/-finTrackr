// src/components/RadarChart.jsx
// src/components/RadarChart.jsx
// src/components/RadarChart.jsx
// src/components/RadarChart.jsx
// src/components/RadarChart.jsx
import React from "react";
import {
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
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
        <p style={{ margin: 0, fontWeight: 600 }}>
          {payload[0].payload.category}
        </p>
        <p style={{ margin: 0, color: "#ef4444" }}>
          ${payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
}

function RadarChart({ transactions }) {
  // Aggregate expenses by category
  const data = transactions.reduce((acc, t) => {
    if (t.type === "expense") {
      const existing = acc.find((c) => c.category === t.category);
      if (existing) existing.value += t.amount;
      else acc.push({ category: t.category, value: t.amount });
    }
    return acc;
  }, []);

  // ✅ Show a message instead of rendering an empty chart
  if (data.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9ca3af", // gray-400
          fontSize: "1rem",
        }}
      >
        No data yet
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height={300}>
        <ReRadarChart data={data} outerRadius={120}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis />
          <Radar
            name="Expenses"
            dataKey="value"
            stroke="#ef4444"
            fill="url(#radarGradient)"
            fillOpacity={0.7}
            dot={{ fill: "#ef4444", r: 4 }}
          />
          <defs>
            <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Tooltip content={<CustomTooltip />} />
        </ReRadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RadarChart;

