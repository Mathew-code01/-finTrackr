// src/components/TransactionForm.jsx
// src/components/TransactionForm.jsx
// src/components/TransactionForm.jsx
// src/components/TransactionForm.jsx
// src/components/TransactionForm.jsx
import React, { useState } from "react";
import "../styles/TransactionForm.css";

function TransactionForm({ onAdd, goals = [], budgets = {}, onSaveBudgets }) {
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    date: "",
    description: "",
    recurring: false,
    frequency: "",
    goal: "",
  });
  const [errors, setErrors] = useState({});
  const [budgetWarning, setBudgetWarning] = useState("");

  const categories = {
    income: ["Salary", "Freelance", "Investment", "Other"],
    expense: ["Food", "Rent", "Transport", "Entertainment", "Bills", "Other"],
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };
    setForm(newForm);

    // Check budget warning
    if (name === "amount" || name === "category") {
      if (newForm.type === "expense" && newForm.category && newForm.amount) {
        const budgetLimit = budgets[newForm.category] || Infinity;
        if (parseFloat(newForm.amount) > budgetLimit) {
          setBudgetWarning(
            `⚠ Warning: This expense exceeds your budget for ${newForm.category}`
          );
        } else {
          setBudgetWarning("");
        }
      } else {
        setBudgetWarning("");
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.amount || form.amount <= 0) newErrors.amount = "Enter a valid amount.";
    if (!form.category) newErrors.category = "Category is required.";
    if (!form.date) newErrors.date = "Date is required.";
    if (form.recurring && !form.frequency) newErrors.frequency = "Select frequency.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setBudgetWarning("");

    onAdd({
      id: Date.now(),
      ...form,
      amount: parseFloat(form.amount),
    });

    setForm({
      type: "income",
      amount: "",
      category: "",
      date: "",
      description: "",
      recurring: false,
      frequency: "",
      goal: "",
    });
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      {/* Type */}
      <div className="form-row">
        <label>Type</label>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Amount */}
      <div className="form-row">
        <label>Amount ($)</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="0.00"
          min="0.01"
          required
        />
        {errors.amount && <span className="error-msg">{errors.amount}</span>}
      </div>

      {/* Category */}
      <div className="form-row">
        <label>Category</label>
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select category</option>
          {categories[form.type].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <span className="error-msg">{errors.category}</span>}
      </div>

      {/* Budget warning */}
      {budgetWarning && <p className="budget-warning">{budgetWarning}</p>}

      {/* Optional Goal (only for income) */}
      {form.type === "income" && goals.length > 0 && (
        <div className="form-row">
          <label>Assign to Goal</label>
          <select name="goal" value={form.goal} onChange={handleChange}>
            <option value="">-- None --</option>
            {goals.map((g) => (
              <option key={g.name} value={g.name}>{g.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Budget Form (only for expenses) */}
      {form.type === "expense" && onSaveBudgets && (
        <div className="budget-section">
          <h3>Set Budgets</h3>
          {categories.expense.map((cat) => (
            <div className="form-row" key={cat}>
              <label>{cat} Budget ($)</label>
              <input
                type="number"
                min="0"
                value={budgets[cat] || ""}
                onChange={(e) =>
                  onSaveBudgets({
                    ...budgets,
                    [cat]: Number(e.target.value),
                  })
                }
                placeholder="Set budget"
              />
            </div>
          ))}
        </div>
      )}

      {/* Date */}
      <div className="form-row">
        <label>Date</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        {errors.date && <span className="error-msg">{errors.date}</span>}
      </div>

      {/* Description */}
      <div className="form-row">
        <label>Description</label>
        <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Optional" />
      </div>

      {/* Recurring */}
      <div className="form-row checkbox-row">
        <label>
          <input type="checkbox" name="recurring" checked={form.recurring} onChange={handleChange} /> Recurring?
        </label>
      </div>

      {form.recurring && (
        <div className="form-row">
          <label>Frequency</label>
          <select name="frequency" value={form.frequency} onChange={handleChange}>
            <option value="">Select frequency</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          {errors.frequency && <span className="error-msg">{errors.frequency}</span>}
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="add-btn">Add Transaction</button>
        <button
          type="button"
          className="reset-btn"
          onClick={() =>
            setForm({
              type: "income",
              amount: "",
              category: "",
              date: "",
              description: "",
              recurring: false,
              frequency: "",
              goal: "",
            })
          }
        >
          Clear
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
