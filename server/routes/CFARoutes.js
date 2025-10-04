const express = require('express');
const { addFeedback } = require('../controller/CFA_Controller');
const router = express.Router();

router.post("/AddFeedback", addFeedback);

module.exports = router