import React from "react";

function Register() {
  return (
    <div className="container">
      <div className="card">
        <h2>Registrarse</h2>
        <form>
          <div>
            <label>Usuario</label>
            <input type="text" className="input" placeholder="Tu nombre de usuario" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" className="input" placeholder="ejemplo@mail.com" />
          </div>
          <div>
            <label>Contraseña</label>
            <input type="password" className="input" placeholder="********" />
          </div>
          <button type="submit" className="button-primary">Crear cuenta</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
