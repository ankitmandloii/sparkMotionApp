const express = require('express');
const router = express.Router();
const analyticsController = require('../controller/analytics.routes');  // Import analytics controller
const { verifyToken } = require('../middleware/uservalidation/userValidation.js');
// Middleware to verify token
const analyticsValidation = require("../middleware/uservalidation/userValidation.js");

// Track click on SparkMotion URL
router.get('/events/:eventId', analyticsController.trackClick);
router.get('/getEventClickCount/:eventId', verifyToken, analyticsController.getEventClickCount);
router.get('/getClickAnalytics/:eventId', verifyToken, analyticsController.getClickAnalytics);
router.get('/getClickTimeline/:eventId', verifyToken, analyticsController.getClickTimeline);

module.exports = router;
