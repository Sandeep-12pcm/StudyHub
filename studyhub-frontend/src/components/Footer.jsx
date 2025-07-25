import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { 
  Home, 
  MessageSquare, 
  LogIn, 
  MapPin, 
  Book,
  Heart,
} from 'lucide-react';

const Footer = () => {
  // Typewriter effect state
  const [typewriterText, setTypewriterText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    'Empowering Students Worldwide',
    'Building Future Leaders',
    'Innovation Meets Education',
    'Your Success, Our Mission'
  ];

  // Typewriter effect
  useEffect(() => {
    const handleType = () => {
      const current = loopNum % phrases.length;
      const fullText = phrases[current];

      setTypewriterText(
        isDeleting 
          ? fullText.substring(0, currentIndex - 1)
          : fullText.substring(0, currentIndex + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && currentIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }

      setCurrentIndex(isDeleting ? currentIndex - 1 : currentIndex + 1);
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, loopNum, typingSpeed, phrases]);

  // Counter animation state
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const targetNumbers = [2000, 150, 50, 95];

  // Counter animation effect
  useEffect(() => {
    const intervals = targetNumbers.map((target, index) => {
      return setInterval(() => {
        setCounters(prev => {
          const newCounters = [...prev];
          if (newCounters[index] < target) {
            newCounters[index] += Math.ceil(target / 100);
            if (newCounters[index] > target) newCounters[index] = target;
          }
          return newCounters;
        });
      }, 50);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <footer className="mt-auto w-full px-4 py-0 shadow-inner backdrop-blur-md 
      bg-gradient-to-br from-blue-300 via-white to-blue-400 text-gray-800 
      dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 dark:text-white 
      border-t border-blue-200 dark:border-slate-700">

      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-8 left-8 w-40 h-40 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 right-16 w-60 h-60 bg-gradient-to-r from-white via-blue-200 to-cyan-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-indigo-300 via-blue-400 to-cyan-400 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-16 right-1/3 w-28 h-28 bg-gradient-to-r from-purple-300 via-cyan-300 to-blue-400 rounded-full blur-2xl animate-pulse delay-700"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent overflow-hidden">
        <div className="h-full w-24 bg-gradient-to-r from-transparent via-white to-transparent animate-ping opacity-75"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-2">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-xl 
                            flex items-center justify-center shadow-xl animate-pulse">
                <Book className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-500  
                             bg-clip-text text-transparent font-poppins">
                  StudyHub
                </h2>
                <p className="text-blue-600 dark:text-cyan-300 text-xs">Learning Platform</p>
              </div>
            </div>
            
            <p className="text-cyan-800 dark:text-blue-100 mb-4 leading-relaxed text-base font-poppins">
              Empowering students with innovative learning solutions and collaborative study environments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full 
                            animate-pulse"></div>
              Quick Links
            </h3>
            
            <ul className="space-y-2">
              {[
                { icon: Home, text: 'Home', href: '/home', color: 'black' },
                { icon: MessageSquare, text: 'Feedback', href: '/feedback', color: 'black' },
                { icon: LogIn, text: 'Login/Register', href: '/login', color: 'black' },
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.href}
                     className="flex items-center gap-3 text-blue-600 dark:text-blue-200 p-2 rounded-xl">
                    <div className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center
                                   bg-gradient-to-r ${item.color}`}>
                      <item.icon className="w-4 h-4 text-blue-500 dark:text-white" />
                    </div>
                    <span className="font-medium text-base">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full 
                            animate-pulse"></div>
              Get in Touch
            </h3>
            
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl
                              border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/30 rounded-xl 
                                flex items-center justify-center mt-1 backdrop-blur-sm">
                    <MapPin className="w-5 h-5 text-purple-400 dark:text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-purple-700 dark:text-purple-300 text-xs font-semibold mb-1">Campus Location</p>
                    <p className="text-black-400 dark:text-white font-bold text-base mb-1">Campus</p>
                    <p className="text-gray-600 dark:text-blue-200 text-xs">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-300 pt-6 dark:border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-200 text-base">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-700 dark:text-red-400 animate-pulse" />
              <span>by</span>
              <span className="font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Team
              </span>
            </div>
            
            <p className="text-blue-600 dark:text-blue-200 text-base font-medium">
              © 2025 StudyHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent overflow-hidden">
        <div className="h-full w-24 bg-gradient-to-r from-transparent via-white to-transparent animate-ping opacity-75"></div>
      </div>
    </footer>
  );
};

export default Footer;