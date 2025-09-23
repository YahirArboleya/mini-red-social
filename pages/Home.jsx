import React, { useEffect, useState } from "react";
import { getAllPosts } from "../utils/storage";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

export default function Home({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleLike = (updatedPost) => {
    const updated = posts.map((p) => (p.id === updatedPost.id ? updatedPost : p));
    setPosts(updated);
  };

  return (
    <div className="container" style={{ maxWidth: "800px", margin: "auto" }}>
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h1>Feed</h1>
      </div>

      {user ? (
        <>
          <CreatePost user={user} onNewPost={handleNewPost} />
          {posts.length > 0 ? (
            posts.map((p) => (
              <Post key={p.id} post={p} currentUser={user} onLike={handleLike} />
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#aaa", marginTop: "2rem" }}>
              ¡Sé el primero en publicar algo!
            </p>
          )}
        </>
      ) : (
        <div className="card" style={{ textAlign: "center" }}>
          <p>Inicia sesión para ver el feed</p>
        </div>
      )}
    </div>
  );
}
