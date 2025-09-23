import React from "react";

function Login() {
  return (
    <div className="container">
      <div className="card">
        <h2>Iniciar Sesión</h2>
        <form>
          <div>
            <label>Email</label>
            <input type="email" className="input" placeholder="ejemplo@mail.com" />
          </div>
          <div>
            <label>Contraseña</label>
            <input type="password" className="input" placeholder="********" />
          </div>
          <button type="submit" className="button-primary">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
