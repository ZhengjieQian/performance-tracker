import React, { useState, useEffect } from 'react';
import { employeeAPI } from '../services/api';
import './EmployeeManagement.css';

const EmployeeManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    hireDate: '',
    status: 'Active',
    phone: ''
  });

  // Load employees on component mount
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getEmployees();
      setEmployees(response.employees || []);
      setError(null);
    } catch (err) {
      setError('Failed to load employees. Please check if the backend server is running.');
      console.error('Error loading employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await employeeAPI.createEmployee(newEmployee);
      setNewEmployee({
        name: '',
        email: '',
        department: '',
        position: '',
        hireDate: '',
        status: 'Active',
        phone: ''
      });
      setShowAddForm(false);
      loadEmployees(); // Reload the list
    } catch (err) {
      setError('Failed to create employee. Please try again.');
      console.error('Error creating employee:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await employeeAPI.updateEmployee(id, { status: newStatus });
      loadEmployees(); // Reload the list
    } catch (err) {
      setError('Failed to update employee status. Please try again.');
      console.error('Error updating employee:', err);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.deleteEmployee(id);
        loadEmployees(); // Reload the list
      } catch (err) {
        setError('Failed to delete employee. Please try again.');
        console.error('Error deleting employee:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="employee-management">
        <div className="loading">Loading employees...</div>
      </div>
    );
  }

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

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

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
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={newEmployee.phone}
                  onChange={handleInputChange}
                />
              </div>
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
            <div className="stat-value">{employees.filter(emp => emp.lastReview && emp.lastReview !== 'Not reviewed').length}</div>
            <div className="stat-label">Reviewed</div>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="employees-table">
        <div className="table-header">
          <h2>Employee Directory</h2>
          <button onClick={loadEmployees} className="btn btn-secondary">Refresh</button>
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
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>
                    <div className="employee-name">
                      <div className="name">{employee.name}</div>
                    </div>
                  </td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>{new Date(employee.hireDate).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={employee.status}
                      onChange={(e) => handleStatusChange(employee._id, e.target.value)}
                      className={`status-select ${employee.status.toLowerCase().replace(' ', '-')}`}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </td>
                  <td>{employee.phone || 'N/A'}</td>
                  <td>
                    <button className="btn-small">View</button>
                    <button className="btn-small btn-secondary">Edit</button>
                    <button 
                      className="btn-small btn-danger"
                      onClick={() => handleDeleteEmployee(employee._id)}
                    >
                      Delete
                    </button>
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