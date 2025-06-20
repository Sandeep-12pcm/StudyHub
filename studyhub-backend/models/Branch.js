const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Branch', branchSchema);
