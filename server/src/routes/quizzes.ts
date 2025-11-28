import { Router, Request, Response } from 'express';
import { Quiz } from '../models';

const router = Router();

// Get all quizzes (for dashboard)
router.get('/', async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find().sort({ dueDate: 1 });
    res.json(quizzes);
  } catch (error) {
    console.error('❌ Error fetching quizzes:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Create quiz
router.post('/', async (req: Request, res: Response) => {
  console.log('📝 Creating Quiz...');
  try {
    const { title, course, topic, dueDate, type, isCompleted } = req.body;
    
    if (!title || !course || !topic || !dueDate) {
      return res.status(400).json({ error: 'Title, course, topic, and dueDate are required' });
    }

    const quiz = new Quiz({
      title,
      course,
      topic,
      dueDate: new Date(dueDate),
      type: type || 'quiz',
      isCompleted: isCompleted || false
    });

    await quiz.save();
    console.log('✅ Quiz created:', quiz._id);
    res.status(201).json(quiz);
  } catch (error) {
    console.error('❌ Error creating quiz:', error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
});

// Update quiz
router.put('/:id', async (req: Request, res: Response) => {
  console.log('📝 Updating Quiz...');
  try {
    const { id } = req.params;
    const { title, course, topic, dueDate, type, isCompleted } = req.body;
    
    const quiz = await Quiz.findByIdAndUpdate(
      id,
      { 
        title, 
        course, 
        topic, 
        dueDate: dueDate ? new Date(dueDate) : undefined, 
        type, 
        isCompleted 
      },
      { new: true, runValidators: true }
    );

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    console.log('✅ Quiz updated:', id);
    res.json(quiz);
  } catch (error) {
    console.error('❌ Error updating quiz:', error);
    res.status(500).json({ error: 'Failed to update quiz' });
  }
});

// Delete quiz
router.delete('/:id', async (req: Request, res: Response) => {
  console.log('📝 Deleting Quiz...');
  try {
    const { id } = req.params;
    
    const quiz = await Quiz.findByIdAndDelete(id);
    
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    console.log('✅ Quiz deleted:', id);
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting quiz:', error);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});

export default router;