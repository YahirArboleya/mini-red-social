import React, { useState } from "react";
import { createPost } from "../utils/storage";

function CreatePost({ user, onNewPost }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "" && !image) return;

    const newPost = createPost(content, image, {
      id: user.id,
      username: user.username,
    });

    onNewPost(newPost);
    setContent("");
    setImage(null);
  };

  return (
    <div className="card">
      <h2>Crear Publicación</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="input"
          rows="3"
          placeholder="¿Qué estás pensando?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <div style={{ marginTop: "0.5rem" }}>
            <img src={image} alt="preview" style={{ maxWidth: "100%", borderRadius: "8px" }} />
          </div>
        )}
        <button type="submit" className="button-primary">Publicar</button>
      </form>
    </div>
  );
}

export default CreatePost;
