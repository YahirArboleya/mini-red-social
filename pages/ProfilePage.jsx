// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
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

export default function ProfilePage({ onUpdateUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setAvatarPreview(base64);
  };

  const handleSave = () => {
    const updated = { ...user, name, bio, avatar: avatarPreview };
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === updated.id);
    if (idx >= 0) {
      users[idx] = updated;
      saveUsers(users);
      setCurrentUser(updated);
      setUser(updated);
      onUpdateUser?.(updated);
      setMessage("Perfil guardado ✅");
      setTimeout(() => setMessage(""), 2500);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Mi perfil</h2>
      {message && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</div>}
      <div className="mb-4">
        <label className="block text-sm mb-1">Foto</label>
        <div className="flex items-center gap-4">
          <img src={avatarPreview || "https://via.placeholder.com/80"} alt="avatar" className="w-20 h-20 rounded-full object-cover border" />
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>
      </div>

      <div className="space-y-3">
        <input className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea className="w-full p-2 border rounded" rows="3" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio (qué te gusta, descripción corta)"></textarea>
        <div className="flex gap-2">
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
          <button onClick={() => navigate("/")} className="px-4 py-2 border rounded">Volver</button>
        </div>
      </div>
    </div>
  );
}
