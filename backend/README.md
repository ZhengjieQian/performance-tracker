# Performance Tracker Backend

A Node.js/Express backend API for the Employee Performance Tracker application.

## Features

- **RESTful API** for employee management
- **Performance Review System** with ratings and goals
- **Department Management** with metrics
- **MongoDB Integration** with Mongoose ODM
- **Data Validation** and error handling
- **Pagination** and search functionality

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup

#### Option A: MongoDB Atlas (Recommended - Cloud Database)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update the `MONGODB_URI` in your environment variables

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use default connection string: `mongodb://localhost:27017/performance-tracker`

### 3. Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/performance-tracker
```

### 4. Start the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

### 5. Seed the Database (Optional)
```bash
node seed.js
```

## API Endpoints

### Employees
- `GET /api/employees` - Get all employees (with pagination)
- `GET /api/employees/:id` - Get single employee
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/employees/:id/performance` - Get employee performance history

### Performance Reviews
- `GET /api/performance` - Get all performance reviews
- `GET /api/performance/:id` - Get single review
- `POST /api/performance` - Create new review
- `PUT /api/performance/:id` - Update review
- `DELETE /api/performance/:id` - Delete review
- `GET /api/performance/stats/overview` - Get performance statistics
- `GET /api/performance/stats/department` - Get department performance stats

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get single department
- `POST /api/departments` - Create new department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department
- `GET /api/departments/:id/employees` - Get employees in department
- `PUT /api/departments/:id/metrics` - Update department metrics
- `GET /api/departments/stats/overview` - Get department statistics

### Health Check
- `GET /api/health` - Server health status

## Database Models

### Employee
- Personal information (name, email, phone, address)
- Work details (department, position, hire date, status)
- Manager relationship
- Timestamps

### PerformanceReview
- Employee and reviewer references
- Review period and date
- Overall rating (1-5)
- Goals with status tracking
- Achievements and improvement areas
- Comments from employee and reviewer
- Review status

### Department
- Department information (name, description, location)
- Manager assignment
- Budget information
- Metrics (employee count, average rating, reviews completed)
- Active status

## Development

### Project Structure
```
backend/
├── models/           # Database models
├── routes/           # API routes
├── config/           # Configuration files
├── server.js         # Main server file
├── seed.js           # Database seeding script
└── package.json      # Dependencies and scripts
```

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `node seed.js` - Seed database with sample data

## Integration with Frontend

The backend provides RESTful APIs that the React frontend can consume. Update your frontend to make HTTP requests to:
- `http://localhost:5000/api/employees`
- `http://localhost:5000/api/performance`
- `http://localhost:5000/api/departments`

## Security Features

- CORS enabled for frontend integration
- Helmet.js for security headers
- Input validation and sanitization
- Error handling middleware
- Environment variable configuration

## Next Steps

1. Set up MongoDB Atlas account
2. Configure environment variables
3. Start the backend server
4. Update frontend to use API endpoints
5. Test the full-stack application
