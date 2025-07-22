import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaCommentDots } from 'react-icons/fa';
import axios from '../utils/axiosInstance'; 

const FeedbackForm = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    description: '',
  });

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.reason || !formData.description) {
      alert('Please fill in both fields.');
      return;
    }
    const userID = localStorage.getItem('userID');
    if (!userID) {
      alert('Please login first.');
      return;
    }

    try {
      const response = await axios.post('/feedbacks', {
        userID: userID,
        subject: formData.reason,
        message: `${formData.reason.toUpperCase()}: ${formData.description}`
      });
      console.log('Feedback submitted:', response.data);
      alert('Feedback submitted successfully!');
      setFormData({ reason: '', description: '' });
    } catch (err) {
      console.error('Error submitting feedback:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.1 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0px 4px 15px rgba(59, 130, 246, 0.4)' },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-300 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12 font-poppins relative overflow-hidden">
      {/* Unique Background Effects */}
      <motion.div
        className="absolute w-64 h-64 bg-blue-200 dark:bg-blue-500 opacity-20 rounded-full top-10 left-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-48 h-48 bg-blue-100 dark:bg-blue-400 opacity-25 rounded-full bottom-20 right-20"
        animate={{ scale: [1, 1.15, 1], rotate: 180 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-96 h-96 border-2 border-blue-200 dark:border-blue-300 opacity-30 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl max-w-sm w-full backdrop-blur-md bg-opacity-95 dark:bg-opacity-95 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-2xl font-semibold text-center text-blue-600 dark:text-blue-300 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          Feedback
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence>
            <motion.div
              key="reason"
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Reason</label>
              <div className="relative">
                <FaLightbulb className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 text-sm" />
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-blue-200 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-300 appearance-none"
                  required
                >
                  <option value="">Choose a Reason</option>
                  <option value="bug">Report a Bug</option>
                  <option value="suggestion">Feature Suggestion</option>
                  <option value="content">Content Feedback</option>
                  <option value="usability">Usability Issues</option>
                  <option value="performance">Performance Concerns</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </motion.div>

            <motion.div
              key="description"
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Description</label>
              <div className="relative">
                <FaCommentDots className="absolute left-3 top-3 text-blue-500 text-sm" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Share your thoughts..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-blue-200 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-300"
                  required
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default FeedbackForm;