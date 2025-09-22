// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post"; // Asegúrate de que esta ruta sea correcta
import CreatePost from "../components/CreatePost"; // Asegúrate de que esta ruta sea correcta

export default function Home({ user }) {
  const [posts, setPosts] = useState([]);

  // Simulamos la carga de publicaciones desde algún lugar (localStorage, API, etc.)
  useEffect(() => {
    // Aquí podrías cargar publicaciones existentes
    // Por ahora, lo dejaremos vacío
  }, []);

  const handleNewPost = (newPost) => {
    // Agregamos la nueva publicación al principio del array
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };
  
  const handleComment = (postId, commentText) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, commentText] } : post
    ));
  };

  return (
    <div className="max-w-3xl mx-auto">
      {user ? (
        <>
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Feed</h1>
            <p className="text-sm text-gray-600">Bienvenido, {user.name} 👋</p>
            <p className="text-sm text-blue-600">Ve a <Link to="/profile">tu perfil</Link> para editar tu info.</p>
          </div>
          
          {/* Aquí mostramos el componente para crear una nueva publicación */}
          <CreatePost user={user} onNewPost={handleNewPost} />
          
          {/* Aquí mostramos el feed de publicaciones */}
          <div className="mt-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Post key={post.id} post={post} onLike={handleLike} onComment={handleComment} />
              ))
            ) : (
              <p className="text-gray-500 text-center">No hay publicaciones. ¡Sé el primero en publicar algo!</p>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="mb-3">Aún no has iniciado sesión.</p>
          <Link to="/login" className="px-3 py-1 bg-blue-600 text-white rounded">Iniciar</Link>
          <Link to="/register" className="ml-2 px-3 py-1 border rounded">Registrar</Link>
        </div>
      )}
    </div>
  );
}