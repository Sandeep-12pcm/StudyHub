import React, { useState, useEffect } from 'react';
import { MessageSquare, Reply, Check, Clock, Search, Filter, Send, X, Eye } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const FeedbackAdmin = () => {
    const { darkMode } = useOutletContext();
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                alert('Please login as admin');
                return navigate('/admin/login');
            }
        };
        fetchDashboard();
    }, []);
    useEffect(() => {
        axios.get('/feedbacks')
            .then(res => {
                setFeedbacks(res.data);
            })
            .catch(err => {
                console.error('Error fetching feedbacks:', err);
            });

    }, []);

    const filteredFeedbacks = feedbacks.filter(feedback => {
        const matchesSearch =
            (feedback.userID.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
            (feedback.userID.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
            (feedback.subject?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
            (feedback.message?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
        return matchesSearch;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Feedback Management</h1>
                    <p className={`mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                        Manage and respond to user feedback!
                    </p>
                </div>
                {/* Filters */}
                {/* <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border mb-6`}> */}
                <div className="flex rounded-xl flex-wrap gap-4 items-center mb-8">
                    <div className="flex-1 min-w-64">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 opacity-90 text-blue-400" />
                            <input
                                type="text"
                                placeholder="Search feedback..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>
                    </div>
                </div>
                {/* Feedback List */}
                <div className={`rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border overflow-hidden`}>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredFeedbacks.map((feedback) => (
                            <div key={feedback._id} className={`p-6 hover:${darkMode ? 'bg-gray-750' : 'bg-gray-50'} transition-colors`}>
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold">{feedback.userID.name}</h3>
                                        </div>
                                        <p className="text-sm opacity-70">{feedback.userID.email}</p>
                                    </div>
                                    <div className="flex gap-2">

                                    </div>
                                </div>
                                <div className="mb-3">
                                    <h4 className="font-medium mb-1">{feedback.subject}</h4>
                                    <p className="text-sm opacity-80">{feedback.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default FeedbackAdmin;
