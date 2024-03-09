import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
    navigate('/login'); // navigate after form submission
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
    <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
      <h1 className='text-5xl font-semibold'>Register</h1>
      <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter your details.</p>
      <form onSubmit={handleSubmit} className='mt-8'>
        <div className='flex flex-col'>
          <label className='text-lg font-medium'>Username</label>
          <input 
            name="username"
            onChange={handleChange}
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
            placeholder="Enter your username"/>
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className='flex flex-col mt-4'>
          <label className='text-lg font-medium'>Email</label>
          <input 
            name="email"
            onChange={handleChange}
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
            placeholder="Enter your email"/>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='flex flex-col mt-4'>
          <label className='text-lg font-medium'>Password</label>
          <input 
            name="password"
            type="password"
            onChange={handleChange}
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
            placeholder="Enter your password"/>
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className='flex flex-col mt-4'>
          <label className='text-lg font-medium'>Confirm Password</label>
          <input 
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
            placeholder="Confirm your password"/>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <div className='flex flex-col mt-4'>
          <label className='text-lg font-medium'>Name</label>
          <input 
            name="name"
            onChange={handleChange}
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
            placeholder="Enter your name"/>
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className='flex flex-col mt-4'>
          <label className='text-lg font-medium'>Profile Picture URL</label>
          <input 
            name="profile_picture"
            onChange={handleChange}
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
            placeholder="Enter your profile picture URL"/>
          {errors.profile_picture && <p>{errors.profile_picture}</p>}
        </div>
        <div className='mt-8 flex flex-col gap-y-4'>
      <button 
        type="submit"
        className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>
        Register
      </button>
      <button 
        type="button"
        onClick={() => { navigate('/login') }}
        className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>
        Login
      </button>
    </div>
    {message && <p>{message}</p>}
  </form>
</div>
  );
}
export default Signup;