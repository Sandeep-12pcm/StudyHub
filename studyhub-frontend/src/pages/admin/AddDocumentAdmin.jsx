
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axiosInstance';
import {
    FileText,
    Layers,
    Calendar,
    Plus,
    X,
    CheckCircle,
    Save,
    Trash2
} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AddDocumentAdmin = () => {
    const { darkMode } = useOutletContext();
    const [newDoc, setNewDoc] = useState({ title: '', branch: '', semester: '', date: '' });
    const [file, setFile] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !newDoc.title) return alert('Title and file are required');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', newDoc.title);
        formData.append('semester', newDoc.semester);
        formData.append('branch', newDoc.branch);

        try {
            const res = await axios.post('/documents', formData);
            alert('Uploaded!');
            console.log(res.data);
            setShowAddDialog(false);

        } catch (err) {
            console.error('Upload failed', err);
        }
    };
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

    const confirmAdd = () => {
        setDocuments([...documents, { ...newDoc, id: Date.now() }]);
        setShowAddDialog(false);
        setShowConfirmDialog(false);
        setNewDoc({ title: '', branch: '', semester: '' });
    };
    const handleDelete = (id) => setShowConfirmDelete(id);

    // When user confirms deletion
    const confirmDelete = async () => {
        try {
            await axios.delete(`/documents/${showConfirmDelete}`); // API call
            setDocuments(prev => prev.filter(doc => doc._id !== showConfirmDelete)); // Remove from UI
            setShowConfirmDelete(null);
        } catch (err) {
            console.error('Delete failed:', err);
            alert('Failed to delete document');
        }
    };

    return (
        <div className={`space-y-6  font-['Poppins'] ${darkMode ? 'text-white' : 'text-gray-900'} pt-6 pl-7`}>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-3">Add Documents</h2>
                    <p className="text-gray-500 text-base mt-1 mb-3">Total Documents: {documents.length}</p>
                </div>
                <button
                    onClick={() => setShowAddDialog(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus size={18} /> Add Document
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                    <div
                        key={doc._id}
                        className={`relative p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl space-y-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                            }`}
                    >
                        {/* Delete button */}
                        <div className="absolute top-3 right-3 cursor-pointer">
                            <button onClick={() => handleDelete(doc._id)}>
                                <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600" />
                            </button>
                        </div>
                        <img
                            src={
                                doc.title
                                    ? `https://via.placeholder.com/300x120?text=${encodeURIComponent(doc.title.split(' ')[0])}`
                                    : 'https://via.placeholder.com/300x120?text=😍'
                            }
                            alt="Document"
                            className="w-full h-28 object-cover rounded-lg"
                        />

                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-500" />
                            {doc.title}
                        </h3>

                        <p className="flex items-center gap-3 text-sm">
                            <Layers className="w-4 h-4 text-purple-500" />
                            <span className="font-medium ">{doc.branch}</span>
                        </p>

                        <p className="flex items-center gap-3 text-sm">
                            <Calendar className="w-4 h-4 text-green-500" />
                            <span className="font-medium">{doc.semester}</span>
                        </p>
                    </div>
                ))}
            </div>

            {/* Add Document Dialog */}
            {showAddDialog && (
                <form onSubmit={handleSubmit}>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className={`p-6 rounded-xl shadow-xl w-full max-w-md mx-4 space-y-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold">New Document</h3>
                                <button onClick={() => setShowAddDialog(false)}><X className="w-5 h-5" /></button>
                            </div>
                            <input
                                name="title"
                                value={newDoc.title}
                                onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                                className={`w-full p-3 rounded-lg border ${darkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-black placeholder-gray-500'
                                    }`}
                                placeholder="Document Title"
                            />
                            <select
                                name="branch"
                                value={newDoc.branch}
                                onChange={(e) => setNewDoc({ ...newDoc, branch: e.target.value })}
                                className={`w-full p-3 rounded-lg border ${darkMode
                                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                                    : 'border-gray-300 bg-white text-black placeholder-gray-500'}`}
                            >
                                <option value="">Select Branch</option>
                                <option value="Computer Eng">Computer Eng</option>
                                <option value="Mechanical Eng">Mechanical Eng</option>
                                <option value="Electrical Eng">Electrical Eng</option>
                                <option value="Civil Eng">Civil Eng</option>
                            </select>

                            <select
                                name="semester"
                                value={newDoc.semester}
                                onChange={(e) => setNewDoc({ ...newDoc, semester: e.target.value })}
                                className={`w-full p-3 mt-4 rounded-lg border ${darkMode
                                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                                    : 'border-gray-300 bg-white text-black placeholder-gray-500'}`}
                            >
                                <option value="">Select Semester</option>
                                <option value="1st">1st</option>
                                <option value="2nd">2nd</option>
                                <option value="3rd">3rd</option>
                                <option value="4th">4th</option>
                                <option value="5th">5th</option>
                                <option value="6th">6th</option>
                                <option value="7th">7th</option>
                                <option value="8th">8th</option>
                            </select>
                            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                            <div className="flex justify-end gap-3">
                                <button onClick={() => setShowAddDialog(false)} className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400">Cancel</button>
                                <button type='submit' className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
                            </div>
                        </div>
                    </div>
                </form>
            )}

            {/* Confirmation Dialog */}
            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`p-6 rounded-xl shadow-xl w-full max-w-sm mx-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                        <h3 className="text-lg font-semibold mb-4">Confirm Addition</h3>
                        <p className="text-sm mb-6">Are you sure you want to add this document?</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowConfirmDialog(false)} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cancel</button>
                            <button onClick={confirmAdd} className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete Dialog */}
            {showConfirmDelete !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`p-6 rounded-xl shadow-xl w-full max-w-sm mx-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p className="text-sm mb-6">Are you sure you want to delete this document?</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowConfirmDelete(null)} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cancel</button>
                            <button onClick={confirmDelete} className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AddDocumentAdmin;