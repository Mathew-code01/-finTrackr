// src/components/AreaChart.jsx
// src/components/AreaChart.jsx
// src/components/AreaChart.jsx

// src/components/AreaChart.jsx
import React, { useMemo } from "react";
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
import { FiDollarSign } from "react-icons/fi";

const CustomTooltip = ({ active, payload, label }) => {
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
        <p style={{ margin: "0 0 10px 0", fontSize: "0.7rem", fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted-on-dark)', letterSpacing: '0.15em' }}>
          {label}
        </p>
        {payload.map((p, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', margin: "4px 0" }}>
            <span style={{ color: p.color, fontSize: '0.85rem', fontWeight: 600 }}>{p.name}</span>
            <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 800 }}>
              ${Number(p.value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function AreaChart({ transactions, timeframe }) {
  const chartData = useMemo(() => {
    const now = new Date();
    
    const getSum = (txList, type) => txList
      .filter(t => {
        const tType = t.type?.toLowerCase() || "";
        return type === "income" 
          ? (tType.includes("income") || tType.includes("credit"))
          : (tType.includes("expense") || tType.includes("debit"));
      })
      .reduce((s, t) => s + Number(t.amount || 0), 0);

    // --- YEARLY: Shows the Year Name ---
    if (timeframe === "yearly") {
       return [{
         label: now.getFullYear().toString(),
         Inbound: getSum(transactions.filter(t => new Date(t.date).getFullYear() === now.getFullYear()), "income"),
         Outbound: getSum(transactions.filter(t => new Date(t.date).getFullYear() === now.getFullYear()), "expense")
       }];
    }

    // --- MONTHLY: Shows Month Names (Jan, Feb...) ---
    if (timeframe === "monthly") {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return months.map((m, i) => {
        const monthTx = transactions.filter(t => {
          const d = new Date(t.date);
          return d.getMonth() === i && d.getFullYear() === now.getFullYear();
        });
        return { label: m, Inbound: getSum(monthTx, "income"), Outbound: getSum(monthTx, "expense") };
      });
    }

    // --- WEEKLY: Shows Week 1, Week 2, Week 3, Week 4 ---
    if (timeframe === "weekly") {
      return ["Week 1", "Week 2", "Week 3", "Week 4"].map((w, i) => {
        const weekTx = transactions.filter(t => {
          const d = new Date(t.date);
          const isThisMonth = d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
          const weekIndex = Math.min(Math.floor((d.getDate() - 1) / 7), 3);
          return isThisMonth && weekIndex === i;
        });
        return { label: w, Inbound: getSum(weekTx, "income"), Outbound: getSum(weekTx, "expense") };
      });
    }

    // --- DAILY (Default): Shows Days (Mon, Tue...) ---
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dayTx = transactions.filter(t => new Date(t.date).toDateString() === d.toDateString());
      return {
        label: d.toLocaleDateString(undefined, { weekday: 'short' }),
        Inbound: getSum(dayTx, "income"),
        Outbound: getSum(dayTx, "expense"),
      };
    });
  }, [transactions, timeframe]);

  const hasData = chartData.some((d) => d.Inbound > 0 || d.Outbound > 0);

  return (
    <div style={{ width: "100%", height: 350, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {!hasData ? (
        <div style={{ textAlign: "center" }}>
          <div style={{ opacity: 0.2, marginBottom: "16px", display: "flex", justifyContent: "center" }}>
            <FiDollarSign size={48} color="var(--text-on-dark)" />
          </div>
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted-on-dark)", fontWeight: 700 }}>
            Awaiting Volume Data
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <ReAreaChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "var(--text-muted-on-dark)", fontSize: 10, fontWeight: 600 }} 
              dy={10}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }} />
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ paddingBottom: "30px", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }} 
            />
            <Area 
              type="monotone" 
              name="Inbound" 
              dataKey="Inbound" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorInbound)" 
            />
            <Area 
              type="monotone" 
              name="Outbound" 
              dataKey="Outbound" 
              stroke="#ec4899" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorOutbound)" 
            />
          </ReAreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default AreaChart;