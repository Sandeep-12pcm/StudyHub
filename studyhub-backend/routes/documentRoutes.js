const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Document = require('../models/Document');

// POST: Upload a document
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const newDoc = new Document({
      title: req.body.title,
      semester: req.body.semester,
      fileUrl: req.file.filename,
      branch: req.body.branch,
    });

    await newDoc.save();
    res.status(201).json({ message: 'Document uploaded successfully', document: newDoc });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ message: 'Error uploading document' });
  }
});
router.get('/', async (req, res) => {
  try {
    const docs = await Document.find(); // or use filters like `find({ type: 'notes' })`
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch documents' });
  }
});
// GET: List all documents
router.get('/', async (req, res) => {
  const docs = await Document.find().populate('uploadedBy');
  res.json(docs);
});
// DELETE /api/documents/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedDoc = await Document.findByIdAndDelete(req.params.id);
    if (!deletedDoc) return res.status(404).json({ message: 'Document not found' });
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Update a document by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, branch, semester } = req.body;

  try {
    const updated = await Document.findByIdAndUpdate(id, { title, branch, semester }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});


module.exports = router;
