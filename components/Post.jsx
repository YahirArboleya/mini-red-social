import React from "react";

function Post({ username, content, date }) {
  return (
    <div className="card">
      <h3>@{username}</h3>
      <p>{content}</p>
      <small>{date}</small>
    </div>
  );
}

export default Post;
