import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";

import "./homepage.css";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Homepage() {
  const [posts,setPosts]=useState([]);

  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  const location = useLocation();
  console.log(posts);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
      </div>
    </>
  );
}