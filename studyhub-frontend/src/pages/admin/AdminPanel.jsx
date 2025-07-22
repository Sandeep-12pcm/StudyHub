import { Outlet, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axiosInstance';

import {
    Home,
    Users,
    Plus,
    Edit,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    Sun,
    Moon
} from 'lucide-react';

const AdminPanel = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [userCount] = useState(42);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboard');
    const navigate = useNavigate();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const res = await axios.get('/documents'); // adjust this path based on your backend route
                setDocuments(res.data); // assuming your backend returns an array of documents
                setLoading(false);
            } catch (err) {
                console.error("Error fetching documents:", err);
                setError("Failed to load documents.");
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);
    const handleLogOut = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const sidebarItems = [
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'add-document', label: 'Add Document', icon: Plus },
        { id: 'update', label: 'Update Document', icon: Edit },
        { id: 'feedback', label: 'Feedback Management', icon: MessageSquare }
    ];

    const handleSidebarClick = (id) => {
        setActiveSection(id);
        navigate(`/admin/${id}`);
    };

    return (
        <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors`}>
            {/* Sidebar */}
            <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} sticky border-r h-screen top-0 left-0 transition-all duration-300`}>
                <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                    {!sidebarCollapsed && <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Navigation</h2>}
                    <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
                        {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        {sidebarItems.map(({ id, label, icon: Icon }) => (
                            <li key={id}>
                                <button onClick={() => handleSidebarClick(id)}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${activeSection === id
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                                        : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                                        }`}> <Icon size={20} />
                                    {!sidebarCollapsed && <span className="font-medium truncate">{label}</span>}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                {/* Sidebar bottom text */}
                <div className="absolute bottom-4 left-0 w-full text-center px-4">
                    <button
                        onClick={handleLogOut}
                        className={`w-full mb-3 px-6 py-2 rounded-full shadow-md text-sm font-semibold tracking-wide transition-all duration-300 ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-500 hover:text-white' : 'bg-blue-500 text-white hover:bg-blue-200 hover:text-blue-600'}`}
                    >
                        Logout
                    </button>
                    <hr className={`mb-2 border-t ${darkMode ? 'border-gray-600' : 'border-gray-300'}`} />
                    <p className={`text-base font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Logged in as <span className="text-blue-500">Admin</span>
                    </p>
                </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} top-0 z-30 border-b shadow-sm relative`}>
                    <div className="flex justify-between items-center px-8 py-4">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text  text-transparent">Admin Panel</h1>
                            <span className="text-sm text-gray-500 capitalize">{activeSection.replace('-', ' ')}</span>
                        </div>
                        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600">
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>
                </div>

                {/* Outlet for nested pages */}
                <div className="flex-1 p-8">
                    <Outlet context={{
                        darkMode,
                        documents,
                        userCount,
                        setShowAddDialog,
                        setShowUpdateDialog
                    }} />
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
