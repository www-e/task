import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Announcement, Quiz } from './models';

dotenv.config();

const seedData = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || '';
    if (!mongoURI) throw new Error("MONGO_URI is missing");

    await mongoose.connect(mongoURI);
    console.log('🌱 Connected to Atlas. Clearing old data...');

    // 1. Clear existing data
    await Announcement.deleteMany({});
    await Quiz.deleteMany({});

    // 2. Insert Announcements (From Image)
    await Announcement.create([
      {
        author: "Mr. Ahmed Mostafa",
        subject: "Math 101",
        content: "Hi my heroes! I just want you ready for our exams. Good luck my warriors! 😄",
        avatarUrl: "https://i.pravatar.cc/150?u=ahmed"
      },
      {
        author: "Mrs. Salma Ahmed",
        subject: "Physics 02",
        content: "Hello students, the next quiz will be within 3 days covering Unit 2. Study hard!",
        avatarUrl: "https://i.pravatar.cc/150?u=salma"
      },
      {
        author: "School Management",
        subject: "Management",
        content: "Good morning Warriors! The get-ready-for-the-day call is heard each morning.",
        avatarUrl: "https://i.pravatar.cc/150?u=school"
      }
    ]);

    // 3. Insert Quizzes (From Image)
    await Quiz.create([
      {
        title: "Unit 2 quiz",
        course: "Physics 02",
        topic: "Unit2: Motion and forces",
        dueDate: new Date("2025-12-20T09:00:00"),
        type: 'quiz',
        isCompleted: false
      },
      {
        title: "12-12 Assignment",
        course: "Arabic K12",
        topic: "الوحدة الثانية - الافعال",
        dueDate: new Date("2025-12-20T21:00:00"),
        type: 'assignment',
        isCompleted: false
      }
    ]);

    console.log('✅ Atlas Database Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedData();