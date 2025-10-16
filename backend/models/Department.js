const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    default: null
  },
  budget: {
    type: Number,
    min: 0
  },
  location: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metrics: {
    totalEmployees: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    reviewsCompleted: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

// Method to update department metrics
departmentSchema.methods.updateMetrics = async function() {
  const Employee = mongoose.model('Employee');
  const PerformanceReview = mongoose.model('PerformanceReview');
  
  // Count employees in this department
  const employeeCount = await Employee.countDocuments({ 
    department: this.name, 
    status: 'Active' 
  });
  
  // Get average rating from recent reviews
  const recentReviews = await PerformanceReview.find({
    employee: { $in: await Employee.find({ department: this.name }).select('_id') },
    reviewDate: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) } // Last year
  });
  
  const avgRating = recentReviews.length > 0 
    ? recentReviews.reduce((sum, review) => sum + review.overallRating, 0) / recentReviews.length 
    : 0;
  
  this.metrics = {
    totalEmployees: employeeCount,
    averageRating: Math.round(avgRating * 10) / 10,
    reviewsCompleted: recentReviews.length,
    lastUpdated: new Date()
  };
  
  return this.save();
};

module.exports = mongoose.model('Department', departmentSchema);
