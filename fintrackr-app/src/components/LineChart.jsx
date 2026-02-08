// src/components/LineChart.jsx
// src/components/LineChart.jsx
// src/components/LineChart.jsx
// src/components/LineChart.jsx
// src/components/LineChart.jsx
// src/components/LineChart.jsx
import React, { useMemo } from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FiDollarSign } from "react-icons/fi";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "var(--bg-glass)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "14px",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
          color: "var(--text-on-dark)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <p style={{ margin: "0 0 4px 0", fontSize: "10px", opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</p>
        <p style={{ margin: 0, color: "var(--color-accent)", fontWeight: 800, fontSize: '15px' }}>
          ${payload[0].value.toLocaleString()}
        </p>
        <span style={{ fontSize: '9px', textTransform: 'uppercase', opacity: 0.4, fontWeight: 600 }}>Total Balance</span>
      </div>
    );
  }
  return null;
};

function LineChart({ transactions, timeframe }) {
  const chartData = useMemo(() => {
    const now = new Date();
    
    // Sort all transactions to calculate true running balance
    const sortedAll = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    const getBalanceAtDate = (date) => {
      return sortedAll
        .filter(t => new Date(t.date) <= date)
        .reduce((acc, t) => {
          const isIncome = t.type?.toLowerCase().includes("income") || t.type?.toLowerCase().includes("credit");
          return acc + (isIncome ? Number(t.amount) : -Number(t.amount));
        }, 0);
    };

    // --- YEARLY: Show specific Year ---
    if (timeframe === "yearly") {
      return [{
        label: now.getFullYear().toString(),
        balance: getBalanceAtDate(now)
      }];
    }

    // --- MONTHLY: Show Month Names (Jan, Feb, etc) ---
    if (timeframe === "monthly") {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return months.map((m, i) => {
        const lastDayOfMonth = new Date(now.getFullYear(), i + 1, 0);
        return {
          label: m,
          balance: getBalanceAtDate(lastDayOfMonth)
        };
      });
    }

    // --- WEEKLY: Show Week 1, Week 2, Week 3, Week 4 ---
    if (timeframe === "weekly") {
      return [1, 2, 3, 4].map(weekNum => {
        // Approximate balance at the end of each week of the current month
        const date = new Date(now.getFullYear(), now.getMonth(), weekNum * 7);
        return {
          label: `Week ${weekNum}`,
          balance: getBalanceAtDate(date)
        };
      });
    }

    // --- DAILY (Default): Show Days (Mon, Tue, etc) ---
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return {
        label: d.toLocaleDateString(undefined, { weekday: 'short' }),
        balance: getBalanceAtDate(d),
      };
    });
  }, [transactions, timeframe]);

  const hasData = chartData.some(d => d.balance !== 0);

  return (
    <div style={{ width: "100%", height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {!hasData ? (
        <div style={{ textAlign: "center" }}>
          <div style={{ opacity: 0.1, marginBottom: "12px", display: "flex", justifyContent: "center" }}>
            <FiDollarSign size={40} color="var(--text-on-dark)" />
          </div>
          <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted-on-dark)", fontWeight: 600 }}>
            Insufficient Data
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <ReLineChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "var(--text-muted-on-dark)", fontSize: 10, fontWeight: 600 }} 
              dy={10}
            />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="var(--color-accent)"
              strokeWidth={3}
              dot={{ r: 4, fill: "var(--bg-deep-obsidian)", stroke: "var(--color-accent)", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "var(--color-accent)", stroke: "#fff", strokeWidth: 2 }}
              animationDuration={1000}
            />
          </ReLineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default LineChart;