// utils/localStorage.js

const STORAGE_KEYS = {
  USER: "fintrackr_user", // ✅ add this for current logged-in user
  USERS: "fintrackr_users", // ✅ all registered users
  TRANSACTIONS: "fintrackr_transactions",
  GOALS: "fintrackr_goals",
  BILLS: "fintrackr_bills",
  BUDGETS: "fintrackr_budgets",
};



/**
 * Save data to localStorage
 * @param {string} key
 * @param {any} value
 */
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

/**
 * Get data from localStorage
 * @param {string} key
 * @param {any} fallback
 */
export const getFromStorage = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return fallback;
  }
};

/**
 * Remove data from localStorage
 * @param {string} key
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

export default STORAGE_KEYS;
