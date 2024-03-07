import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';

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