// src/components/UpcomingBills.jsx
// src/components/UpcomingBills.jsx
// src/components/UpcomingBills.jsx
// src/components/UpcomingBills.jsx
// src/components/UpcomingBills.jsx
import React, { useState } from "react";
import { FiCalendar, FiPlus, FiX } from "react-icons/fi";
import "../styles/UpcomingBills.css";

function UpcomingBills({ bills = [], onAddBill, onDeleteBill }) {
  const [form, setForm] = useState({ name: "", amount: "", due: "" });
  const today = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.amount || !form.due) return;
    onAddBill({ id: Date.now(), ...form, amount: parseFloat(form.amount) });
    setForm({ name: "", amount: "", due: "" });
  };

  return (
    <div className="bills-widget">
      <h4 className="widget-label">Liability Ledger</h4>
      
      <form className="bill-minimal-form" onSubmit={handleSubmit}>
        <input 
          className="input-underlined" 
          placeholder="Bill" 
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />
        <input 
          className="input-underlined" 
          type="number" 
          placeholder="$" 
          value={form.amount}
          onChange={(e) => setForm({...form, amount: e.target.value})}
        />
        <input 
          className="input-underlined" 
          type="date"
          value={form.due}
          onChange={(e) => setForm({...form, due: e.target.value})}
        />
        <button type="submit" className="add-bill-circle"><FiPlus /></button>
      </form>

      <div className="bill-stack">
        {bills.map((bill) => {
          const isDueSoon = (new Date(bill.due) - today) / (86400000) <= 7;
          return (
            <div key={bill.id} className={`bill-card ${isDueSoon ? 'urgent' : ''}`}>
              <div className="bill-meta">
                <span className="bill-name">{bill.name}</span>
                <span className="bill-date"><FiCalendar /> {new Date(bill.due).toLocaleDateString()}</span>
              </div>
              <div className="bill-actions">
                <span className="bill-amt">${bill.amount}</span>
                <button className="bill-del" onClick={() => onDeleteBill(bill.id)}><FiX /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UpcomingBills;