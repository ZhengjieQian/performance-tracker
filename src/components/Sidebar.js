import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: '📊'
    },
    {
      path: '/records',
      label: 'Performance Records',
      icon: '📝'
    },
    {
      path: '/analytics',
      label: 'Analytics',
      icon: '📈'
    },
    {
      path: '/employees',
      label: 'Employee Management',
      icon: '👥'
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Performance Tracker</h2>
      </div>
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
