import React, { useState } from "react";
import { toggleLike, addComment } from "../utils/storage";
import { Link } from "react-router-dom";
import { useNotifications } from "./NotificationContext";

function Post({ post, currentUser, onLike, onComment }) {
  const [likes, setLikes] = useState(post.likes || []);
  const [commentText, setCommentText] = useState("");
  const { addNotification } = useNotifications();

  const hasLiked = currentUser && likes.includes(currentUser.id);

  const handleLike = () => {
    if (!currentUser) {
      addNotification("Debes iniciar sesión para dar like", "error");
      return;
    }
    const updatedPost = toggleLike(post.id, currentUser.id);
    setLikes(updatedPost.likes);
    onLike(updatedPost);
    addNotification(
      hasLiked ? "Has quitado tu like" : "Te gustó esta publicación",
      "success"
    );
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!currentUser) {
      addNotification("Debes iniciar sesión para comentar", "error");
      return;
    }
    if (commentText.trim() === "") {
      addNotification("El comentario no puede estar vacío", "error");
      return;
    }

    const comment = {
      id: Date.now(),
      userId: currentUser.id,
      username: currentUser.username,
      text: commentText,
      date: new Date().toLocaleString(),
    };

    const updatedPost = addComment(post.id, comment);
    setCommentText("");
    onComment(updatedPost);
    addNotification("Comentario agregado con éxito", "success");
  };

  return (
    <div className="card" style={{ marginBottom: "1rem" }}>
      <div style={{ marginBottom: "0.5rem" }}>
        <Link
          to={`/user/${post.author.id}`}
          style={{
            color: "#3b82f6",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          @{post.author.username}
        </Link>{" "}
        <small style={{ color: "#aaa" }}>{post.date}</small>
      </div>

      <p>{post.content}</p>

      {post.image && (
        <img
          src={post.image}
          alt="post"
          style={{
            marginTop: "0.5rem",
            maxWidth: "100%",
            maxHeight: "250px",
            borderRadius: "8px",
            objectFit: "cover",
          }}
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

      {/* Sección de comentarios */}
      <div style={{ marginTop: "1rem" }}>
        <form
          onSubmit={handleAddComment}
          style={{ display: "flex", gap: "0.5rem" }}
        >
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Escribe un comentario..."
            className="input"
            style={{ flex: 1 }}
          />
          <button type="submit" className="button-primary">
            Comentar
          </button>
        </form>

        <div style={{ marginTop: "0.5rem" }}>
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((c) => (
              <div
                key={c.id}
                style={{ marginTop: "0.25rem", paddingLeft: "0.5rem" }}
              >
                <strong>@{c.username}</strong>{" "}
                <small style={{ color: "#aaa" }}>{c.date}</small>
                <p style={{ margin: "0.25rem 0" }}>{c.text}</p>
              </div>
            ))
          ) : (
            <p style={{ color: "#aaa", fontSize: "0.9rem" }}>
              No hay comentarios aún
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
