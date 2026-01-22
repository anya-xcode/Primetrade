const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const prisma = require('./prisma/prisma');

// Load environment variables
dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL 
    ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
    : ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Test Prisma Connection
prisma.$connect()
  .then(() => console.log('Prisma Connected Successfully'))
  .catch((err) => console.error('Prisma Connection Error:', err));

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API', version: '1.0.0' });
});

// API v1 Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const taskRoutes = require('./routes/tasks');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Legacy routes (for backward compatibility)
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tasks', taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
