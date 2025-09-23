import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsers, getCurrentUser } from "../utils/storage";

function UserProfilePage() {
  const { id } = useParams(); // el id del usuario desde la URL
  const [user, setUser] = useState(null);
  const currentUser = getCurrentUser();

  useEffect(() => {
    const users = getUsers();
    const found = users.find((u) => u.id.toString() === id);
    setUser(found || null);
  }, [id]);

  if (!user) {
    return (
      <div className="container">
        <div className="card">
          <p>Usuario no encontrado ❌</p>
        </div>
      </div>
    );
  }

  const isMe = currentUser && currentUser.id === user.id;

  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <img
          src={user.avatar || "https://via.placeholder.com/100"}
          alt="avatar"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "1rem",
          }}
        />
        <h2>@{user.username}</h2>
        <p>{user.bio || "Sin biografía"}</p>
        {isMe && (
          <p style={{ marginTop: "1rem", color: "green" }}>
            Este es tu perfil. <a href="/profile">Editar</a>
          </p>
        )}
      </div>
    </div>
  );
}

export default UserProfilePage;
