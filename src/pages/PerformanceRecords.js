import React, { useState } from 'react';
import './PerformanceRecords.css';

const PerformanceRecords = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [records, setRecords] = useState([
    {
      id: 1,
      employeeName: 'John Doe',
      department: 'Engineering',
      rating: 4.5,
      reviewDate: '2024-01-15',
      goals: 'Complete project milestones',
      achievements: 'Exceeded expectations',
      status: 'Completed'
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      department: 'Marketing',
      rating: 4.0,
      reviewDate: '2024-01-10',
      goals: 'Increase brand awareness',
      achievements: 'Met all targets',
      status: 'Completed'
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      department: 'Sales',
      rating: 3.5,
      reviewDate: '2024-01-08',
      goals: 'Improve customer relations',
      achievements: 'Good progress',
      status: 'In Progress'
    }
  ]);

  const [newRecord, setNewRecord] = useState({
    employeeName: '',
    department: '',
    rating: '',
    reviewDate: '',
    goals: '',
    achievements: '',
    status: 'In Progress'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const record = {
      ...newRecord,
      id: records.length + 1,
      rating: parseFloat(newRecord.rating)
    };
    setRecords([...records, record]);
    setNewRecord({
      employeeName: '',
      department: '',
      rating: '',
      reviewDate: '',
      goals: '',
      achievements: '',
      status: 'In Progress'
    });
    setShowAddForm(false);
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'excellent';
    if (rating >= 4.0) return 'good';
    if (rating >= 3.0) return 'average';
    return 'needs-improvement';
  };

  return (
    <div className="performance-records">
      <div className="page-header">
        <h1 className="page-title">Performance Records</h1>
        <button 
          className="btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New Record'}
        </button>
      </div>

      {showAddForm && (
        <div className="card">
          <h2>Add Performance Record</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Employee Name</label>
                <input
                  type="text"
                  name="employeeName"
                  value={newRecord.employeeName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <select
                  name="department"
                  value={newRecord.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Rating (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  value={newRecord.rating}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                  step="0.1"
                  required
                />
              </div>
              <div className="form-group">
                <label>Review Date</label>
                <input
                  type="date"
                  name="reviewDate"
                  value={newRecord.reviewDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Goals</label>
              <textarea
                name="goals"
                value={newRecord.goals}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Achievements</label>
              <textarea
                name="achievements"
                value={newRecord.achievements}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn">Save Record</button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="records-table">
        <div className="table-header">
          <h2>Performance Records</h2>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Rating</th>
                <th>Review Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.employeeName}</td>
                  <td>{record.department}</td>
                  <td>
                    <span className={`rating ${getRatingColor(record.rating)}`}>
                      {record.rating}
                    </span>
                  </td>
                  <td>{record.reviewDate}</td>
                  <td>
                    <span className={`status ${record.status.toLowerCase().replace(' ', '-')}`}>
                      {record.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-small">View</button>
                    <button className="btn-small btn-secondary">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceRecords;
