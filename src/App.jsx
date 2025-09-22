// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Register from "../components/Auth/Register";
import ProfilePage from "../pages/ProfilePage";
import { getCurrentUser } from "../utils/storage";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../components/Auth/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} setUser={setUser} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register onRegistered={setUser} />} />
          <Route path="/profile" element={<ProfilePage onUpdateUser={setUser} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
