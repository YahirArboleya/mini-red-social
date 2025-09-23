import React, { useState, useEffect } from "react";
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

  const handleLike = (updatedPost) => {
    const updatedPosts = posts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  const handleComment = (updatedPost) => {
    const updatedPosts = posts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  return (
    <div className="container" style={{ maxWidth: "800px", margin: "auto" }}>
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Feed</h1>
        <p style={{ color: "#aaa" }}>
          Aquí verás las publicaciones de tus amigos.
        </p>
      </div>

      {user ? (
        <>
          <CreatePost user={user} onNewPost={handleNewPost} />
          <div>
            {posts.length > 0 ? (
              posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  currentUser={user}
                  onLike={handleLike}
                  onComment={handleComment}
                />
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: "#aaa",
                  marginTop: "2rem",
                }}
              >
                ¡Sé el primero en publicar algo!
              </p>
            )}
          </div>
        </>
      ) : (
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ marginBottom: "1rem" }}>Aún no has iniciado sesión.</p>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
          >
            <a href="/login" className="button-secondary">
              Iniciar Sesión
            </a>
            <a href="/register" className="button-primary">
              Registrarse
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
