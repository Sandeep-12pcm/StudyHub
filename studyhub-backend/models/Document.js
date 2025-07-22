const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  fileUrl: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verified: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema);
