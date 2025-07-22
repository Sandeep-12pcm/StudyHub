const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', adminSchema);
