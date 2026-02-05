// src/components/UpcomingBills.jsx
// src/components/UpcomingBills.jsx
// src/components/UpcomingBills.jsx
// src/components/UpcomingBills.jsx
// src/components/UpcomingBills.jsx
// src/components/UpcomingBills.jsx
// src/components/UpcomingBills.jsx
import React, { useState } from "react";
import { FiCalendar, FiPlus, FiX, FiActivity } from "react-icons/fi";
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
    <div className="ft-ledger-container">
      <header className="ft-ledger-header">
        <div className="ft-ledger-title-group">
          <FiActivity className="ft-ledger-icon-accent" />
          <h4 className="ft-ledger-label">Liability Ledger</h4>
        </div>
        <p className="ft-ledger-subtitle">Institutional Tracking of Upcoming Obligations</p>
      </header>
      
      <form className="ft-ledger-form" onSubmit={handleSubmit}>
        <div className="ft-ledger-input-grid">
          <input 
            className="ft-ledger-input-line" 
            placeholder="Counterparty / Service" 
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            required
          />
          <input 
            className="ft-ledger-input-line" 
            type="number" 
            placeholder="0.00" 
            value={form.amount}
            onChange={(e) => setForm({...form, amount: e.target.value})}
            required
          />
          <input 
            className="ft-ledger-input-line ft-ledger-date-picker" 
            type="date"
            value={form.due}
            onChange={(e) => setForm({...form, due: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="ft-ledger-submit-btn">
          <FiPlus /> <span>Commit Entry</span>
        </button>
      </form>

      <div className="ft-ledger-stack">
        {bills.length === 0 ? (
          <div className="ft-ledger-empty">No active liabilities recorded.</div>
        ) : (
          bills.map((bill) => {
            const isDueSoon = (new Date(bill.due) - today) / (86400000) <= 7;
            return (
              <div key={bill.id} className={`ft-ledger-card ${isDueSoon ? 'ft-is-urgent' : ''}`}>
                <div className="ft-ledger-meta">
                  <span className="ft-ledger-name">{bill.name}</span>
                  <span className="ft-ledger-date">
                    <FiCalendar /> {new Date(bill.due).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="ft-ledger-finance">
                  <span className="ft-ledger-amt">${bill.amount.toLocaleString()}</span>
                  <button className="ft-ledger-del" onClick={() => onDeleteBill(bill.id)}>
                    <FiX />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default UpcomingBills;