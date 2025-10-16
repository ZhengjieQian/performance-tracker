import React, { useState } from 'react';
import './EmployeeManagement.css';

const EmployeeManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      hireDate: '2022-01-15',
      status: 'Active',
      lastReview: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      hireDate: '2021-06-20',
      status: 'Active',
      lastReview: '2024-01-10'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      department: 'Sales',
      position: 'Sales Representative',
      hireDate: '2023-03-10',
      status: 'Active',
      lastReview: '2024-01-08'
    }
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    hireDate: '',
    status: 'Active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employee = {
      ...newEmployee,
      id: employees.length + 1,
      lastReview: 'Not reviewed'
    };
    setEmployees([...employees, employee]);
    setNewEmployee({
      name: '',
      email: '',
      department: '',
      position: '',
      hireDate: '',
      status: 'Active'
    });
    setShowAddForm(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, status: newStatus } : emp
    ));
  };

  return (
    <div className="employee-management">
      <div className="page-header">
        <h1 className="page-title">Employee Management</h1>
        <button 
          className="btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New Employee'}
        </button>
      </div>

      {showAddForm && (
        <div className="card">
          <h2>Add New Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <select
                  name="department"
                  value={newEmployee.department}
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
              <div className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  name="position"
                  value={newEmployee.position}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Hire Date</label>
                <input
                  type="date"
                  name="hireDate"
                  value={newEmployee.hireDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={newEmployee.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn">Add Employee</button>
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

      {/* Employee Stats */}
      <div className="employee-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">{employees.length}</div>
            <div className="stat-label">Total Employees</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{employees.filter(emp => emp.status === 'Active').length}</div>
            <div className="stat-label">Active</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{employees.filter(emp => emp.lastReview !== 'Not reviewed').length}</div>
            <div className="stat-label">Reviewed</div>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="employees-table">
        <div className="table-header">
          <h2>Employee Directory</h2>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Hire Date</th>
                <th>Status</th>
                <th>Last Review</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-name">
                      <div className="name">{employee.name}</div>
                    </div>
                  </td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>{employee.hireDate}</td>
                  <td>
                    <select
                      value={employee.status}
                      onChange={(e) => handleStatusChange(employee.id, e.target.value)}
                      className={`status-select ${employee.status.toLowerCase().replace(' ', '-')}`}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </td>
                  <td>
                    <span className={`review-status ${employee.lastReview === 'Not reviewed' ? 'pending' : 'completed'}`}>
                      {employee.lastReview}
                    </span>
                  </td>
                  <td>
                    <button className="btn-small">View</button>
                    <button className="btn-small btn-secondary">Edit</button>
                    <button className="btn-small">Review</button>
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

export default EmployeeManagement;
