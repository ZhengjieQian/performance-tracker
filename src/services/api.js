import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Employee API
export const employeeAPI = {
  // Get all employees with pagination and filters
  getEmployees: (params = {}) => api.get('/employees', { params }),
  
  // Get single employee
  getEmployee: (id) => api.get(`/employees/${id}`),
  
  // Create new employee
  createEmployee: (data) => api.post('/employees', data),
  
  // Update employee
  updateEmployee: (id, data) => api.put(`/employees/${id}`, data),
  
  // Delete employee
  deleteEmployee: (id) => api.delete(`/employees/${id}`),
  
  // Get employee performance history
  getEmployeePerformance: (id) => api.get(`/employees/${id}/performance`),
};

// Performance Review API
export const performanceAPI = {
  // Get all performance reviews
  getReviews: (params = {}) => api.get('/performance', { params }),
  
  // Get single review
  getReview: (id) => api.get(`/performance/${id}`),
  
  // Create new review
  createReview: (data) => api.post('/performance', data),
  
  // Update review
  updateReview: (id, data) => api.put(`/performance/${id}`, data),
  
  // Delete review
  deleteReview: (id) => api.delete(`/performance/${id}`),
  
  // Get performance statistics
  getStats: () => api.get('/performance/stats/overview'),
  
  // Get department performance stats
  getDepartmentStats: () => api.get('/performance/stats/department'),
};

// Department API
export const departmentAPI = {
  // Get all departments
  getDepartments: () => api.get('/departments'),
  
  // Get single department
  getDepartment: (id) => api.get(`/departments/${id}`),
  
  // Create new department
  createDepartment: (data) => api.post('/departments', data),
  
  // Update department
  updateDepartment: (id, data) => api.put(`/departments/${id}`, data),
  
  // Delete department
  deleteDepartment: (id) => api.delete(`/departments/${id}`),
  
  // Get employees in department
  getDepartmentEmployees: (id) => api.get(`/departments/${id}/employees`),
  
  // Update department metrics
  updateDepartmentMetrics: (id) => api.put(`/departments/${id}/metrics`),
  
  // Get department statistics
  getDepartmentStats: () => api.get('/departments/stats/overview'),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;
