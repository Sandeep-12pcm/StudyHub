const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

router.post('/signup', adminController.signup);
router.post('/login', adminController.login);

// 🛡️ Protected route (Dashboard)
router.get('/dashboard', adminAuth, async (req, res) => {
  res.json({ message: `Welcome Admin ID: ${req.admin.id}` });
});

module.exports = router;
