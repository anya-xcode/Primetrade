const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

// All admin routes require authentication and admin role
router.use(authMiddleware);
router.use(isAdmin);

// Admin routes
router.get('/users', adminController.getAllUsers);

module.exports = router;
