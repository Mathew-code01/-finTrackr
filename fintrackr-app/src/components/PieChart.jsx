// src/components/PieChart.jsx
// src/components/PieChart.jsx
// src/components/PieChart.jsx
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
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
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
          letterSpacing: '0.15em' 
        }}>
          {payload[0].name}
        </p>
        <p style={{ 
          margin: "4px 0 0 0", 
          color: "var(--text-on-dark)", 
          fontWeight: 800, 
          fontSize: "1.1rem" 
        }}>
          ${Number(payload[0].value).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

function PieChart({ transactions, timeframe }) {
  const data = useMemo(() => {
    const now = new Date();
    
    // Unified Filter logic consistent with Bar/Line/Area charts
    const filtered = transactions.filter((t) => {
      const txDate = new Date(t.date);
      const isExpense = t.type?.toLowerCase().includes("expense") || t.type?.toLowerCase().includes("debit");
      
      if (!isExpense) return false;

      // Daily: Only today
      if (timeframe === "daily") {
        return txDate.toDateString() === now.toDateString();
      }
      
      // Weekly: Only this current month's distribution
      if (timeframe === "weekly") {
        return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
      }

      // Monthly: Distribution across the full current year
      if (timeframe === "monthly") {
        return txDate.getFullYear() === now.getFullYear();
      }
        
      // Yearly: All-time expense distribution
      if (timeframe === "yearly") {
        return true; 
      }
        
      return true;
    });

    // Aggregate by Category
    const aggregated = filtered.reduce((acc, t) => {
      const categoryName = t.category || "Uncategorized";
      const existing = acc.find((item) => item.name === categoryName);
      if (existing) {
        existing.value += Number(t.amount);
      } else {
        acc.push({ name: categoryName, value: Number(t.amount) });
      }
      return acc;
    }, []);

    return aggregated.sort((a, b) => b.value - a.value);
  }, [transactions, timeframe]);

  const COLORS = [
    "var(--color-accent)", 
    "var(--color-success)", 
    "#06b6d4",                
    "#f59e0b",                
    "#ec4899",                
    "#8b5cf6",                
  ];

  const hasData = data.length > 0;

  return (
    <div style={{ width: "100%", height: 350, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {!hasData ? (
        <div style={{ textAlign: "center" }}>
          <div style={{ opacity: 0.2, marginBottom: "16px", display: "flex", justifyContent: "center" }}>
            <FiDollarSign size={48} color="var(--text-on-dark)" />
          </div>
          <p style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-muted-on-dark)",
            fontWeight: 700,
          }}>
            Awaiting Expense Data
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
              innerRadius={75}
              paddingAngle={8}
              cornerRadius={10}
              stroke="none"
              style={{ filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.3))", outline: 'none' }}
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
              iconSize={6}
              wrapperStyle={{ 
                paddingTop: "24px",
                color: "var(--text-on-dark)", 
                fontSize: "10px",
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 700
              }}
            />
          </RePieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default PieChart;