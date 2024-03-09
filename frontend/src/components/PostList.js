import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function PostList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const response = await fetch('http://localhost:3000/posts?page=1&size=10', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    setPosts(data);
  }

  function handleLogout() {
    localStorage.removeItem('token'); // remove the token from local storage
    navigate('/');
  }

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <Navbar onLogout={handleLogout} />
      <div className="flex flex-col items-center justify-center p-5">
      {posts.map((post) => (
  <div key={post.id} className="p-4 bg-white rounded-3xl shadow-lg w-full lg:w-1/2 mb-5 border-2 border-gray-100">
    <h2 className="text-2xl font-bold mb-2 text-violet-500">{post.title}</h2>
    <p className="text-gray-700">{post.content}</p>
    <p className="mt-2 text-sm text-gray-500">Posted by {post.username} on {new Date(post.created_at).toLocaleDateString()}</p>
  </div>
))}
      </div>
    </div>
  );
}

export default PostList;