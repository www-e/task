import { Router, Request, Response } from 'express';
import { Announcement } from '../models';

const router = Router();

// Get all announcements (for dashboard)
router.get('/', async (req: Request, res: Response) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    console.error('❌ Error fetching announcements:', error);
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

// Create announcement
router.post('/', async (req: Request, res: Response) => {
  console.log('📝 Creating Announcement...');
  try {
    const { author, subject, content, avatarUrl } = req.body;
    
    if (!author || !subject || !content) {
      return res.status(400).json({ error: 'Author, subject, and content are required' });
    }

    const announcement = new Announcement({
      author,
      subject,
      content,
      avatarUrl: avatarUrl || 'https://i.pravatar.cc/150?u=default'
    });

    await announcement.save();
    console.log('✅ Announcement created:', announcement._id);
    res.status(201).json(announcement);
  } catch (error) {
    console.error('❌ Error creating announcement:', error);
    res.status(500).json({ error: 'Failed to create announcement' });
  }
});

// Update announcement
router.put('/:id', async (req: Request, res: Response) => {
  console.log('📝 Updating Announcement...');
  try {
    const { id } = req.params;
    const { author, subject, content, avatarUrl } = req.body;
    
    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { author, subject, content, avatarUrl },
      { new: true, runValidators: true }
    );

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    console.log('✅ Announcement updated:', id);
    res.json(announcement);
  } catch (error) {
    console.error('❌ Error updating announcement:', error);
    res.status(500).json({ error: 'Failed to update announcement' });
  }
});

// Delete announcement
router.delete('/:id', async (req: Request, res: Response) => {
  console.log('📝 Deleting Announcement...');
  try {
    const { id } = req.params;
    
    const announcement = await Announcement.findByIdAndDelete(id);
    
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    console.log('✅ Announcement deleted:', id);
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting announcement:', error);
    res.status(500).json({ error: 'Failed to delete announcement' });
  }
});

export default router;