// src/components/PieChart.jsx
// src/components/PieChart.jsx
// src/components/PieChart.jsx
import React, { useMemo } from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
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
          WebkitBackdropFilter: "var(--glass-blur)",
          padding: "16px",
          border: "var(--border-on-dark)",
          borderRadius: "var(--radius-pro)",
          color: "var(--text-on-dark)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <p style={{ 
          margin: 0, 
          fontWeight: 700, 
          fontSize: "0.7rem", 
          textTransform: 'uppercase', 
          color: 'var(--text-muted-on-dark)', 
          letterSpacing: '0.1em' 
        }}>
          {payload[0].name}
        </p>
        <p style={{ 
          margin: "4px 0 0 0", 
          color: "var(--text-on-dark)", 
          fontWeight: 800, 
          fontSize: "1.1rem" 
        }}>
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

function PieChart({ transactions, timeframe }) {
  const data = useMemo(() => {
    const now = new Date();
    
    // 1. Filter by Timeframe
    const filtered = transactions.filter((t) => {
      const txDate = new Date(t.date);
      if (timeframe === "daily")
        return txDate.toDateString() === now.toDateString();
      if (timeframe === "monthly")
        return (
          txDate.getMonth() === now.getMonth() &&
          txDate.getFullYear() === now.getFullYear()
        );
      if (timeframe === "yearly")
        return txDate.getFullYear() === now.getFullYear();
      return true;
    });

    // 2. Aggregate by Category
    return filtered.reduce((acc, t) => {
      const existing = acc.find((item) => item.name === t.category);
      if (existing) existing.value += t.amount;
      else acc.push({ name: t.category, value: t.amount });
      return acc;
    }, []);
  }, [transactions, timeframe]);

  // High-vibrancy palette for dark mode visibility
  const COLORS = [
    "var(--color-accent)",  // Electric Indigo
    "var(--color-success)", // Emerald
    "#06b6d4",              // Cyan
    "#f59e0b",              // Amber
    "#ec4899",              // Pink
    "#8b5cf6",              // Violet
  ];

  const hasData = data.length > 0;

  return (
    <div style={{ width: "100%", height: 350, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {!hasData ? (
        <div style={{ textAlign: "center", opacity: 0.8 }}>
          <div style={{ opacity: 0.2, marginBottom: "16px" }}>
            <FiDollarSign size={48} color="var(--text-on-dark)" />
          </div>
          <p style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-muted-on-dark)",
            fontWeight: 700,
          }}>
            Awaiting Financial Data
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={100}
              innerRadius={75}     // Modern donut style
              paddingAngle={8}      // Visible segmentation
              cornerRadius={10}     // Rounded segments
              stroke="none"         // Removes "beginner" borders
              style={{ filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.4))" }}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  style={{ outline: 'none' }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ 
                paddingTop: "24px",
                color: "var(--text-on-dark)", 
                fontSize: "11px",
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600
              }}
            />
          </RePieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default PieChart;