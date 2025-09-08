// utils/formatDate.js

/**
 * Format a date into a user-friendly string
 * @param {string|Date} date
 * @param {object} options
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  try {
    return new Date(date).toLocaleDateString("en-US", {
      ...defaultOptions,
      ...options,
    });
  } catch (error) {
    console.error("Invalid date format in formatDate:", date, error);
    return "";
  }
};

/**
 * Format to "time ago" style (e.g. "2 days ago")
 */
export const timeAgo = (date) => {
  try {
    const now = new Date();
    const past = new Date(date);

    if (isNaN(past.getTime())) throw new Error("Invalid date");

    const seconds = Math.floor((now - past) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);
      if (count >= 1) return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
    }

    return "Just now";
  } catch (error) {
    console.error("Invalid date format in timeAgo:", date, error);
    return "";
  }
};
