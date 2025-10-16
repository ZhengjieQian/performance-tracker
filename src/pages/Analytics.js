import React from 'react';
import './Analytics.css';

const Analytics = () => {
  const departmentStats = [
    { department: 'Engineering', employees: 45, avgRating: 4.3, reviews: 12 },
    { department: 'Marketing', employees: 28, avgRating: 4.1, reviews: 8 },
    { department: 'Sales', employees: 35, avgRating: 3.9, reviews: 15 },
    { department: 'HR', employees: 12, avgRating: 4.2, reviews: 3 },
    { department: 'Finance', employees: 18, avgRating: 4.0, reviews: 6 }
  ];

  const monthlyTrends = [
    { month: 'Jan', reviews: 8, avgRating: 4.1 },
    { month: 'Feb', reviews: 12, avgRating: 4.2 },
    { month: 'Mar', reviews: 15, avgRating: 4.0 },
    { month: 'Apr', reviews: 18, avgRating: 4.3 },
    { month: 'May', reviews: 14, avgRating: 4.1 },
    { month: 'Jun', reviews: 20, avgRating: 4.2 }
  ];

  const topPerformers = [
    { name: 'John Doe', department: 'Engineering', rating: 4.8, achievements: 'Led major project' },
    { name: 'Jane Smith', department: 'Marketing', rating: 4.7, achievements: 'Exceeded targets' },
    { name: 'Mike Johnson', department: 'Sales', rating: 4.6, achievements: 'Top sales performer' },
    { name: 'Sarah Wilson', department: 'HR', rating: 4.5, achievements: 'Process improvement' }
  ];

  return (
    <div className="analytics">
      <h1 className="page-title">Analytics</h1>

      {/* Department Performance */}
      <div className="analytics-section">
        <h2 className="section-title">Department Performance</h2>
        <div className="department-stats">
          {departmentStats.map((dept, index) => (
            <div key={index} className="dept-card">
              <div className="dept-header">
                <h3>{dept.department}</h3>
                <span className="employee-count">{dept.employees} employees</span>
              </div>
              <div className="dept-metrics">
                <div className="metric">
                  <span className="metric-label">Avg Rating</span>
                  <span className="metric-value">{dept.avgRating}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Reviews</span>
                  <span className="metric-value">{dept.reviews}</span>
                </div>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(dept.avgRating / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="analytics-section">
        <h2 className="section-title">Monthly Trends</h2>
        <div className="trends-chart">
          <div className="chart-header">
            <div className="chart-title">Reviews & Average Rating</div>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-color reviews"></span>
                Reviews
              </span>
              <span className="legend-item">
                <span className="legend-color rating"></span>
                Avg Rating
              </span>
            </div>
          </div>
          <div className="chart-bars">
            {monthlyTrends.map((month, index) => (
              <div key={index} className="chart-bar">
                <div className="bar-container">
                  <div 
                    className="bar reviews-bar"
                    style={{ height: `${(month.reviews / 20) * 100}%` }}
                  ></div>
                  <div 
                    className="bar rating-bar"
                    style={{ height: `${(month.avgRating / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="bar-label">{month.month}</div>
                <div className="bar-values">
                  <div className="bar-value">{month.reviews}</div>
                  <div className="bar-value">{month.avgRating}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="analytics-section">
        <h2 className="section-title">Top Performers</h2>
        <div className="performers-list">
          {topPerformers.map((performer, index) => (
            <div key={index} className="performer-card">
              <div className="performer-rank">#{index + 1}</div>
              <div className="performer-info">
                <div className="performer-name">{performer.name}</div>
                <div className="performer-dept">{performer.department}</div>
                <div className="performer-achievement">{performer.achievements}</div>
              </div>
              <div className="performer-rating">
                <span className="rating-value">{performer.rating}</span>
                <span className="rating-label">Rating</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="analytics-section">
        <h2 className="section-title">Summary Statistics</h2>
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon">📊</div>
            <div className="summary-content">
              <div className="summary-value">156</div>
              <div className="summary-label">Total Employees</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">⭐</div>
            <div className="summary-content">
              <div className="summary-value">4.1</div>
              <div className="summary-label">Overall Rating</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">📈</div>
            <div className="summary-content">
              <div className="summary-value">87</div>
              <div className="summary-label">Reviews Completed</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">🎯</div>
            <div className="summary-content">
              <div className="summary-value">92%</div>
              <div className="summary-label">Goal Achievement</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
