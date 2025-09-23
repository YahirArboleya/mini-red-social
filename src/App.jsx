import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Register from "../components/Auth/Register";
import ProfilePage from "../pages/ProfilePage";
import { getCurrentUser } from "../utils/storage";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../components/Auth/Login";
import UserProfilePage from "../pages/UserProfilePage";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());

    // Aplicar tema guardado
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      document.body.classList.add("light-mode");
    }
  }, []);

  return (
    <Router>
      <div>
        <Navbar user={user} setUser={setUser} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login onLogin={setUser} />} />
            <Route path="/register" element={<Register onRegistered={setUser} />} />
            <Route path="/profile" element={<ProfilePage onUpdateUser={setUser} />} />
            <Route path="/user/:id" element={<UserProfilePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
