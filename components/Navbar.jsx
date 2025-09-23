import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/storage";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ fontWeight: "bold", fontSize: "1.5rem", background: "linear-gradient(90deg, #7c3aed, #ec4899)", WebkitBackgroundClip: "text", color: "transparent" }}>
          MiniRed
        </Link>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link to="/">Inicio</Link>
          {user ? (
            <>
              <Link to="/profile">Perfil</Link>
              <button onClick={handleLogout} className="button-secondary">Cerrar sesión</button>
              <button
              onClick={() => {
                document.body.classList.toggle("light-mode");
                localStorage.setItem(
                  "theme",
                  document.body.classList.contains("light-mode") ? "light" : "dark"
                );
              }}
              className="button-secondary"
              >
              🌓 Tema
              </button>

              <span style={{ color: "#aaa", fontSize: "0.9rem" }}>Hola, {user.name}</span>
            </>
          ) : (
            <>
              <Link to="/login" className="button-secondary">Iniciar sesión</Link>
              <Link to="/register" className="button-primary">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
