import React, { useState } from 'react';
import {
    FileText,
    Edit3,
    Calendar,
    Layers,
    CheckCircle,
    X,
    Save,
    Search
} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateDocumentAdmin = () => {
    const { darkMode } = useOutletContext();
    const [documents, setDocuments] = useState([]);
    const [editDoc, setEditDoc] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleEditClick = (doc) => {
        setEditForm(doc);
        setEditDoc(doc._id);
    };

    const handleInputChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const res = await axios.put(`/documents/${editDoc}`, editForm);
            setDocuments(prev =>
                prev.map((doc) => (doc._id === res.data._id ? res.data : doc))
            );
            setEditDoc(null);
        } catch (err) {
            console.error('Failed to update document', err);
        }
    };
    const filteredDocs = documents.filter((doc) => {
        const matchesSearch =
            doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.branch.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });
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
        axios.get('/documents')
            .then(res => setDocuments(res.data))
            .catch(err => console.error('Failed to fetch docs:', err));
    }, []);
    return (
        <div className="space-y-6 font-['Poppins'] pt-6 pl-7">
            <div className="space-y-4 mb-6">
                {/* Heading */}
                <div className="mb-6">
                    <h2 className="text-3xl font-bold mb-3">Update Document</h2>
                    <p className="text-base text-gray-500 dark:text-gray-400 mb-6">
                        Update your document details quickly and easily!
                    </p>
                </div>

                {/* Search & Filter Row Below */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-1/2">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by title or branch..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none transition ${darkMode
                                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500'
                                }`}
                        />
                    </div>
                </div>
            </div>

            {/* Document Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDocs.map((doc) => (
                    <div
                        key={doc.id}
                        className={`p-6 rounded-xl shadow-lg relative transition-all duration-300 hover:shadow-xl space-y-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                            }`}
                    >
                        <div className="absolute top-3 right-3 cursor-pointer" onClick={() => handleEditClick(doc)}>
                            <Edit3 className="w-5 h-5 text-blue-500 hover:text-blue-600" />
                        </div>

                        <img
                            src={`https://via.placeholder.com/300x120?text=${doc.title.split(' ')[0]}`}
                            alt="Document"
                            className="w-full h-28 object-cover rounded-lg"
                        />

                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-500" />
                            {doc.title}
                        </h3>
                        <p className="flex items-center gap-2 text-sm">
                            <Layers className="w-4 h-4 text-purple-500" />
                            {doc.branch}
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-green-500" />
                            {doc.semester}
                        </p>

                    </div>
                ))}
            </div>

            {/* Edit Dialog */}
            {editDoc && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 ">
                    <div
                        className={`p-6 rounded-xl shadow-xl w-full max-w-md mx-4 space-y-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                            }`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold">Edit Document</h3>
                            <button onClick={() => setEditDoc(null)}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <input
                            name="title"
                            value={editForm.title || ''}
                            onChange={handleInputChange}
                            className={`w-full p-3 rounded-lg border ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900'
                                }`}
                            placeholder="Document Title . . ."
                        />

                        <select
                            name="branch"
                            value={editForm.branch || ''}
                            onChange={handleInputChange}
                            className={`w-full p-3 rounded-lg border ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                                }`}
                        >
                            <option value="">Select Branch</option>
                            <option value="Computer Eng">Computer Eng</option>
                            <option value="Mechanical Eng">Mechanical Eng</option>
                            <option value="Civil Eng">Civil Eng</option>
                            <option value="Electrical Eng">Electrical Eng</option>
                        </select>

                        <select
                            name="semester"
                            value={editForm.semester || ''}
                            onChange={handleInputChange}
                            className={`w-full p-3 rounded-lg border z-50 ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                                }`}
                        >
                            <option value="">Select Year</option>
                            <option value="1">1st</option>
                            <option value="2">2nd</option>
                            <option value="3">3rd</option>
                            <option value="4">4th</option>
                        </select>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setEditDoc(null)}
                                className={`px-4 py-2 rounded-lg ${darkMode
                                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                    }`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                            >
                                <Save size={16} /> Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateDocumentAdmin;
