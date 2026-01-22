const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

// All task routes require authentication
router.use(authMiddleware);

// CRUD routes for tasks
router.post('/', taskController.createTask);           // Create task
router.get('/', taskController.getTasks);              // Get all user's tasks
router.get('/:id', taskController.getTaskById);        // Get single task
router.put('/:id', taskController.updateTask);         // Update task
router.delete('/:id', taskController.deleteTask);      // Delete task

// Admin route - get all tasks from all users
router.get('/admin/all', isAdmin, taskController.getAllTasks);

module.exports = router;
