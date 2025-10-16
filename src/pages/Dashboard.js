import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { title: 'Total Employees', value: '156', change: '+5%', positive: true },
    { title: 'Performance Reviews', value: '23', change: '+12%', positive: true },
    { title: 'Average Rating', value: '4.2', change: '+0.3', positive: true },
    { title: 'Pending Reviews', value: '8', change: '-2', positive: false }
  ];

  const recentActivities = [
    { id: 1, employee: 'John Doe', action: 'Performance Review Completed', time: '2 hours ago' },
    { id: 2, employee: 'Jane Smith', action: 'New Goal Set', time: '4 hours ago' },
    { id: 3, employee: 'Mike Johnson', action: 'Quarterly Review Scheduled', time: '1 day ago' },
    { id: 4, employee: 'Sarah Wilson', action: 'Performance Improvement Plan', time: '2 days ago' }
  ];

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <h3 className="stat-title">{stat.title}</h3>
              <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.change}
              </span>
            </div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="dashboard-section">
        <h2 className="section-title">Recent Activities</h2>
        <div className="activities-list">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-content">
                <div className="activity-employee">{activity.employee}</div>
                <div className="activity-action">{activity.action}</div>
              </div>
              <div className="activity-time">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions">
          <button className="btn">Add New Employee</button>
          <button className="btn btn-secondary">Schedule Review</button>
          <button className="btn btn-secondary">Generate Report</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
