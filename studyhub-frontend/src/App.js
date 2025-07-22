import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import AdminPanel from './pages/admin/AdminPanel';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import LoginAdmin from './pages/admin/LoginAdmin';
import UsersAdmin from './pages/admin/UsersAdmin';
import FeedbackAdmin from './pages/admin/FeedbackAdmin';
import UpdateDocumentAdmin from './pages/admin/UpdateDocumentAdmin';
import AddDocumentAdmin from './pages/admin/AddDocumentAdmin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Login from './pages/Login';
import FeedbackForm from './pages/FeedbackForm';
import AdminSignup from './pages/admin/AdminSignUp';

function AppContent() {
  const location = useLocation();

  // Define admin routes where Navbar/Footer should be hidden
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          {/* Admin routes with nested layout */}
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<DashboardAdmin />} />
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="login" element={<LoginAdmin />} />
            <Route path="users" element={<UsersAdmin />} />
            <Route path="feedback" element={<FeedbackAdmin />} />
            <Route path="signup" element={<AdminSignup />} />
            <Route path="update" element={<UpdateDocumentAdmin />} />
            <Route path="add-document" element={<AddDocumentAdmin />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
