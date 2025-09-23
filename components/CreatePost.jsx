import React, { useState } from "react";

function CreatePost({ onPost }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "") return;
    onPost(content);
    setContent("");
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
        <button type="submit" className="button-primary">Publicar</button>
      </form>
    </div>
  );
}

export default CreatePost;
