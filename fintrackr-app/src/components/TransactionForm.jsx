// src/components/TransactionForm.jsx
// src/components/TransactionForm.jsx
// src/components/TransactionForm.jsx
// src/components/TransactionForm.jsx
// src/components/TransactionForm.jsx
import React, { useState, useMemo } from "react";
import "../styles/TransactionForm.css";

function TransactionForm({ onAdd, goals = [], budgets = {}, onSaveBudgets }) {
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0], // Default to current date
    description: "",
    recurring: false,
    frequency: "monthly",
    goal: "",
  });

  const [errors, setErrors] = useState({});
  const [budgetWarning, setBudgetWarning] = useState("");

  const categories = {
    income: ["Salary", "Freelance", "Investment", "Other"],
    expense: ["Food", "Rent", "Transport", "Entertainment", "Bills", "Other"],
  };

  // --- LOGIC: Professional Automation Summary ---
  // This tells the user exactly how the frequency will affect their balance.
  const automationSummary = useMemo(() => {
    if (!form.recurring || !form.amount) return null;
    const amt = parseFloat(form.amount).toLocaleString();
    const action = form.type === "income" ? "deposited into" : "withdrawn from";
    return `Note: $${amt} will be automatically ${action} your balance every ${form.frequency}.`;
  }, [form.recurring, form.amount, form.frequency, form.type]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };
    setForm(newForm);

    // Dynamic Budget & Frequency Validation
    if (
      (name === "amount" || name === "category") &&
      newForm.type === "expense"
    ) {
      const budgetLimit = budgets[newForm.category] || Infinity;
      if (parseFloat(newForm.amount) > budgetLimit) {
        setBudgetWarning(
          `Limit Exceeded: Budget for ${newForm.category} is $${budgetLimit}`,
        );
      } else {
        setBudgetWarning("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.amount || form.amount <= 0) newErrors.amount = "Invalid amount";
    if (!form.category) newErrors.category = "Required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Professional Status Mapping
    onAdd({
      id: Date.now(),
      ...form,
      amount: parseFloat(form.amount),
      status: form.recurring ? "Automated Standing Order" : "Manual Entry",
    });

    // Reset Form to initial state
    setForm({
      type: "income",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      recurring: false,
      frequency: "monthly",
      goal: "",
    });
    setErrors({});
  };

  return (
    <form className="dark-tx-form" onSubmit={handleSubmit}>
      <div className="form-grid-modern">
        {/* Type Group */}
        <div className="input-group">
          <label className="dark-label">Cash Flow Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="dark-select"
          >
            <option value="income">Credit (Inflow)</option>
            <option value="expense">Debit (Outflow)</option>
          </select>
        </div>

        {/* Amount Group */}
        <div className="input-group">
          <label className="dark-label">Value (USD)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            className={`dark-input ${errors.amount ? "input-error" : ""}`}
          />
        </div>

        {/* Category Group */}
        <div className="input-group">
          <label className="dark-label">Classification</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="dark-select"
          >
            <option value="">Select Category</option>
            {categories[form.type].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date Group */}
        <div className="input-group">
          <label className="dark-label">Effective Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="dark-input"
          />
        </div>

        {/* Automation & Frequency Section */}
        <div className="automation-logic-box full-width">
          <label className="dark-checkbox">
            <input
              type="checkbox"
              name="recurring"
              checked={form.recurring}
              onChange={handleChange}
            />
            <span className="checkbox-text">
              Establish Automated Standing Order
            </span>
          </label>

          {form.recurring && (
            <div className="frequency-pill-container">
              <label className="dark-label-xs">Frequency Cadence</label>
              <div className="pill-group">
                {["daily", "weekly", "monthly"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`pill-btn ${form.frequency === f ? "active" : ""}`}
                    onClick={() => setForm({ ...form, frequency: f })}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Smart Automation Summary */}
        {automationSummary && (
          <div className="automation-summary-strip full-width">
            <div className="pulse-indicator"></div>
            <span>{automationSummary}</span>
          </div>
        )}

        {/* Goal Assignment - Full Width */}
        {form.type === "income" && goals.length > 0 && (
          <div className="input-group full-width">
            <label className="dark-label">Allocate to Strategic Goal</label>
            <select
              name="goal"
              value={form.goal}
              onChange={handleChange}
              className="dark-select"
            >
              <option value="">-- No Assignment --</option>
              {goals.map((g) => (
                <option key={g.name} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Budget Adjustment Control */}
        {form.type === "expense" && form.category && onSaveBudgets && (
          <div className="input-group full-width">
            <label className="dark-label">
              Adjust {form.category} Threshold
            </label>
            <input
              type="number"
              className="dark-input"
              value={budgets[form.category] || ""}
              onChange={(e) =>
                onSaveBudgets({
                  ...budgets,
                  [form.category]: Number(e.target.value),
                })
              }
              placeholder="Define budget limit..."
            />
          </div>
        )}

        {/* Memo Input */}
        <div className="input-group full-width">
          <label className="dark-label">Transaction Memo</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Reference notes..."
            className="dark-input"
          />
        </div>

        {/* Error/Warning Strips */}
        {budgetWarning && (
          <div className="dark-warning-strip full-width">{budgetWarning}</div>
        )}
      </div>

      <div className="dark-form-actions">
        <button type="submit" className="btn-primary-glow">
          Authorize Strategic Entry
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;