import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "info") => {
    const newNotif = {
      id: Date.now(),
      message,
      type,
      read: false,
      date: new Date().toLocaleString(),
    };
    setNotifications((prev) => [newNotif, ...prev]); // se guarda historial
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAsRead, clearNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
