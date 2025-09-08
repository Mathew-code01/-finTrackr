// utils/timeframeFilter.js
export function filterByTimeframe(transactions, timeframe) {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const endOfToday = new Date(startOfToday);
  endOfToday.setHours(23, 59, 59, 999);

  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay()); // Sunday

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  return transactions.filter((t) => {
    const txDate = new Date(t.date);

    switch (timeframe) {
      case "daily":
        return txDate >= startOfToday && txDate <= endOfToday;

      case "weekly":
        return txDate >= startOfWeek && txDate <= now;

      case "monthly":
        return txDate >= startOfMonth && txDate <= now;

      case "yearly":
        return txDate >= startOfYear && txDate <= now;

      default:
        return true;
    }
  });
}
