import React, { useState } from "react";
import { getUsers, setCurrentUser } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      setError("Credenciales inválidas.");
      return;
    }
    setCurrentUser(user);
    onLogin?.(user);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl mb-4">Iniciar sesión</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full p-2 border rounded" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-green-600 text-white p-2 rounded">Entrar</button>
      </form>
    </div>
  );
}
 