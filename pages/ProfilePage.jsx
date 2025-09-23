import React from "react";

function ProfilePage({ user }) {
  if (!user) {
    return (
      <div className="container">
        <div className="card">
          <h2>Debes iniciar sesión para ver tu perfil</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Perfil de {user.username}</h2>
        <p>Email: {user.email}</p>
        <p>Miembro desde: {user.joined}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
