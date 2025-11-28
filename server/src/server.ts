import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Import route modules
import authRoutes from './routes/auth';
import announcementRoutes from './routes/announcements';
import quizRoutes from './routes/quizzes';
import { authenticateToken } from './middleware/auth';
import { Announcement, Quiz } from './models';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

// 🔍 DEBUG: Log every incoming request URL manually
app.use((req, res, next) => {
  console.log(`🔔 INCOMING: ${req.method} ${req.url}`);
  next();
});

// DB Connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ ERROR: MONGO_URI environment variable is required but not set.");
  process.exit(1);
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

// 2. Dashboard Data (Protected Route)
app.get('/api/dashboard', authenticateToken, async (req, res) => {
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

// 3. Mount route modules
app.use('/api/auth', authRoutes);
app.use('/api/announcements', authenticateToken, announcementRoutes);
app.use('/api/quizzes', authenticateToken, quizRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`👉 Test Dashboard: http://localhost:${PORT}/api/dashboard`);
});