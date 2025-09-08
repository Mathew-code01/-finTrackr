// src/providers/NotificationProvider.jsx
// src/providers/NotificationProvider.jsx
import React, { useState } from "react";
import { NotificationContext } from "../context/NotificationContext";

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    setNotifications((prev) => [
      { id: Date.now(), message },
      ...prev,
    ]);
  };

  const clearNotifications = () => setNotifications([]);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, clearNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
