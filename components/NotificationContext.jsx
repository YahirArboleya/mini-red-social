import React, { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const addNotification = (text) => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, text }]);

    // Auto eliminar después de 3s
    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}

      {/* Bandeja de notificaciones */}
      <div style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        zIndex: 1000
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            background: "#333",
            color: "#fff",
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}>
            {msg.text}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}
