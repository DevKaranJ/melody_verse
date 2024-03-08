import React from 'react';

function Navbar({ onLogout }) {
  return (
    <nav>
      <h1>Posts</h1>
      <button onClick={onLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;