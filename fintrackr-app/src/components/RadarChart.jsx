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
import { FiDollarSign } from "react-icons/fi";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "var(--bg-glass)",
          backdropFilter: "var(--glass-blur)",
          padding: "10px",
          border: "var(--border-on-dark)",
          borderRadius: "var(--radius-pro)",
          color: "var(--text-on-dark)",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0, fontSize: "12px", fontWeight: 500 }}>
          {payload[0].payload.category}
        </p>
        <p style={{ margin: 0, color: "var(--color-danger)", fontWeight: 700 }}>
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

function RadarChart({ transactions }) {
  const data = transactions.reduce((acc, t) => {
    if (t.type === "expense") {
      const existing = acc.find((c) => c.category === t.category);
      if (existing) existing.value += t.amount;
      else acc.push({ category: t.category, value: t.amount });
    }
    return acc;
  }, []);

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
          <ReRadarChart data={data} outerRadius={100}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis
              dataKey="category"
              tick={{
                fill: "var(--text-on-dark)",
                fontSize: 11,
                fontWeight: 300,
              }}
            />
            <PolarRadiusAxis hide />
            <Radar
              name="Expenses"
              dataKey="value"
              stroke="var(--color-danger)"
              fill="var(--color-danger)"
              fillOpacity={0.25}
              dot={{ fill: "var(--color-danger)", r: 3 }}
            />
            <Tooltip content={<CustomTooltip />} />
          </ReRadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default RadarChart;