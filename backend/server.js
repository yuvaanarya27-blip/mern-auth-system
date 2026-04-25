require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const connectDB = require("./config/db");


// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: [
    "https://mern-auth-system-six.vercel.app",
    "https://mern-auth-system-git-main-yuvaanarya27-6746s-projects.vercel.app",
    /\.vercel\.app$/  // saare vercel URLs allow karo
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});