import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { Announcement, Quiz } from './models';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // MUST be 5000 to match Frontend

// Middleware
app.use(cors()); // Allows Next.js (port 3000) to access this
app.use(express.json());
app.use(morgan('dev')); // Logs requests to console

// MongoDB Atlas Connection
const mongoURI = process.env.MONGO_URI || '';

if (!mongoURI) {
  console.error('❌ FATAL: MONGO_URI is missing in .env');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ DB Connection Error:', err));

// --- API ROUTES ---

// 1. Dashboard Data Endpoint
app.get('/api/dashboard', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    const quizzes = await Quiz.find().sort({ dueDate: 1 });
    res.json({ announcements, quizzes });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// 2. Mock Login Endpoint
app.post('/api/login', (req, res) => {
  res.json({
    user: {
      id: "u_1",
      name: "Talia", // The name from the image
      role: "Student",
      avatar: "https://i.pravatar.cc/150?u=talia"
    },
    token: "mock-token-xyz"
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});