// src/components/UpcomingBills.jsx
// src/components/UpcomingBills.jsx
import React, { useState } from "react";
import "../styles/UpcomingBills.css";

function UpcomingBills({ bills = [], onAddBill, onDeleteBill }) {
  const [form, setForm] = useState({ name: "", amount: "", due: "" });
  const today = new Date();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.amount || !form.due) return;

    onAddBill({
      id: Date.now(),
      name: form.name,
      amount: parseFloat(form.amount),
      due: form.due,
    });

    setForm({ name: "", amount: "", due: "" });
  };

  return (
    <div className="upcoming-bills">
      <h3>Upcoming Bills</h3>

      {/* Add Bill Form */}
      <form className="bill-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Bill Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          min="0.01"
          required
        />
        <input
          type="date"
          name="due"
          value={form.due}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Bill</button>
      </form>

      {/* List of Bills */}
      {bills.length === 0 ? (
        <p>No upcoming bills.</p>
      ) : (
        <ul>
          {bills.map((bill, i) => {
            const dueDate = new Date(bill.due);
            const isDueSoon = (dueDate - today) / (1000 * 60 * 60 * 24) <= 7;
            return (
              <li key={bill.id || i} className={isDueSoon ? "due-soon" : ""}>
                <span>{bill.name}</span>
                <span>${bill.amount.toFixed(2)}</span>
                <small>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                  </svg>
                  {dueDate.toLocaleDateString()}
                </small>
                <button
                  className="delete-bill-btn"
                  onClick={() => onDeleteBill(bill.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5z" />
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2h3.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11z"
                    />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default UpcomingBills;
