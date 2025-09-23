import React, { useState } from "react";
import { toggleLike } from "../utils/storage";
import { Link } from "react-router-dom";

function Post({ post, currentUser, onLike }) {
  const [likes, setLikes] = useState(post.likes || []);

  const hasLiked = currentUser && likes.includes(currentUser.id);

  const handleLike = () => {
    if (!currentUser) {
      alert("Debes iniciar sesión para dar like");
      return;
    }
    const updatedPost = toggleLike(post.id, currentUser.id);
    setLikes(updatedPost.likes);
    onLike(updatedPost);
  };

  return (
    <div className="card" style={{ marginBottom: "1rem" }}>
      <div style={{ marginBottom: "0.5rem" }}>
        <Link to={`/user/${post.author.id}`}>
          <strong>@{post.author.username}</strong>
        </Link>{" "}
        <small>{post.date}</small>
      </div>
      <p>{post.content}</p>
      {post.image && (
        <img
          src={post.image}
          alt="post"
          style={{ marginTop: "0.5rem", maxWidth: "100%", borderRadius: "8px" }}
        />
      )}
      <div style={{ marginTop: "0.5rem" }}>
        <button
          onClick={handleLike}
          className="button-secondary"
          style={{
            background: hasLiked ? "#ec4899" : "#e5e7eb",
            color: hasLiked ? "white" : "black",
          }}
        >
          {hasLiked ? "❤️ Me gusta" : "🤍 Me gusta"} ({likes.length})
        </button>
      </div>
    </div>
  );
}

export default Post;
