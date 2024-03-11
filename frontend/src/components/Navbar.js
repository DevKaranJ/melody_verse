import React from 'react';

function Navbar({ onLogout }) {
  return (
    <nav className="flex justify-between items-center p-5 bg-violet-500 text-white">
      <h1 className="text-3xl font-semibold">Posts</h1>
      <button 
        onClick={onLogout} 
        className="py-2 px-4 rounded-xl bg-white text-violet-500 font-bold active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;