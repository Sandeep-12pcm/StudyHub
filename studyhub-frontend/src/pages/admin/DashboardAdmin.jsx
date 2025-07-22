import React, { useState, useEffect } from 'react';
import { Edit, Plus, FileText, Eye, Trash2 } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosInstance';

const DashboardAdmin = () => {
  const { darkMode } = useOutletContext();
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
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
    const fetchDocs = async () => {
      try {
        const res = await axios.get('/documents');
        setDocuments(res.data);
      } catch (err) {
        console.error('Failed to fetch documents:', err);
      }
    };

    fetchDocs();
  }, []);


  return (
    <>
      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/update')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg font-medium"
        >
          <Edit className="w-5 h-5" />
          Update Document
        </button>
        <button
          onClick={() => navigate('/admin/add-document')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Document
        </button>
      </div>

      {/* Documents Table */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg border overflow-hidden`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Documents & Feedback</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            Manage all documents and feedback forms
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-gray-750' : 'bg-gray-50'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <tr>
                <th className="text-left p-4 font-semibold">Document Title</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">{doc.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${doc.type === 'Form'
                      ? darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'
                      : doc.type === 'Document'
                        ? darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                        : darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                      }`}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {doc.lastUpdated}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;