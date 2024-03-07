import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';

// Create a schema for the form
const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  name: yup.string(),
  profile_picture: yup.string().url(),
});

// Create a Signup component
function Signup() {
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
      const response = await axios.post('http://localhost:3000/signup', form);
      setMessage(response.data.message);
      console.log('Welcome email sent to ' + form.email);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setErrors(errors);
      } else {
        setMessage(err.response.data.error);
      }
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      {errors.username && <p>{errors.username}</p>}
      <input name="email" placeholder="Email" onChange={handleChange} />
      {errors.email && <p>{errors.email}</p>}
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      {errors.password && <p>{errors.password}</p>}
      <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      <input name="name" placeholder="Name" onChange={handleChange} />
      {errors.name && <p>{errors.name}</p>}
      <input name="profile_picture" placeholder="Profile Picture URL" onChange={handleChange} />
      {errors.profile_picture && <p>{errors.profile_picture}</p>}
      <button type="submit">Sign Up</button>
      {message && <p>{message}</p>}
    </form>
    </div>
  );
}

export default Signup;