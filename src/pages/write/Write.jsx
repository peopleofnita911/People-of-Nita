import React from "react";
import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const BASE_URL = "people-of-nita.vercel.app";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    try {
      if (file) {
        const data = new FormData();
        // No need to set a filename; Cloudinary handles it
        data.append("file", file);
  
        // Upload the image to Cloudinary via your backend
        const uploadRes = await axios.post(`${BASE_URL}/api/upload`, data);
  
        // Get the image URL from the response
        const { url } = uploadRes.data;
  
        // Set the image URL in newPost.photo
        newPost.photo = url;
      }
  
      // Create the post with the image URL
      const res = await axios.post(`${BASE_URL}/api/posts`, newPost);
  
      toast.success("Post published successfully!");
      window.location.replace(`${BASE_URL}/post/` + res.data._id);
    } catch (err) {
      console.error(err);
      toast.error("Failed to publish post!");
    }
  };

  return (
    <div className="write">
      <ToastContainer />
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>

        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}