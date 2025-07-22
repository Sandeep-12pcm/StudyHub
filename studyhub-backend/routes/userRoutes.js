const express = require('express');
const { signup, login } = require('../controllers/authController');
const User = require('../models/User');

const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});
module.exports = router;
