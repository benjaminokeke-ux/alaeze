import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import socialRoutes from './routes/social.js';
import creatorRoutes from './routes/creator.js';
import analyticsRoutes from './routes/analytics.js';
import { setupSocketHandlers } from './services/socket.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/creator', creatorRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Alaeze API' });
});

// Socket.IO for Party Watch & Live Streams
setupSocketHandlers(io);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

async function start() {
  // Start the server first, then connect to DB
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Alaeze API running on port ${PORT}`);
  });

  // Connect to MongoDB if URI is provided (non-blocking)
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('Connected to MongoDB');
    } catch (err) {
      console.log('MongoDB connection failed:', err.message);
      console.log('Running with in-memory data store');
    }
  } else {
    console.log('No MONGODB_URI set, running with in-memory data store');
  }
}

start();
