// src/components/Navbar.jsx
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
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">MiniRed</Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm">Inicio</Link>

          {user ? (
            <>
              <Link to="/profile" className="text-sm">Perfil</Link>
              <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Cerrar sesión</button>
              <span className="text-sm text-gray-600">Hola, {user.name}</span>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 border rounded text-sm">Iniciar</Link>
              <Link to="/register" className="px-3 py-1 border rounded text-sm">Registrar</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
