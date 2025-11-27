import mongoose from 'mongoose';

// 1. Announcement Schema (Matches "Mr. Ahmed Mostafa" posts)
const AnnouncementSchema = new mongoose.Schema({
  author: { type: String, required: true },
  subject: { type: String, required: true },
  avatarUrl: { type: String, default: "" },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 2. Quiz Schema (Matches "Unit 2 quiz" cards)
const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: String, required: true },
  topic: { type: String, required: true },
  dueDate: { type: Date, required: true },
  type: { type: String, enum: ['quiz', 'assignment'], default: 'quiz' },
  isCompleted: { type: Boolean, default: false }
});

export const Announcement = mongoose.model('Announcement', AnnouncementSchema);
export const Quiz = mongoose.model('Quiz', QuizSchema);