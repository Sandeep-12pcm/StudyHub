const express = require('express');
const Branch = require('../models/Branch');
const router = express.Router();

// Add Branch
router.post('/', async (req, res) => {
  const branch = new Branch({ name: req.body.name });
  await branch.save();
  res.status(201).json(branch);
});

// Get All Branches
router.get('/', async (req, res) => {
  const branches = await Branch.find();
  res.json(branches);
});

module.exports = router;
