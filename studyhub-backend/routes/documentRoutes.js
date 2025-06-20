const express = require('express');
const multer = require('multer');
const Document = require('../models/Document');
const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Upload Document
router.post('/upload', upload.single('file'), async (req, res) => {
  const doc = new Document({
    title: req.body.title,
    subjectID: req.body.subjectID,
    fileUrl: req.file.path,
    uploadedBy: req.body.uploadedBy
  });
  await doc.save();
  res.status(201).json(doc);
});

// Get All Verified Documents
router.get('/', async (req, res) => {
  const docs = await Document.find({ verified: true }).populate('subjectID uploadedBy');
  res.json(docs);
});

// Admin Verify Document
router.put('/:id/verify', async (req, res) => {
  const doc = await Document.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
  res.json(doc);
});

module.exports = router;
