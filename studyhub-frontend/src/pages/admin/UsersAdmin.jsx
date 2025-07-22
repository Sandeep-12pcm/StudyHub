import React, { useState } from 'react';
import axios from '../../utils/axiosInstance';
import { useEffect } from 'react';
import { Users, Search, Mail, BookOpen, Calendar, User, Edit, Trash2 } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
    const { darkMode } = useOutletContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const totalUsers = users.length;
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const navigate = useNavigate();

    const filteredUsers = users.filter(user =>
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(user.year).toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedBranch ? user.branch === selectedBranch : true) &&
        (selectedYear ? user.year === selectedYear : true)
    );
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
        axios.get('/users')
            .then(res => {
                setUsers(res.data);
                console.log('users', res.data);
            })
            .catch(err => console.error('Error fetching users:', err));
    }, []);

    return (
        <div className={`min-h-screen p-6 font-['Poppins'] ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">User Management</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">Manage all registered users and their permissions</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Users', value: totalUsers, icon: <Users className="w-6 h-6 text-blue-600 dark:text-blue-600" />, color: 'bg-blue-100 dark:bg-blue-900/20' },
                ].map((stat, index) => (
                    <div key={index} className={`p-6 rounded-xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg ${stat.color}`}>{stat.icon}</div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">{stat.label}</h3>
                        </div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${darkMode
                            ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                    />
                </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Branch Filter */}
                <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className={`w-full sm:w-1/2 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${darkMode
                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                >
                    <option value="">All Branch</option>
                    {[...new Set(users.map(user => user.branch))].map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                    ))}
                </select>

                {/* Year Filter */}
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className={`w-full sm:w-1/2 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${darkMode
                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                >
                    <option value="">All Years</option>
                    {["1st", "2nd", "3rd", "4th"].map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>


            {/* Users Table */}
            <div className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                            <tr>
                                {['User', 'Branch', 'Year'].map((heading) => (
                                    <th
                                        key={heading}
                                        className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className={`${darkMode ? 'divide-gray-700' : 'divide-gray-200'} divide-y`}>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className={`${darkMode ? 'hover:bg-gray-700/40' : 'hover:bg-gray-100'} transition-colors`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                                <User className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium">{user.name}</div>
                                                <div className="text-sm flex items-center mt-1 text-gray-500 dark:text-gray-400">
                                                    <Mail className="w-3 h-3 mr-1" />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <BookOpen className="w-4 h-4 text-blue-500 mr-2" />
                                            <span className="text-sm font-medium">{user.branch}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 text-purple-500 mr-2" />
                                            <span className="text-sm font-medium">{user.year}</span>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                        <h3 className="text-lg font-medium mb-2 text-gray-600 dark:text-gray-400">No users found</h3>
                        <p className="text-sm text-gray-500">Try adjusting your search.</p>
                    </div>
                )}
            </div>

            {filteredUsers.length > 0 && (
                <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                    Showing {filteredUsers.length} of {totalUsers} users
                </div>
            )}
        </div>
    );
};

export default UsersPage;
