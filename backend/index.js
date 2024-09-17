const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const clinicRoutes = require('./router/clinicRouter');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

// Routes
app.use('/api/clinics', clinicRoutes);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});