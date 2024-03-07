import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function SplashScreen() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <div>
      <h1>Welcome to Our App</h1>
      <button onClick={openLogin}>Login</button>
      <button onClick={openSignup}>Signup</button>

      {showLogin && <Login onClose={closeModals} />}
      {showSignup && <Signup onClose={closeModals} />}
    </div>
  );
}

export default SplashScreen;