import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./singlePost.css";
import React from 'react';

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL ;
  useEffect(() => {
    const getPost = async () => {
      const loadingToast = toast.loading("Loading post...");

      try {
        const res = await axios.get(`${BASE_URL}/api/posts/` + path);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        toast.update(loadingToast, {
          render: "Post loaded successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (error) {
        toast.update(loadingToast, {
          render: "Failed to load post",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      toast.success("Post deleted successfully");
      window.location.replace("/");
    } catch (err) {
      toast.error("Failed to delete post");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${BASE_URL}/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
      toast.success("Post updated successfully");
    } catch (err) {
      toast.error("Failed to update post");
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
  <textarea
    className="singlePostDescInput"
    value={desc}
    onChange={(e) => setDesc(e.target.value)}
  />
) : (
  <p className="singlePostDesc">
    {desc.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))}
  </p>
)}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}