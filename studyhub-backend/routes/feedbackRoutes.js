const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// Add Feedback
router.post('/', async (req, res) => {
  const feedback = new Feedback({
    userID: req.body.userID,
    subject: req.body.subject,
    message: req.body.message
  });
  await feedback.save();
  res.status(201).json(feedback);
});

// Get All Feedback
router.get('/', async (req, res) => {
  const feedbacks = await Feedback.find().populate('userID');
  res.json(feedbacks);
});

module.exports = router;
