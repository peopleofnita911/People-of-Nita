import { useLocation } from "react-router-dom"; // Ensure you're importing from 'react-router-dom'
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";

import "./homepage.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL ;
 // Updated variable name
  console.log(BASE_URL);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/posts${search}`, {
          withCredentials: true, // Include cookies if needed
        });
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [search, BASE_URL]);

  console.log("Posts:", posts);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}