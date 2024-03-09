import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  // Handle demo user login
  const handleDemoLogin = async () => {
    setForm({ email: 'demo@user.com', password: 'Demo@123' });
    handleSubmit({ preventDefault: () => {} });
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
          <h1 className='text-5xl font-semibold'>Login</h1>
          <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter your details.</p>
          <button onClick={handleDemoLogin} className='mt-4 text-blue-500'>Login with demo user</button>
          <form onSubmit={handleSubmit} className='mt-8'>
            <div className='flex flex-col'>
              <label className='text-lg font-medium'>Email</label>
              <input 
                name="email"
                value={form.email || ''}
                onChange={handleChange}
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder="Enter your email"/>
            </div>
            <div className='flex flex-col mt-4'>
              <label className='text-lg font-medium'>Password</label>
              <input 
                name="password"
                value={form.password || ''}
                onChange={handleChange}
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder="Enter your password"
                type="password"/>
            </div>
            <div className='mt-8 flex flex-col gap-y-4'>
              <button 
                type="submit"
                className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Sign in</button>
              <button 
                onClick={() => navigate('/signup')}
                className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Go to Signup</button>
            </div>
            {message && <p>{message}</p>}
            {errors && errors.errors && errors.errors.map((error, index) => <p key={index}>{error}</p>)}
          </form>
        </div>
      </div>
      <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
        <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-bounce"/> 
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
      </div>
    </div>
  );
}

export default Login;