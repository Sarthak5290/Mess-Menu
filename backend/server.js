const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const menuRoutes = require('./routes/menuRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { protect } = require('./middleware/authMiddleware');
const cors = require('cors'); // Import CORS middleware

dotenv.config();
connectDB();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests

// Public access to menu routes
app.use('/api/menu', menuRoutes);   

// Admin routes with protection
app.use('/api/admin',  adminRoutes); 

// Global error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Set status code
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
