// src/components/Post.jsx
import React, { useState } from 'react';

export default function Post({ post, onLike, onComment }) {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-2" />
        <span className="font-bold">{post.author}</span>
      </div>
      <p className="mb-3">{post.content}</p>
      
      {/* Botones de interacción */}
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <button onClick={() => onLike(post.id)} className="mr-4 hover:text-blue-600">
          👍 Me gusta ({post.likes})
        </button>
        <span>💬 Comentarios ({post.comments.length})</span>
      </div>
      
      {/* Sección de comentarios */}
      <div className="border-t pt-2">
        {post.comments.map((comment, index) => (
          <p key={index} className="text-sm text-gray-700">{comment}</p>
        ))}
      </div>
      
      {/* Formulario para comentar */}
      <form onSubmit={handleCommentSubmit} className="mt-2">
        <input
          type="text"
          className="w-full p-2 border rounded text-sm"
          placeholder="Escribe un comentario..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </form>
    </div>
  );
}