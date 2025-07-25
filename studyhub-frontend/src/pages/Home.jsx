import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, BookOpen, Calendar, Users, FileText, Sun, Moon } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [materials, setMaterials] = useState([]);
  const navigate  = useNavigate();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);
  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Not Logged In, Please log In first');
        return navigate('/login');
      }
    };
    fetchDashboard();
  }, []);
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch('https://studyhub-9yiy.onrender.com/api/documents');
        const data = await response.json();
        setMaterials(data);  // set fetched data
        console.log(data)
      } catch (error) {
        console.error('Failed to fetch study materials:', error);
      }
    };

    fetchMaterials();
  }, []);


  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material?.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject;
    const matchesBranch = selectedBranch === 'all' || material.branch === selectedBranch;
    const matchesSemester = selectedSemester === 'all' || material.semester === selectedSemester;
    return matchesSearch && matchesSubject && matchesBranch && matchesSemester;
  });

  const subjects = [...new Set(materials.map(m => m.subject))];
  const branches = [...new Set(materials.map(m => m.branch))];
  const semesters = [...new Set(materials.map(m => m.semester))];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen transition-all duration-700 font-poppins relative overflow-hidden dark:bg-gray-900 bg-gray-100">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 animate-pulse ${darkMode ? 'bg-blue-600' : 'bg-blue-300'
          }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 animate-bounce ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'
          }`} style={{ animationDuration: '3s' }}></div>
        <div className={`absolute top-1/3 left-1/4 w-32 h-32 rounded-full opacity-5 animate-ping ${darkMode ? 'bg-blue-400' : 'bg-blue-400'
          }`} style={{ animationDuration: '4s' }}></div>
      </div>
      <motion.div
        className="absolute w-64 h-64 bg-blue-300 dark:bg-blue-500 opacity-20 rounded-full top-10 left-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-48 h-48 bg-blue-300 dark:bg-blue-200 opacity-25 rounded-full bottom-20 right-20"
        animate={{ scale: [1, 1.15, 1], rotate: 180 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-96 h-96 border-2 border-blue-200 dark:border-blue-300 opacity-30 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />


      {/* Dark Mode Toggle */}
      {/* <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full transition-all duration-500 transform hover:scale-110 hover:rotate-12 ${
            darkMode 
              ? 'bg-yellow-500 text-yellow-900 shadow-lg shadow-yellow-500/25' 
              : 'bg-slate-800 text-yellow-400 shadow-lg shadow-slate-800/25'
          }`}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">

        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black-500 dark:text-gray-100 leading-tight">
            Welcome to <span className="text-blue-600 dark:text-blue-400">StudyHub</span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Discover and download comprehensive study materials for all engineering subjects
          </p>
        </div>

        {/* Filters Section */}
        <div className={`mb-8 p-8 rounded-3xl border-2 backdrop-blur-xl transition-all duration-500 transform hover:scale-[1.01] hover:shadow-xl hover:ring-2 hover:ring-blue-500/40 ${darkMode
          ? 'bg-slate-800/30 border-blue-800/50 shadow-blue-700/20 hover:shadow-blue-500/30 hover:ring-2 hover:ring-blue-500/40 hover:scale-[1.01]'
          : 'bg-white/70 border-blue-300/30 shadow-blue-400/20 hover:shadow-blue-500/30 hover:ring-2 hover:ring-blue-400/40 hover:scale-[1.01]'
          }`}>

          <div className="flex items-center space-x-3 mb-6">
            <div className={`p-2 rounded-xl ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
              <Filter className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold dark:text-blue-600">Filter Materials</h2>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search Bar */}
            <div className="relative group">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 border-blue-200${darkMode ? 'text-gray-400 group-focus-within:text-blue-400' : 'text-gray-400 group-focus-within:text-blue-500'
                }`} />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:scale-105  ${darkMode
                  ? 'bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20'
                  : 'bg-white/90 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
              />
            </div>

            {/* Subject Filter */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className={`px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:scale-105 ${darkMode
                ? 'bg-slate-700/50 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400/20'
                : 'bg-white/90 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            {/* Branch Filter */}
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className={`px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:scale-105 ${darkMode
                ? 'bg-slate-700/50 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400/20'
                : 'bg-white/90 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
            >
              <option value="all">All Branches</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>

            {/* Semester Filter */}
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className={`px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:scale-105 ${darkMode
                ? 'bg-slate-700/50 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400/20'
                : 'bg-white/90 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
            >
              <option value="all">All Semesters</option>
              {semesters.map(semester => (
                <option key={semester} value={semester}>{semester} Semester</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className={`inline-flex items-center px-6 py-3 rounded-full ${darkMode ? 'bg-slate-800/60 text-gray-300' : 'bg-white/80 text-gray-600'
            } backdrop-blur-sm border ${darkMode ? 'border-slate-700' : 'border-blue-200'
            }`}>
            <span className="font-medium">
              Showing {filteredMaterials.length} of {materials.length} study materials
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMaterials.map((material, index) => (
            <div
              key={material._id}
              className={`group rounded-3xl shadow-xl backdrop-blur-xl transition-all duration-700 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:ring-2 ${darkMode
                ? 'bg-slate-800/40 border border-slate-700/40 text-white hover:ring-blue-500/30'
                : 'bg-white/90 border border-blue-200/50 text-gray-800 hover:ring-blue-500/20'
                }`}
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-t-3xl">
                <div className={`w-full h-52 flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${darkMode
                  ? 'bg-gradient-to-br from-slate-700 to-slate-600'
                  : 'bg-gradient-to-br from-blue-100 to-indigo-200'
                  }`}>
                  <FileText className={`h-20 w-20 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${darkMode ? 'bg-blue-600/80 text-blue-100' : 'bg-blue-500/80 text-white'}`}>
                  {material.branch}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-blue-500 transition-colors duration-300">
                  {material.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-600/20' : 'bg-blue-100'}`}>
                      <BookOpen className="h-4 w-4 text-blue-500" />
                    </div>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {material.subject}
                      {/* {material.branch} */}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-green-600/20' : 'bg-green-100'}`}>
                      <Users className="h-4 w-4 text-green-500" />
                    </div>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {material.branch} Department
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-purple-600/20' : 'bg-purple-100'}`}>
                      <Calendar className="h-4 w-4 text-purple-500" />
                    </div>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {material.semester} Semester
                    </span>
                  </div>

                  <div className={`text-xs px-4 py-2 rounded-full inline-block ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>
                    Updated: {new Date(material.timestamp).toLocaleDateString()}
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => window.open(`https://studyhub-9yiy.onrender.com/uploads/${material.fileUrl}`, '_blank')}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 group-hover:scale-105"
                >
                  <Download className="h-5 w-5 transition-transform duration-300 group-hover:animate-bounce" />
                  <span>Download Material</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMaterials.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${darkMode ? 'bg-slate-800' : 'bg-gray-100'
              }`}>
              <Search className={`h-12 w-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              No study materials found
            </h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'} max-w-md mx-auto`}>
              Try adjusting your filters or search terms to find relevant materials
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;