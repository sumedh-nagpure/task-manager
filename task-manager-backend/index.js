// task-manager-backend/index.js
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = 'mongodb://localhost:27017/task-manager-db/tasks'; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false // Set useFindAndModify to false to avoid deprecation warning
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/tasks', taskRouter); // Mount tasks routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
