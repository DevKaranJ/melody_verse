import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Create a schema for the form
const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

// Create a Login component
function Login() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(form, { abortEarly: false });
      const response = await axios.post('http://localhost:3000/login', form);
      setMessage(response.data.message);

      // If login is successful...
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        navigate('/posts');
      }
    } catch (err) {
      setErrors(err.inner);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Log In</button>
        {message && <p>{message}</p>}
        {errors && errors.errors && errors.errors.map((error, index) => <p key={index}>{error}</p>)}
      </form>
    </div>
  );
}

export default Login;