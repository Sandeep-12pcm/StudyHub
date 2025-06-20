const express = require('express');
const Subject = require('../models/Subject');
const router = express.Router();

// Add Subject
router.post('/', async (req, res) => {
  const { name, code, branchID, semesterID } = req.body;
  const subject = new Subject({ name, code, branchID, semesterID });
  await subject.save();
  res.status(201).json(subject);
});

// Get All Subjects
router.get('/', async (req, res) => {
  const subjects = await Subject.find().populate('branchID semesterID');
  res.json(subjects);
});

module.exports = router;
