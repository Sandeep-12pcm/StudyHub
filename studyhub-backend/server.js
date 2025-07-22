const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files
// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admins', require('./routes/adminRoutes'));
app.use('/api/branches', require('./routes/branchRoutes'));
app.use('/api/semesters', require('./routes/semesterRoutes'));
app.use('/api/subjects', require('./routes/subjectRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/api/feedbacks', require('./routes/feedbackRoutes'));
app.use('/api/admins', require('./routes/adminRoutes'));

app.get('/', (req, res) => {
  res.send('Welcome to StudyHub API');
});
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
