import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import schemeRoutes from './routes/schemeRoutes.js';
import eligibilityRoutes from './routes/eligibilityRoutes.js';
import copilotRoutes from './routes/copilotRoutes.js';

// Import seeder
import { seedDatabase, seedDemoUser } from './scripts/seedSchemes.js';
import Scheme from './models/Scheme.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security & Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Database Connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/govt-schemes';
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully to:', uri.split('@').pop() || uri);

    // Auto-seed schemes if database is empty
    const count = await Scheme.countDocuments();
    if (count === 0) {
      console.log('Database schemes empty. Auto-seeding 50+ verified schemes...');
      await seedDatabase();
    }

    // Auto-seed demo citizen for instant preview
    await seedDemoUser();
  } catch (error) {
    console.warn('⚠️ MongoDB connection warning (falling back to memory data layer):', error.message);
  }
};

// Initialize database
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/eligibility', eligibilityRoutes);
app.use('/api/copilot', copilotRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    platform: 'VYNORA Citizen Welfare Intelligence Platform',
    timestamp: new Date().toISOString(),
  });
});

// Centralized 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    code: 'ROUTE_NOT_FOUND',
    message: `API route ${req.originalUrl} not found.`,
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    code: err.code || 'INTERNAL_SERVER_ERROR',
    message: err.message || 'An internal error occurred. Please try again.',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 VYNORA API Server running at http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
});

export default app;
