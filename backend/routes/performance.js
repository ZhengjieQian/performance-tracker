const express = require('express');
const router = express.Router();
const PerformanceReview = require('../models/PerformanceReview');
const Employee = require('../models/Employee');

// GET /api/performance - Get all performance reviews
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, employee, reviewer, status, startDate, endDate } = req.query;
    const query = {};
    
    if (employee) query.employee = employee;
    if (reviewer) query.reviewer = reviewer;
    if (status) query.status = status;
    if (startDate || endDate) {
      query.reviewDate = {};
      if (startDate) query.reviewDate.$gte = new Date(startDate);
      if (endDate) query.reviewDate.$lte = new Date(endDate);
    }
    
    const reviews = await PerformanceReview.find(query)
      .populate('employee', 'name email department position')
      .populate('reviewer', 'name email position')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ reviewDate: -1 });
    
    const total = await PerformanceReview.countDocuments(query);
    
    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/performance/:id - Get single performance review
router.get('/:id', async (req, res) => {
  try {
    const review = await PerformanceReview.findById(req.params.id)
      .populate('employee', 'name email department position')
      .populate('reviewer', 'name email position');
    
    if (!review) {
      return res.status(404).json({ error: 'Performance review not found' });
    }
    
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/performance - Create new performance review
router.post('/', async (req, res) => {
  try {
    const review = new PerformanceReview(req.body);
    await review.save();
    
    // Populate the response
    await review.populate('employee', 'name email department position');
    await review.populate('reviewer', 'name email position');
    
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/performance/:id - Update performance review
router.put('/:id', async (req, res) => {
  try {
    const review = await PerformanceReview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .populate('employee', 'name email department position')
    .populate('reviewer', 'name email position');
    
    if (!review) {
      return res.status(404).json({ error: 'Performance review not found' });
    }
    
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/performance/:id - Delete performance review
router.delete('/:id', async (req, res) => {
  try {
    const review = await PerformanceReview.findByIdAndDelete(req.params.id);
    
    if (!review) {
      return res.status(404).json({ error: 'Performance review not found' });
    }
    
    res.json({ message: 'Performance review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/performance/stats/overview - Get performance statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalReviews = await PerformanceReview.countDocuments();
    const completedReviews = await PerformanceReview.countDocuments({ status: 'Completed' });
    const pendingReviews = await PerformanceReview.countDocuments({ status: 'In Progress' });
    
    // Calculate average rating
    const avgRatingResult = await PerformanceReview.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: null, avgRating: { $avg: '$overallRating' } } }
    ]);
    
    const averageRating = avgRatingResult.length > 0 ? avgRatingResult[0].avgRating : 0;
    
    // Get rating distribution
    const ratingDistribution = await PerformanceReview.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: '$overallRating', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      totalReviews,
      completedReviews,
      pendingReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/performance/stats/department - Get department performance stats
router.get('/stats/department', async (req, res) => {
  try {
    const departmentStats = await PerformanceReview.aggregate([
      {
        $lookup: {
          from: 'employees',
          localField: 'employee',
          foreignField: '_id',
          as: 'employeeData'
        }
      },
      { $unwind: '$employeeData' },
      {
        $group: {
          _id: '$employeeData.department',
          totalReviews: { $sum: 1 },
          averageRating: { $avg: '$overallRating' },
          employees: { $addToSet: '$employee' }
        }
      },
      {
        $project: {
          department: '$_id',
          totalReviews: 1,
          averageRating: { $round: ['$averageRating', 1] },
          employeeCount: { $size: '$employees' }
        }
      },
      { $sort: { averageRating: -1 } }
    ]);
    
    res.json(departmentStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
