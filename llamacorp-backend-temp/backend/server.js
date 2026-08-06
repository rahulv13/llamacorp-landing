const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const MONGO_URI = process.env.MONGO_URI || '';
if (!MONGO_URI) {
  console.warn('Skipping MongoDB connection: MONGO_URI is missing');
} else {
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('Successfully connected to MongoDB.');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/authors', require('./routes/authors'));
app.use('/api/pricing', require('./routes/pricing'));
app.use('/api/content', require('./routes/content'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/services', require('./routes/services'));

// Health Check
app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

// Basic Route
app.get('/', (req, res) => {
  res.send('llamacorp API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
