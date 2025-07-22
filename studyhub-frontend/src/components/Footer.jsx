import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { 
  Home, 
  MessageSquare, 
  LogIn, 
  Mail, 
  MapPin, 
  Book,
  Users,
  Award,
  Heart,
  Github,
  Globe,
  FileText,
  Shield,
  UserCheck,
  Sparkles,
  Code,
  Zap
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
    <footer className=" mt-auto w-full px-6 py-10 shadow-inner backdrop-blur-md transition-all duration-500 
  bg-gradient-to-br from-blue-300 via-white to-blue-400 text-gray-800 
  dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 dark:text-white 
  border-t border-blue-200 dark:border-slate-700">

      

      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-white via-blue-200 to-cyan-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-gradient-to-r from-indigo-300 via-blue-400 to-cyan-400 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-20 right-1/3 w-36 h-36 bg-gradient-to-r from-purple-300 via-cyan-300 to-blue-400 rounded-full blur-2xl animate-pulse delay-700"></div>
      </div>

      
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent overflow-hidden">
        <div className="h-full w-32 bg-gradient-to-r from-transparent via-white to-transparent animate-ping opacity-75"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        

        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-16">
          
          {/* Brand Section */}
          <div className="transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-2xl 
                            flex items-center justify-center shadow-2xl animate-pulse">
                <Book className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-500  
                             bg-clip-text text-transparent font-poppins">
                  IITRAM StudyHub
                </h2>
                <p className="text-blue-600 dark:text-cyan-300 text-sm">Learning Platform</p>
              </div>
            </div>
            
            <p className=" text-cyan-800 dark:text-blue-100 mb-8 leading-relaxed text-lg font-poppins">
              Empowering students with innovative learning solutions and collaborative study environments. 
              
            </p>
            
            <div className="flex gap-4">
              {[
                { icon: Github, label: 'GitHub', color: 'hover:from-orange-400 hover:to-yellow-500' },
                { icon: Globe, label: 'Website', color: 'hover:from-blue-500 hover:to-cyan-500' },
                { icon: FileText, label: 'Documentation', color: 'hover:from-green-500 hover:to-emerald-500' },
                { icon: UserCheck, label: 'Support', color: 'hover:from-purple-500 hover:to-pink-500' }
              ].map((item, index) => (
                <button
                  key={index}
                  title={item.label}
                  className={`w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center 
                           justify-center bg-gradient-to-r ${item.color} hover:scale-125 
                           transition-all duration-500 group shadow-lg hover:shadow-2xl
                           transform hover:rotate-12`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon className="w-6 h-6 group-hover:text-white transition-colors duration-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="transform hover:scale-105 transition-all duration-500">
            <h3 className="text-2xl font-bold mb-8 text-black   dark:text-white flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full 
                            animate-pulse"></div>
              Quick Links
            </h3>
            
            <ul className="space-y-4">
              {[
                { icon: Home, text: 'Home', href: '/home', color: 'hover:from-blue-500 hover:to-cyan-500' },
                { icon: MessageSquare, text: 'Feedback', href: '/feedback', color: 'hover:from-green-500 hover:to-emerald-500' },
                { icon: LogIn, text: 'Login/Register', href: '/login', color: 'hover:from-purple-500 hover:to-pink-500' },
                // { icon: Shield, text: 'Admin', href: '/admin', color: 'hover:from-red-500 hover:to-orange-500' }
              ].map((item, index) => (
                <li key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link to={item.href}
                     className="flex items-center gap-4 text-blue-600 hover:text-blue-600   dark:text-blue-200   dark:hover:text-white 
                              hover:translate-x-4 transition-all duration-500 group p-4 rounded-2xl
                              hover:bg-white/10 backdrop-blur-sm border border-transparent
                              hover:border-white/20 hover:shadow-lg">
                    <div className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center
                                   bg-gradient-to-r ${item.color} transition-all duration-500 group-hover:text-white
                                   group-hover:scale-110 group-hover:rotate-12`}>
                      <item.icon className="w-5 h-5 group-hover:text-blue-500 dark:group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <span className="font-semibold text-lg">{item.text}</span>
                      <div className="w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 
                                    group-hover:w-full transition-all duration-500"></div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="transform hover:scale-105 transition-all duration-500">
            <h3 className="text-2xl font-bold mb-8 text-black dark:text-white flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full 
                            animate-pulse"></div>
              Get in Touch
            </h3>
            
            <ul className="space-y-8">
              <li className="group">
                <div className="flex items-start gap-5 p-6 rounded-2xl bg-white/5 backdrop-blur-xl
                              border border-white/10 hover:bg-white/10 hover:border-white/30
                              transition-all duration-500 hover:scale-105 hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/30 rounded-2xl 
                                flex items-center justify-center mt-1 backdrop-blur-sm
                                group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <Mail className="w-6 h-6 text-cyan-400 dark:group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-cyan-600 dark:text-cyan-300 text-sm font-semibold mb-1">Email Address</p>
                    <p className="text-black-400 dark:text-white font-bold text-lg mb-2">info@iitram.ac.in</p>
                    <p className="text-gray-600  dark:text-blue-200 text-sm">
                      <span className="inline-flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        We'll respond within 24 hours
                      </span>
                    </p>
                  </div>
                </div>
              </li>
              
              <li className="group">
                <div className="flex items-start gap-5 p-6 rounded-2xl bg-white/5 backdrop-blur-xl
                              border border-white/10 hover:bg-white/10 hover:border-white/30
                              transition-all duration-500 hover:scale-105 hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/30 rounded-2xl 
                                flex items-center justify-center mt-1 backdrop-blur-sm
                                group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <MapPin className="w-6 h-6 text-purple-400 dark:group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-purple-700 dark:text-purple-300 text-sm font-semibold mb-1">Campus Location</p>
                    <p className="text-black-400 dark:text-white font-bold text-lg mb-2">IITRAM Campus</p>
                    <p className="text-gray-600 dark:text-blue-200 text-sm">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        
        {/* Bottom Section */}
        <div className="border-t border-blue-300 pt-10 dark:border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 text-blue-600 dark:text-blue-200 text-lg">
              <span>Made with</span>
              <Heart className="w-5 h-5 text-red-700 dark:text-red-400 animate-pulse" />
              <span>by</span>
              <span className="font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                IITRAM Team
              </span>
            </div>
            
            <p className="text-blue-600 dark:text-blue-200 text-lg font-medium">
              © 2025 IITRAM StudyHub. All rights reserved.
            </p>
            
            <div className="flex gap-8 text-lg">
              <a href="#" className="text-blue-600 hover:text-gray-600 dark:text-blue-200 dark:hover:text-white transition-all duration-300 
                                   hover:scale-110 relative group">
                Privacy Policy
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 
                               group-hover:w-full transition-all duration-300"></div>
              </a>
              <a href="#" className="text-blue-600 hover:text-gray-600 dark:text-blue-200 dark:hover:text-white transition-all duration-300 
                                   hover:scale-110 relative group">
                Terms of Service
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 
                               group-hover:w-full transition-all duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent overflow-hidden">
        <div className="h-full w-32 bg-gradient-to-r from-transparent via-white to-transparent animate-ping opacity-75"></div>
      </div>

    </footer>
  );
};

export default Footer;