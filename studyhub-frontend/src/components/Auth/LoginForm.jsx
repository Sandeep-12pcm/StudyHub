import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword  }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <motion.div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
          Username/Email
        </label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
          <input
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-blue-200 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </motion.div>

      <motion.div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
          Password
        </label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-blue-200 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </motion.div>

      <motion.button
        type="submit"
        className="w-full py-3 mt-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
      >
        Login
      </motion.button>
    </form>
  );
};

export default LoginForm;
