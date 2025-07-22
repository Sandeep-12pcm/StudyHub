// pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RegisterForm from '../components/Auth/RegisterForm';
import LoginForm from '../components/Auth/LoginForm';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    branch: '',
    year: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token') || localStorage.getItem('userID') || localStorage.getItem('user');
      if (token) {
        alert('Already Logged In, Please log out first');
        return navigate('/home');
      }
    };
    fetchDashboard();
  }, []);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, branch, year } = formData;

    if (isRegister) {
      // Validation
      if (!username || !email || !password || !branch || !year) {
        alert('Please fill in all fields.');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
      }

      // Send signup request
      try {
        const res = await axios.post('/users/register', {
          name: username,
          email,
          password,
          branch,
          year: parseInt(year) || year
        });

        alert('✅ Registration successful!');
        setIsRegister(false); // Switch to login form
      } catch (err) {
        console.error('Signup error:', err.response?.data || err.message);
        alert(err.response?.data?.message || 'Signup failed');
      }

    } else {
      // Login
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }

      try {
        const res = await axios.post('/users/login', {
          email,
          password
        });
        if (res.data.token) {
          localStorage.setItem('token', res.data.token); // for future protected routes
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('userID', res.data.user.id); // for feedback
          setIsLoggedIn(true);
          
          navigate('/home');
        }
      } catch (err) {
        console.error('Login error:', err.response?.data || err.message);
        alert(err.response?.data?.message || 'Login failed. Check credentials.');
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen pt-28 pb-8 px-4 bg-gradient-to-tr from-blue-600 to-blue-200 dark:from-gray-900 dark:to-gray-700 flex items-center justify-center font-poppins relative overflow-hidden">

      {/* Animated Background */}
      <motion.div className="absolute w-96 h-96 bg-blue-300 dark:bg-blue-400 opacity-60 dark:opacity-30 rounded-full top-[-100px] left-[-100px]"
        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div className="absolute w-64 h-64 bg-blue-200 dark:bg-blue-300 opacity-60 dark:opacity-20 rounded-full bottom-[-50px] right-[-50px]"
        animate={{ scale: [1, 1.1, 1], rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div className="absolute w-48 h-48 bg-white opacity-10 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main Box */}
      <motion.div
        className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-md w-full backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-4xl font-bold text-center text-blue-600 dark:text-blue-300 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </motion.h2>

        <AnimatePresence mode="wait">
          {isRegister ? (
            <RegisterForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          ) : (
            <LoginForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}
        </AnimatePresence>

        <motion.p
          className="text-center text-sm text-gray-600 dark:text-gray-300 mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500 hover:text-blue-700 cursor-pointer font-semibold transition-colors duration-200"
          >
            {isRegister ? 'Login' : 'Register'}
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
