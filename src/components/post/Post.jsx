import "./post.css";
import { Link } from "react-router-dom";
import React from 'react';

export default function Post({ post }) {
  return (
    <div className="post">
      {post.photo && (
        <img className="postImg" src={post.photo} alt={post.title} />
      )}
      <div className="postContent">
        <Link to={`/post/${post._id}`} className="link">
          <h3 className="postTitle">{post.title}</h3>
        </Link>
        <p className="postDesc">
          {post.desc.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <div className="postMeta">
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
          <div className="postCats">
            {post.categories.map((c) => (
              <span className="postCat" key={c._id}>{c.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}