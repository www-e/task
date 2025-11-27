import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { Announcement, Quiz } from './models';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Standard logging

// 🔍 DEBUG: Log every incoming request URL manually
app.use((req, res, next) => {
  console.log(`🔔 INCOMING: ${req.method} ${req.url}`);
  next();
});

// DB Connection
const mongoURI = process.env.MONGO_URI || '';
if (!mongoURI) {
  console.error("❌ MONGO_URI missing");
} else {
  mongoose.connect(mongoURI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ DB Error:', err));
}

// --- ROUTES ---

// 1. Health Check
app.get('/', (req, res) => {
  res.send('API Root is working');
});

// 2. Dashboard Data
app.get('/api/dashboard', async (req, res) => {
  console.log('📂 Accessing Dashboard Data...');
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    const quizzes = await Quiz.find().sort({ dueDate: 1 });
    
    console.log(`✅ Returning ${announcements.length} announcements, ${quizzes.length} quizzes`);
    res.json({ announcements, quizzes });
  } catch (error) {
    console.error('❌ Error fetching dashboard:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// 3. Login
app.post('/api/login', (req, res) => {
  console.log('🔑 Login Attempt');
  res.json({
    user: { id: "u_1", name: "Talia", role: "Student", avatar: "https://i.pravatar.cc/150?u=talia" },
    token: "mock-token"
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`👉 Test Dashboard: http://localhost:${PORT}/api/dashboard`);
});