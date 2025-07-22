const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  number: Number,
  year: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Semester', semesterSchema);
