const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: String,
  code: String,
  branchID: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  semesterID: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester' }
});

module.exports = mongoose.model('Subject', subjectSchema);
