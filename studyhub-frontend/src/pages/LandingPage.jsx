import React, { use } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBookOpen, FaUsers, FaStar, FaLinkedin, FaGithub, FaArrowRight, FaComment } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LandingPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  });

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, staggerChildren: 0.1 } },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const teamVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-poppins overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 to-blue-300 dark:from-gray-900 dark:to-gray-800 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden h-[50vh] min-h-[400px] flex items-center">
        {/* Floating Shapes */}
        <motion.div
          className="absolute top-4 left-4 w-20 sm:w-24 h-20 sm:h-24 bg-blue-400 rounded-full opacity-20"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-4 right-4 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500 rounded-full opacity-15"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="max-w-4xl mx-auto pt-8 sm:pt-10"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white dark:text-gray-100 leading-tight">
            Excel with <span className="text-blue-200 dark:text-blue-400"> StudyHub</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-100 dark:text-gray-300 max-w-md sm:max-w-lg md:max-w-xl mx-auto mb-6">
            Access premium study resources, past papers, and notes for academic excellence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link to="/login">
              <motion.button
                className="bg-white text-blue-600 px-5 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-blue-100 transition shadow-md w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaArrowRight size={14} />
                Start Now
              </motion.button>
            </Link>
            <Link to="/feedback">
              <motion.button
                className="bg-transparent border-2 border-white text-white px-5 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-blue-600 hover:border-blue-600 transition w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaComment size={14} />
                Feedback
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <motion.div
          className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="lg:w-1/2">
            <motion.img
              src="https://images.squarespace-cdn.com/content/v1/589dfd233e00be383d4cdc4f/1624437402845-VAZRWO5VI4GIU3KS0V2B/top-six.jpg"
              alt="Study Resources"
              className="rounded-2xl shadow-lg w-full h-48 sm:h-56 lg:h-64 object-cover"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            />
          </div>
          <div className="lg:w-1/2">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              About  StudyHub
            </motion.h2>
            <motion.p
              className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
               StudyHub offers a seamless platform with high-quality study materials, including past exam papers and detailed notes, tailored to your academic goals.
            </motion.p>
            <motion.p
              className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mt-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Organize your studies, collaborate with peers, and elevate your learning with our intuitive tools.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            Our Achievements
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Empowering students globally with top-tier resources.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={statVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-gray-50 dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={statItemVariants}
            >
              <FaBookOpen className="text-3xl sm:text-4xl text-blue-500 mb-3 mx-auto" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">20,000+ Resources</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">Comprehensive study materials.</p>
            </motion.div>
            <motion.div
              className="bg-gray-50 dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={statItemVariants}
            >
              <FaUsers className="text-3xl sm:text-4xl text-blue-500 mb-3 mx-auto" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">100,000+ Students</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">A thriving global community.</p>
            </motion.div>
            <motion.div
              className="bg-gray-50 dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={statItemVariants}
            >
              <FaStar className="text-3xl sm:text-4xl text-blue-500 mb-3 mx-auto" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">4.9/5 Rating</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">Trusted by our users.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            Our Team
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Meet the team driving  StudyHub's success.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Pushti Dobariya',
                role: 'Frontend Developer',
                img: './contributors/pushti-dobariya.jpg',
                linkedin: 'https://www.linkedin.com/in/pushti-dobariya-614b33347/',
                github: 'https://github.com/Pushti1992',
              },
              // {
              //   name: 'Deeksha',
              //   role: 'Frontend Developer',
              //   img: 'https://avatars.githubusercontent.com/u/187792563?v=4',
              //   linkedin: 'https://linkedin.com/in/',
              //   github: 'https://github.com/Deeksha627',
              // },
              {
                name: 'Sandeep',
                role: 'Backend Developer',
                img: './contributors/sandeep.jpg',
                linkedin: 'https://linkedin.com/in/sandeep12pcm',
                github: 'https://github.com/Sandeep-12pcm',
              },
              {
                name: 'Anshul Singhal',
                role: 'Backend Developer',
                img: './contributors/anshul-singhal.jpg',
                linkedin: 'https://www.linkedin.com/in/anshul-singhal-114908321/',
                github: 'https://github.com/anshulsinghal974',
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                variants={teamVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                />
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">{member.role}</p>
                <div className="flex justify-center gap-3">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                      <FaLinkedin className="text-xl text-blue-600 hover:text-blue-800" />
                    </motion.div>
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                      <FaGithub className="text-xl text-gray-800 dark:text-gray-200 hover:text-blue-600" />
                    </motion.div>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;