import React from 'react';
import axios from '../../utils/axiosInstance';
import { useState } from 'react';

const LoginAdmin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [token, setToken] = useState('');

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/admins/login', formData);
      const { token } = res.data;
      setToken(token);
      localStorage.setItem('adminToken', token);
      alert('Login successful!');
      window.location.href = '/admin/dashboard';
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('Login failed!');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            name='email'
            type="email"
            placeholder="Admin Email"
            className="w-full text-black mb-4 p-3 rounded-xl border dark:bg-slate-700"
            onChange={handleChange}
          />
          <input
            name='password'
            type="password"
            placeholder="Password"
            className="w-full text-black mb-4 p-3 rounded-xl border dark:bg-slate-700"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
