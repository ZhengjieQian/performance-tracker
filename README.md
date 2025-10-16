# Employee Performance Tracker

A modern React application for tracking and managing employee performance reviews and analytics.

## Features

- **Dashboard**: Overview of key metrics and recent activities
- **Performance Records**: Add, view, and manage employee performance reviews
- **Analytics**: Visual analytics and department performance insights
- **Employee Management**: Manage employee information and status

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── Sidebar.js          # Navigation sidebar
│   └── Sidebar.css
├── pages/
│   ├── Dashboard.js        # Main dashboard
│   ├── Dashboard.css
│   ├── PerformanceRecords.js  # Performance tracking
│   ├── PerformanceRecords.css
│   ├── Analytics.js        # Analytics and reports
│   ├── Analytics.css
│   ├── EmployeeManagement.js  # Employee directory
│   └── EmployeeManagement.css
├── App.js                  # Main app component with routing
├── App.css
├── index.js               # Entry point
└── index.css              # Global styles
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Technologies Used

- React 18
- React Router DOM
- CSS3 with modern features
- Responsive design

## Features Overview

### Dashboard
- Key performance metrics
- Recent activity feed
- Quick action buttons

### Performance Records
- Add new performance reviews
- View all performance records
- Filter and search capabilities
- Rating system (1-5 scale)

### Analytics
- Department performance comparison
- Monthly trends visualization
- Top performers recognition
- Summary statistics

### Employee Management
- Employee directory
- Add new employees
- Status management
- Review tracking

## Customization

The application is designed to be easily customizable:

- Modify colors in CSS files
- Add new pages by creating components in the `pages/` directory
- Extend the sidebar navigation in `Sidebar.js`
- Add new routes in `App.js`

## Browser Support

This application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
