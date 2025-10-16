# Employee Performance Tracker - Full Stack

A complete full-stack application for tracking employee performance with a React frontend, Node.js/Express backend, and MongoDB database.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas cloud)

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Database Setup

#### Option A: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Create `.env` file in `backend/` directory:
```env
MONGODB_URI=your-mongodb-connection-string-here
PORT=5000
NODE_ENV=development
```

**⚠️ Security Note**: Never commit real credentials to Git! Use environment variables.

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create `.env` file in `backend/` directory:
```env
MONGODB_URI=mongodb://localhost:27017/performance-tracker
PORT=5000
NODE_ENV=development
```

**⚠️ Security Note**: Use local MongoDB for development, cloud MongoDB for production.

### 3. Seed Database (Optional)
```bash
npm run seed
```

### 4. Start Both Frontend and Backend
```bash
npm start
```

This will start:
- **Backend API**: http://localhost:5000
- **Frontend**: http://localhost:3000

## 📁 Project Structure

```
performance-tracker/
├── src/                    # React frontend
│   ├── components/         # React components
│   │   ├── Sidebar.js      # Navigation sidebar
│   │   └── Chatbot.js      # RAG-powered chatbot
│   ├── pages/              # Page components
│   │   ├── Dashboard.js    # Main dashboard
│   │   ├── PerformanceRecords.js
│   │   ├── Analytics.js
│   │   └── EmployeeManagement.js
│   ├── services/           # API services
│   │   └── api.js          # API client
│   └── ...
├── backend/                # Node.js backend
│   ├── models/             # Database models
│   │   ├── Employee.js
│   │   ├── PerformanceReview.js
│   │   └── Department.js
│   ├── routes/             # API routes
│   │   ├── employees.js
│   │   ├── performance.js
│   │   └── departments.js
│   ├── server.js           # Main server file
│   └── seed.js             # Database seeding
└── README.md
```

## 🔧 Available Scripts

### Root Level
- `npm start` - Start both frontend and backend
- `npm run client` - Start only frontend
- `npm run server` - Start only backend
- `npm run install-all` - Install all dependencies
- `npm run seed` - Seed database with sample data

### Backend
- `cd backend && npm start` - Start production server
- `cd backend && npm run dev` - Start development server
- `cd backend && node seed.js` - Seed database

### Frontend
- `npm start` - Start React development server
- `npm build` - Build for production

## 🌟 Features

### Frontend (React)
- **Dashboard**: Performance metrics and recent activities
- **Employee Management**: CRUD operations for employees
- **Performance Records**: Track and manage performance reviews
- **Analytics**: Visual analytics and department insights
- **RAG Chatbot**: AI-powered assistant for employee queries
- **Responsive Design**: Works on desktop and mobile

### Backend (Node.js/Express)
- **RESTful API**: Complete CRUD operations
- **MongoDB Integration**: Persistent data storage
- **Data Validation**: Input validation and error handling
- **Pagination**: Efficient data loading
- **Search Functionality**: Text-based search
- **CORS Support**: Frontend integration

### Database (MongoDB)
- **Employee Model**: Personal and work information
- **Performance Review Model**: Ratings, goals, and achievements
- **Department Model**: Department metrics and management
- **Relationships**: Proper data relationships and references

## 🤖 RAG Chatbot Features

The chatbot can answer questions like:
- "Tell me about John Doe"
- "What's the performance of Engineering department?"
- "Show me employees in Marketing"
- "Who has the highest rating?"

## 📊 API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get single employee
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Performance Reviews
- `GET /api/performance` - Get all reviews
- `POST /api/performance` - Create review
- `GET /api/performance/stats/overview` - Get statistics

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/stats/overview` - Get department stats

## 🔒 Security Features

- CORS configuration
- Input validation
- Error handling
- Environment variables
- Helmet.js security headers

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Set environment variable: `REACT_APP_API_URL=https://your-backend-url.com/api`

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy the `backend` folder
3. Ensure MongoDB connection string is set

## 🛠️ Development

### Adding New Features
1. Create API routes in `backend/routes/`
2. Update frontend components in `src/pages/`
3. Add API calls in `src/services/api.js`
4. Update chatbot data sources if needed

### Database Changes
1. Update models in `backend/models/`
2. Create migration scripts if needed
3. Update seed data in `backend/seed.js`

## 📝 Environment Variables

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/performance-tracker
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

## 🐛 Troubleshooting

### Common Issues
1. **Backend not connecting**: Check MongoDB connection string
2. **CORS errors**: Verify CORS_ORIGIN setting
3. **API calls failing**: Ensure backend server is running
4. **Database empty**: Run `npm run seed` to populate data

### Debug Mode
- Backend logs: Check console output
- Frontend logs: Open browser DevTools
- Database logs: Check MongoDB logs

## 📈 Performance

- Pagination for large datasets
- Indexed database queries
- Optimized React components
- Efficient API responses

## 🔄 Data Flow

1. User interacts with React frontend
2. Frontend makes API calls to Express backend
3. Backend queries MongoDB database
4. Data flows back through API to frontend
5. Chatbot uses same API for RAG functionality

## 📚 Learning Resources

- [React Documentation](https://reactjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose ODM](https://mongoosejs.com/docs/guide.html)

---

**Happy coding! 🎉**