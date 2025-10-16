import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chatbot from './components/Chatbot';
import Dashboard from './pages/Dashboard';
import PerformanceRecords from './pages/PerformanceRecords';
import Analytics from './pages/Analytics';
import EmployeeManagement from './pages/EmployeeManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/records" element={<PerformanceRecords />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/employees" element={<EmployeeManagement />} />
          </Routes>
        </div>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
