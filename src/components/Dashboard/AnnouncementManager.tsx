'use client';
import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Announcement } from '@/lib/features/apiSlice';
import {
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation
} from '@/lib/features/apiSlice';

interface AnnouncementFormData {
  author: string;
  subject: string;
  content: string;
  avatarUrl: string;
}

const initialFormData: AnnouncementFormData = {
  author: '',
  subject: '',
  content: '',
  avatarUrl: 'https://i.pravatar.cc/150?u=default'
};

export default function AnnouncementManager({ data, isLoading }: { data: Announcement[]; isLoading: boolean }) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AnnouncementFormData>(initialFormData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [createAnnouncement, { isLoading: isCreating }] = useCreateAnnouncementMutation();
  const [updateAnnouncement, { isLoading: isUpdating }] = useUpdateAnnouncementMutation();
  const [deleteAnnouncement, { isLoading: isDeleting }] = useDeleteAnnouncementMutation();

  const handleOpen = (announcement?: Announcement) => {
    if (announcement) {
      setEditingId(announcement._id);
      setFormData({
        author: announcement.author,
        subject: announcement.subject,
        content: announcement.content,
        avatarUrl: announcement.avatarUrl
      });
    } else {
      setEditingId(null);
      setFormData(initialFormData);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const handleInputChange = (field: keyof AnnouncementFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSave = async () => {
    try {
      if (!formData.author.trim() || !formData.subject.trim() || !formData.content.trim()) {
        setSnackbarMessage('Please fill in all required fields');
        setSnackbarOpen(true);
        return;
      }

      if (editingId) {
        await updateAnnouncement({ 
          id: editingId, 
          data: formData 
        }).unwrap();
        setSnackbarMessage('Announcement updated successfully');
      } else {
        await createAnnouncement(formData).unwrap();
        setSnackbarMessage('Announcement created successfully');
      }
      
      setSnackbarOpen(true);
      handleClose();
    } catch (error) {
      setSnackbarMessage('Failed to save announcement');
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await deleteAnnouncement(id).unwrap();
        setSnackbarMessage('Announcement deleted successfully');
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage('Failed to delete announcement');
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <>
      <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }} elevation={0}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">Announcements</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
            sx={{ bgcolor: '#33b5a9', '&:hover': { bgcolor: '#2aa089' } }}
          >
            Add
          </Button>
        </Box>

        <Stack spacing={3}>
          {isLoading ? (
            <Typography>Loading announcements...</Typography>
          ) : data.length === 0 ? (
            <Typography color="text.secondary">No announcements yet</Typography>
          ) : (
            data.map((item) => (
              <Box key={item._id} sx={{ display: 'flex', gap: 2, position: 'relative' }}>
                <Avatar src={item.avatarUrl} alt={item.author} />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight="bold">{item.author}</Typography>
                    <Typography variant="caption" color="text.secondary">|</Typography>
                    <Typography variant="caption" color="text.secondary">{item.subject}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    lineHeight: 1.4
                  }}>
                    {item.content}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton 
                    size="small" 
                    onClick={() => handleOpen(item)}
                    sx={{ color: '#33b5a9' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDelete(item._id)}
                    sx={{ color: '#f44336' }}
                    disabled={isDeleting}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))
          )}
        </Stack>
      </Paper>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Edit Announcement' : 'Create New Announcement'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            <TextField
              label="Author"
              fullWidth
              value={formData.author}
              onChange={handleInputChange('author')}
              placeholder="Enter your name"
            />
            <TextField
              label="Subject"
              fullWidth
              value={formData.subject}
              onChange={handleInputChange('subject')}
              placeholder="Announcement subject"
            />
            <TextField
              label="Content"
              fullWidth
              multiline
              rows={4}
              value={formData.content}
              onChange={handleInputChange('content')}
              placeholder="Announcement content"
            />
            <TextField
              label="Avatar URL"
              fullWidth
              value={formData.avatarUrl}
              onChange={handleInputChange('avatarUrl')}
              placeholder="https://example.com/avatar.jpg"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={isCreating || isUpdating}
            sx={{ bgcolor: '#33b5a9', '&:hover': { bgcolor: '#2aa089' } }}
          >
            {isCreating || isUpdating ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}