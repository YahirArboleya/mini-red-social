import React, { useState } from "react";
import { createPost } from "../utils/storage";

function fileToBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

function CreatePost({ user, onNewPost }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setImage(base64);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "" && !image) return;

    const newPost = createPost(content, user, image);
    onNewPost(newPost);

    setContent("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="card" style={{ marginBottom: "1.5rem" }}>
      <h2 style={{ marginBottom: "0.5rem" }}>Crear Publicación</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="input"
          rows="3"
          placeholder="¿Qué estás pensando?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ marginBottom: "0.5rem" }}
        />

        {preview && (
          <div style={{ marginBottom: "0.5rem" }}>
            <img
              src={preview}
              alt="preview"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ flex: 1 }}
          />
          <button type="submit" className="button-primary">
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
