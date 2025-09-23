import React, { useState } from 'react';

export default function CreatePost({ user, onNewPost }) {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim()) {
      const newPost = {
        id: Date.now(),
        author: user.name,
        content: postContent,
        likes: 0,
        comments: [],
        timestamp: new Date().toISOString()
      };
      onNewPost(newPost);
      setPostContent('');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded resize-none"
          rows="3"
          placeholder={`¿Qué tienes en mente, ${user.name}?`}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
}
