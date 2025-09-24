import React, { useState } from "react";
import { useNotifications } from "./NotificationContext";

function NotificationBell() {
  const { notifications, markAsRead, clearNotifications } = useNotifications();
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ position: "relative" }}>
      {/* Botón campana */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "1.5rem",
          cursor: "pointer",
          position: "relative",
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "red",
              color: "white",
              borderRadius: "50%",
              fontSize: "0.8rem",
              padding: "2px 6px",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Panel de notificaciones */}
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "2rem",
            background: "#1f2937",
            color: "white",
            width: "300px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            maxHeight: "400px",
            overflowY: "auto",
            zIndex: 100,
          }}
        >
          <div
            style={{
              padding: "0.5rem",
              borderBottom: "1px solid #374151",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Notificaciones</span>
            <button
              onClick={clearNotifications}
              style={{
                background: "transparent",
                border: "none",
                color: "#aaa",
                cursor: "pointer",
              }}
            >
              Limpiar
            </button>
          </div>
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                style={{
                  padding: "0.5rem",
                  borderBottom: "1px solid #374151",
                  background: n.read ? "transparent" : "#111827",
                  cursor: "pointer",
                }}
              >
                <p style={{ margin: 0 }}>{n.message}</p>
                <small style={{ color: "#9ca3af" }}>{n.date}</small>
              </div>
            ))
          ) : (
            <p style={{ padding: "1rem", color: "#aaa" }}>
              No hay notificaciones
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
