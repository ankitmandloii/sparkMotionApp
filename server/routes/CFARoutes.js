const express = require('express');
const { addFeedback, getFeedbackData } = require('../controller/CFA_Controller');
const router = express.Router();

router.post("/AddFeedback", addFeedback);
router.get("/GetFeedbackData", getFeedbackData);

module.exports = router