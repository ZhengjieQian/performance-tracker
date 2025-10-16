const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const Employee = require('../models/Employee');

// GET /api/departments - Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find({ isActive: true })
      .populate('manager', 'name email position')
      .sort({ name: 1 });
    
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/departments/:id - Get single department
router.get('/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('manager', 'name email position');
    
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/departments - Create new department
router.post('/', async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    
    res.status(201).json(department);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Department name already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// PUT /api/departments/:id - Update department
router.put('/:id', async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    
    res.json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/departments/:id - Delete department
router.delete('/:id', async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    
    res.json({ message: 'Department deactivated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/departments/:id/employees - Get employees in department
router.get('/:id/employees', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    
    const employees = await Employee.find({ 
      department: department.name,
      status: 'Active'
    })
    .populate('manager', 'name email position')
    .sort({ name: 1 });
    
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/departments/:id/metrics - Update department metrics
router.put('/:id/metrics', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    
    await department.updateMetrics();
    
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/departments/stats/overview - Get department statistics overview
router.get('/stats/overview', async (req, res) => {
  try {
    const departments = await Department.find({ isActive: true });
    const stats = [];
    
    for (const dept of departments) {
      await dept.updateMetrics();
      stats.push({
        _id: dept._id,
        name: dept.name,
        totalEmployees: dept.metrics.totalEmployees,
        averageRating: dept.metrics.averageRating,
        reviewsCompleted: dept.metrics.reviewsCompleted,
        lastUpdated: dept.metrics.lastUpdated
      });
    }
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
