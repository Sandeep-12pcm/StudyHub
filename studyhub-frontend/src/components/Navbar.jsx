import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, User, MessageSquare, Home, LogIn, LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState('/');
  const [scrolled, setScrolled] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    const checkLogin = () => {
      const user = localStorage.getItem("user");
      if (user) {
        setIsLoggedIn(true);
        setActiveItem('Home');
      }
      else setIsLoggedIn(false);
      setActiveItem('/');
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', checkLogin);
    checkLogin();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkLogin);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const navItems = [
    { name: 'Home', icon: Home, link: isLoggedIn ? '/home' : '/' },
    { name: 'Feedback', icon: MessageSquare, link: '/feedback' },
    ...(isLoggedIn
      ? [
        { name: 'Admin', icon: User, link: '/admin' },
        { name: 'Logout', icon: LogOut, action: () => handleLogout() },
      ]
      : [
        { name: 'Login', icon: LogIn, link: '/login' },
      ]),
  ];

  useEffect(() => {
    const activeIndex = navItems.findIndex((item) => item.name === activeItem);
    const activeButton = navRefs.current[activeIndex];
    if (activeButton) {
      setPillStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [activeItem, navItems]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    setIsLoggedIn(false);
    setActiveItem('Home');
    navigate("/login");
  };

  const pillVariants = {
    initial: { scale: 0.95, opacity: 0.7 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const mobileMenuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-0.5rem)] sm:w-[calc(100%-1rem)] max-w-6xl px-2 sm:px-3 font-poppins">
      <motion.div
        className={`transition-all duration-300 rounded-full mx-auto w-full max-w-[90rem] ${scrolled
          ? 'bg-white/85 dark:bg-gray-800/85 backdrop-blur-lg shadow-md border border-blue-100/20'
          : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-sm border border-white/10'
          }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Mobile Header */}
        <div className="flex lg:hidden items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5">
          <motion.div
            className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 truncate max-w-[60%]"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
          >
             StudyHub
          </motion.div>
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-600 dark:text-gray-300 p-1"
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-4/5 max-w-[280px] bg-gradient-to-br from-blue-50/90 to-white/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-md shadow-lg z-50 p-4 rounded-l-xl border-l border-blue-100/30 dark:border-gray-700/30"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-between items-center mb-5">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Menu</span>
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-600 dark:text-gray-300 p-1.5 rounded-full hover:bg-blue-200/50 dark:hover:bg-gray-700/50"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => {
                        setActiveItem(item.name);
                        setMobileMenuOpen(false);
                        if (item.action) item.action();
                        else navigate(item.link);
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-100/70 dark:hover:bg-blue-600/20 text-sm"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>{item.name}</span>
                    </motion.button>
                  );
                })}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border-t border-gray-200/50 dark:border-gray-700/50 pt-3">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Theme</span>
                <motion.button
                  onClick={toggleDarkMode}
                  className="p-1.5 rounded-full hover:bg-blue-200/50 dark:hover:bg-gray-700/50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {darkMode ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between px-4 sm:px-5 py-2 sm:py-2.5 relative">
          {/* Logo */}
          <motion.div
            className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
          >
             StudyHub
          </motion.div>

          {/* Navigation Items */}
          <div className="relative flex items-center space-x-1 sm:space-x-2 mx-auto">
            <motion.div
              className="absolute h-6 sm:h-7 bg-blue-600/80 dark:bg-blue-500/80 rounded-full z-0"
              style={{ left: pillStyle.left, width: pillStyle.width }}
              variants={pillVariants}
              initial="initial"
              animate="animate"
            />
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  ref={(el) => (navRefs.current[index] = el)}
                  onClick={() => {
                    setActiveItem(item.name);
                    if (item.action) item.action();
                    else navigate(item.link);
                  }}
                  className={`relative z-10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${activeItem === item.name
                    ? 'text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                >
                  <Icon
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${activeItem === item.name ? 'text-white' : 'text-blue-600 dark:text-blue-400'
                      }`}
                  />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className="p-1 sm:p-1.5 rounded-full hover:bg-blue-200/50 dark:hover:bg-gray-700/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />}
          </motion.button>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;