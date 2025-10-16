const mongoose = require('mongoose');

const performanceReviewSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  reviewDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  reviewPeriod: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  overallRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  goals: [{
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Not Started', 'In Progress', 'Completed', 'Exceeded'],
      default: 'Not Started'
    },
    weight: {
      type: Number,
      min: 0,
      max: 100,
      default: 100
    }
  }],
  achievements: {
    type: String,
    required: true
  },
  areasForImprovement: {
    type: String
  },
  comments: {
    employee: String,
    reviewer: String
  },
  status: {
    type: String,
    enum: ['Draft', 'In Progress', 'Completed', 'Archived'],
    default: 'Draft'
  },
  nextReviewDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
performanceReviewSchema.index({ employee: 1, reviewDate: -1 });
performanceReviewSchema.index({ reviewer: 1, reviewDate: -1 });

module.exports = mongoose.model('PerformanceReview', performanceReviewSchema);
