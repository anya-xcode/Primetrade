const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin routes
router.get('/users', adminController.getAllUsers);

module.exports = router;
