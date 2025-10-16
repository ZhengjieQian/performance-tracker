const mongoose = require('mongoose');
const Employee = require('./models/Employee');
const PerformanceReview = require('./models/PerformanceReview');
const Department = require('./models/Department');

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/performance-tracker';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB for seeding');
  seedDatabase();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

async function seedDatabase() {
  try {
    // Clear existing data
    await Employee.deleteMany({});
    await PerformanceReview.deleteMany({});
    await Department.deleteMany({});
    
    console.log('🗑️  Cleared existing data');
    
    // Create departments
    const departments = [
      {
        name: 'Engineering',
        description: 'Software development and technical operations',
        budget: 500000,
        location: 'San Francisco'
      },
      {
        name: 'Marketing',
        description: 'Brand management and customer acquisition',
        budget: 200000,
        location: 'New York'
      },
      {
        name: 'Sales',
        description: 'Customer acquisition and revenue generation',
        budget: 300000,
        location: 'Chicago'
      },
      {
        name: 'HR',
        description: 'Human resources and talent management',
        budget: 150000,
        location: 'Austin'
      },
      {
        name: 'Finance',
        description: 'Financial planning and analysis',
        budget: 100000,
        location: 'Boston'
      }
    ];
    
    const createdDepartments = await Department.insertMany(departments);
    console.log('🏢 Created departments');
    
    // Create employees
    const employees = [
      {
        name: 'John Doe',
        email: 'john.doe@company.com',
        department: 'Engineering',
        position: 'Senior Developer',
        hireDate: new Date('2022-01-15'),
        status: 'Active',
        phone: '+1-555-0101'
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        department: 'Marketing',
        position: 'Marketing Manager',
        hireDate: new Date('2021-06-20'),
        status: 'Active',
        phone: '+1-555-0102'
      },
      {
        name: 'Mike Johnson',
        email: 'mike.johnson@company.com',
        department: 'Sales',
        position: 'Sales Representative',
        hireDate: new Date('2023-03-10'),
        status: 'Active',
        phone: '+1-555-0103'
      },
      {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        department: 'HR',
        position: 'HR Manager',
        hireDate: new Date('2020-09-05'),
        status: 'Active',
        phone: '+1-555-0104'
      },
      {
        name: 'David Brown',
        email: 'david.brown@company.com',
        department: 'Finance',
        position: 'Financial Analyst',
        hireDate: new Date('2022-11-12'),
        status: 'Active',
        phone: '+1-555-0105'
      }
    ];
    
    const createdEmployees = await Employee.insertMany(employees);
    console.log('👥 Created employees');
    
    // Create performance reviews
    const reviews = [
      {
        employee: createdEmployees[0]._id, // John Doe
        reviewer: createdEmployees[4]._id, // David Brown (as manager)
        reviewDate: new Date('2024-01-15'),
        reviewPeriod: {
          startDate: new Date('2023-10-01'),
          endDate: new Date('2023-12-31')
        },
        overallRating: 4.5,
        goals: [
          {
            description: 'Complete project milestones',
            status: 'Exceeded',
            weight: 100
          }
        ],
        achievements: 'Exceeded expectations in all areas',
        areasForImprovement: 'Continue mentoring junior developers',
        comments: {
          reviewer: 'Outstanding performance this quarter'
        },
        status: 'Completed'
      },
      {
        employee: createdEmployees[1]._id, // Jane Smith
        reviewer: createdEmployees[3]._id, // Sarah Wilson
        reviewDate: new Date('2024-01-10'),
        reviewPeriod: {
          startDate: new Date('2023-10-01'),
          endDate: new Date('2023-12-31')
        },
        overallRating: 4.0,
        goals: [
          {
            description: 'Increase brand awareness',
            status: 'Completed',
            weight: 100
          }
        ],
        achievements: 'Met all marketing targets',
        areasForImprovement: 'Focus on digital marketing strategies',
        comments: {
          reviewer: 'Strong performance in campaign management'
        },
        status: 'Completed'
      },
      {
        employee: createdEmployees[2]._id, // Mike Johnson
        reviewer: createdEmployees[1]._id, // Jane Smith
        reviewDate: new Date('2024-01-08'),
        reviewPeriod: {
          startDate: new Date('2023-10-01'),
          endDate: new Date('2023-12-31')
        },
        overallRating: 3.5,
        goals: [
          {
            description: 'Improve customer relations',
            status: 'In Progress',
            weight: 100
          }
        ],
        achievements: 'Good progress in sales targets',
        areasForImprovement: 'Enhance communication skills',
        comments: {
          reviewer: 'Shows potential, needs more experience'
        },
        status: 'Completed'
      }
    ];
    
    await PerformanceReview.insertMany(reviews);
    console.log('📊 Created performance reviews');
    
    // Update department metrics
    for (const dept of createdDepartments) {
      await dept.updateMetrics();
    }
    console.log('📈 Updated department metrics');
    
    console.log('🎉 Database seeded successfully!');
    console.log(`📊 Created ${createdDepartments.length} departments`);
    console.log(`👥 Created ${createdEmployees.length} employees`);
    console.log(`📝 Created ${reviews.length} performance reviews`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}
