// TransactionProvider.jsx

import React, { useState, useEffect } from "react";
import STORAGE_KEYS, {
  saveToStorage,
  getFromStorage,
} from "../utils/localStorage";
import { TransactionContext } from "../hooks/useTransactions";

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = getFromStorage(STORAGE_KEYS.TRANSACTIONS, []);
    if (savedTransactions) setTransactions(savedTransactions);
  }, []);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const removeTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
        clearTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
