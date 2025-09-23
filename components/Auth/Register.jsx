import React, { useState } from "react";
import { registerUser } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

function Register({ onRegistered }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = registerUser(username, email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    onRegistered?.(result.user); // actualiza el estado global en App
    navigate("/"); // redirige al home
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Registrarse</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Usuario</label>
            <input
              type="text"
              className="input"
              placeholder="Tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              className="input"
              placeholder="ejemplo@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              className="input"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button-primary">Crear cuenta</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
