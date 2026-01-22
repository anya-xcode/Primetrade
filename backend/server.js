const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const prisma = require('./prisma/prisma');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// MongoDB Connection (Mongoose - optional, you can use Prisma instead)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sem4project';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully (Mongoose)'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Test Prisma Connection
prisma.$connect()
  .then(() => console.log('✅ Prisma Connected Successfully'))
  .catch((err) => console.error('❌ Prisma Connection Error:', err));

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
// Add your routes here
// Example: app.use('/api/users', require('./routes/users'));

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  await mongoose.connection.close();
  process.exit(0);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
