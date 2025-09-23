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
    <nav className="bg-gray-800 shadow-lg p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-2xl">
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text">MiniRed</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-300 hover:text-white transition duration-300">Inicio</Link>

          {user ? (
            <>
              <Link to="/profile" className="text-gray-300 hover:text-white transition duration-300">Perfil</Link>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-semibold transition duration-300">Cerrar sesión</button>
              <span className="text-gray-400 text-sm hidden sm:block">Hola, {user.name}</span>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 border border-gray-600 rounded-full text-gray-300 hover:bg-gray-700 transition duration-300 text-sm">Iniciar sesión</Link>
              <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold transition duration-300 text-sm">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}