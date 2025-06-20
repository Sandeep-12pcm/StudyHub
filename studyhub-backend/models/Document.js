const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: String,
  subjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  fileUrl: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verified: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema);
