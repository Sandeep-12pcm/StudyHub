import React, { useState } from 'react';
import axios from '../../utils/axiosInstance';

const AdminSignup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/admins/signup', formData);
      alert('Admin registered successfully!');
    } catch (err) {
      console.error('Signup Error:', err.response?.data || err.message);
      alert('Signup failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-6">
      <input name="name" placeholder="Name" className='mb-4 p-2 border rounded text-black' onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" className='mb-4 p-2 border rounded text-black' onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" className='mb-4 p-2 border rounded text-black' onChange={handleChange} required />
      <button type="submit" className='bg-blue-600 text-white py-2 px-4 rounded'>Signup</button>
    </form>
  );
};

export default AdminSignup;
