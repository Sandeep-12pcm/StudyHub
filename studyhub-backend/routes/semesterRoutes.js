const express = require('express');
const Semester = require('../models/Semester');
const router = express.Router();

// Add Semester
router.post('/', async (req, res) => {
  const semester = new Semester({ number: req.body.number, year: req.body.year });
  await semester.save();
  res.status(201).json(semester);
});

// Get All Semesters
router.get('/', async (req, res) => {
  const semesters = await Semester.find();
  res.json(semesters);
});

module.exports = router;
