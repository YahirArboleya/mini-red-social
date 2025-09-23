import React, { useState, useEffect } from "react";
import { getCurrentUser, getUsers, saveUsers, setCurrentUser } from "../utils/storage";
import { useNavigate } from "react-router-dom";

function fileToBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

function ProfilePage({ onUpdateUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const current = getCurrentUser();
    if (!current) {
      navigate("/login"); // redirige si no hay sesión
      return;
    }
    setUser(current);
    setUsername(current.username);
    setBio(current.bio || "");
    setAvatar(current.avatar || "");
  }, [navigate]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setAvatar(base64);
  };

  const handleSave = () => {
    if (!user) return;
    const updated = { ...user, username, bio, avatar };

    // actualizar en users
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      users[idx] = updated;
      saveUsers(users);
    }

    // actualizar en sesión
    setCurrentUser(updated);
    setUser(updated);
    onUpdateUser?.(updated);

    setMessage("Perfil actualizado ✅");
    setTimeout(() => setMessage(""), 3000);
  };

  if (!user) return null;

  return (
    <div className="container">
      <div className="card">
        <h2>Mi Perfil</h2>
        {message && <p style={{ color: "green" }}>{message}</p>}

        <div style={{ marginBottom: "1rem" }}>
          <label>Foto de perfil</label>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img
              src={avatar || "https://via.placeholder.com/80"}
              alt="avatar"
              style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }}
            />
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Nombre de usuario</label>
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Biografía</label>
          <textarea
            className="input"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Escribe algo sobre ti..."
          />
        </div>

        <button onClick={handleSave} className="button-primary">
          Guardar cambios
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
