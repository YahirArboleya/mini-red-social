// src/components/Auth/Register.jsx
import React, { useState } from "react";
import { getUsers, saveUsers, setCurrentUser } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Register({ onRegistered }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Completa todos los campos.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      setError("El email ya está registrado.");
      return;
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      bio: "",
      avatar: "",
    };
    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);
    onRegistered?.(newUser);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Crear cuenta</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full p-2 border rounded" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Confirmar contraseña" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Registrarse</button>
      </form>
    </div>
  );
}
