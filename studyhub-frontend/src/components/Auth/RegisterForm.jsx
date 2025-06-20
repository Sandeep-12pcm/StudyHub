import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaCodeBranch, FaGraduationCap, FaEye, FaEyeSlash } from 'react-icons/fa';

const inputVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: '0px 4px 20px rgba(59, 130, 246, 0.5)' },
  tap: { scale: 0.95 },
};

const RegisterForm = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword }) => {
  return (
    
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Username */}
      <motion.div variants={inputVariants} initial="hidden" animate="visible">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Username</label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-blue-200 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            required
          />
        </div>
      </motion.div>

      {/* Email */}
      <motion.div variants={inputVariants} initial="hidden" animate="visible">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Email</label>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-blue-200 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            required
          />
        </div>
      </motion.div>

      {/* Password */}
      <motion.div variants={inputVariants} initial="hidden" animate="visible">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Password</label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-blue-200 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </motion.div>

      {/* Branch */}
      <motion.div variants={inputVariants} initial="hidden" animate="visible">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Branch</label>
        <div className="relative">
          <FaCodeBranch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-blue-200 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none"
            required
          >
            <option value="">Select Branch</option>
            <option value="Computer Eng">Computer Eng</option>
            <option value="Mechanical Eng">Mechanical Eng</option>
            <option value="Civil Eng">Civil Eng</option>
            <option value="Electrical Eng">Electrical Eng</option>
          </select>
        </div>
      </motion.div>

      {/* Year */}
      <motion.div variants={inputVariants} initial="hidden" animate="visible">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Year</label>
        <div className="relative">
          <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-blue-200 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none"
            required
          >
            <option value="">Select Year</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        className="w-full py-3 mt-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Register
      </motion.button>
    </form>

  );
};

export default RegisterForm;
