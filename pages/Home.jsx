import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import { getAllPosts, savePosts } from "../utils/storage";

export default function Home({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = getAllPosts();
    setPosts(storedPosts);
  }, []);

  const handleNewPost = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
    savePosts(posts);
  };
  
  const handleComment = (postId, commentText) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, commentText] } : post
    ));
    savePosts(posts);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-0">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-100">Feed</h1>
        <p className="text-sm text-gray-400">Aquí verás las publicaciones de tus amigos.</p>
      </div>
      {user ? (
        <>
          <div className="mb-6">
            <CreatePost user={user} onNewPost={handleNewPost} />
          </div>
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Post key={post.id} post={post} onLike={handleLike} onComment={handleComment} />
              ))
            ) : (
              <p className="text-gray-500 text-center py-10">¡Sé el primero en publicar algo!</p>
            )}
          </div>
        </>
      ) : (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
          <p className="mb-4 text-lg text-gray-300">Aún no has iniciado sesión.</p>
          <div className="flex justify-center gap-4">
            <Link to="/login" className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold transition duration-300">Iniciar Sesión</Link>
            <Link to="/register" className="px-5 py-2 border border-gray-600 rounded-full text-gray-300 hover:bg-gray-700 transition duration-300">Registrarse</Link>
          </div>
        </div>
      )}
    </div>
  );
}
