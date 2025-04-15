import { useState } from 'react';
import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  // Handle window resize
  window.addEventListener('resize', () => {
    setIsMobileView(window.innerWidth < 768);
  });

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + (isMobileView ? 5 : 9));
  };

  return (
    <div className="posts-container">
      <div className="posts">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.slice(0, visiblePosts).map((p) => <Post key={p.id} post={p} />)
        ) : (
          <p>No posts available</p>
        )}
      </div>
      
      {Array.isArray(posts) && visiblePosts < posts.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={handleLoadMore}>
            Read More
          </button>
        </div>
      )}
    </div>
  );
}