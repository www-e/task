'use client';
import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Quiz } from '@/lib/features/apiSlice';
import {
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation
} from '@/lib/features/apiSlice';

interface QuizFormData {
  title: string;
  course: string;
  topic: string;
  dueDate: string;
  type: 'quiz' | 'assignment';
  isCompleted: boolean;
}

const initialFormData: QuizFormData = {
  title: '',
  course: '',
  topic: '',
  dueDate: '',
  type: 'quiz',
  isCompleted: false
};

export default function QuizManager({ data, isLoading }: { data: Quiz[]; isLoading: boolean }) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<QuizFormData>(initialFormData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [createQuiz, { isLoading: isCreating }] = useCreateQuizMutation();
  const [updateQuiz, { isLoading: isUpdating }] = useUpdateQuizMutation();
  const [deleteQuiz, { isLoading: isDeleting }] = useDeleteQuizMutation();

  const handleOpen = (quiz?: Quiz) => {
    if (quiz) {
      setEditingId(quiz._id);
      setFormData({
        title: quiz.title,
        course: quiz.course,
        topic: quiz.topic,
        dueDate: new Date(quiz.dueDate).toISOString().slice(0, 16), // Format for datetime-local input
        type: quiz.type,
        isCompleted: quiz.isCompleted
      });
    } else {
      setEditingId(null);
      setFormData(initialFormData);
      // Set default due date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setFormData(prev => ({
        ...prev,
        dueDate: tomorrow.toISOString().slice(0, 16)
      }));
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const handleInputChange = (field: keyof QuizFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<{ value: unknown, checked?: boolean }>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'isCompleted'
        ? (event.target as HTMLInputElement).checked
        : event.target.value
    }));
  };

  const handleSave = async () => {
    try {
      if (!formData.title.trim() || !formData.course.trim() || !formData.topic.trim() || !formData.dueDate) {
        setSnackbarMessage('Please fill in all required fields');
        setSnackbarOpen(true);
        return;
      }

      const dataToSend = {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString()
      };

      if (editingId) {
        await updateQuiz({ 
          id: editingId, 
          data: dataToSend 
        }).unwrap();
        setSnackbarMessage('Quiz updated successfully');
      } else {
        await createQuiz(dataToSend).unwrap();
        setSnackbarMessage('Quiz created successfully');
      }
      
      setSnackbarOpen(true);
      handleClose();
    } catch (error) {
      setSnackbarMessage('Failed to save quiz');
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await deleteQuiz(id).unwrap();
        setSnackbarMessage('Quiz deleted successfully');
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage('Failed to delete quiz');
        setSnackbarOpen(true);
      }
    }
  };

  const handleToggleComplete = async (quiz: Quiz) => {
    try {
      await updateQuiz({
        id: quiz._id,
        data: { ...quiz, isCompleted: !quiz.isCompleted }
      }).unwrap();
      setSnackbarMessage(`Quiz ${!quiz.isCompleted ? 'completed' : 'marked as incomplete'}`);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Failed to update quiz');
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Paper sx={{ p: 3, borderRadius: 4, height: '100%', bgcolor: '#fff' }} elevation={0}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">What&apos;s due</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
            sx={{ bgcolor: '#33b5a9', '&:hover': { bgcolor: '#2aa089' } }}
          >
            Add
          </Button>
        </Box>

        <Stack spacing={2}>
          {isLoading ? (
            <Typography>Loading quizzes...</Typography>
          ) : data.length === 0 ? (
            <Typography color="text.secondary">No quizzes yet</Typography>
          ) : (
            data.map((quiz) => (
              <Box key={quiz._id} sx={{ p: 0, mb: 2, position: 'relative' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                  {quiz.type === 'quiz' ? (
                    <HourglassEmptyIcon sx={{ color: '#33b5a9', fontSize: 20, mt: 0.5 }} />
                  ) : (
                    <AssignmentIcon sx={{ color: '#33b5a9', fontSize: 20, mt: 0.5 }} />
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1rem' }}>
                      {quiz.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Course: {quiz.course}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Topic: {quiz.topic}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Due to: {new Date(quiz.dueDate).toLocaleString()}
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={quiz.isCompleted}
                          onChange={() => handleToggleComplete(quiz)}
                          size="small"
                          color="success"
                        />
                      }
                      label="Completed"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleOpen(quiz)}
                      sx={{ color: '#33b5a9' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDelete(quiz._id)}
                      sx={{ color: '#f44336' }}
                      disabled={isDeleting}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                
                <Button 
                  variant="outlined" 
                  fullWidth 
                  sx={{ 
                    color: '#33b5a9', 
                    borderColor: '#33b5a9', 
                    fontWeight: 'bold',
                    mt: 1
                  }}
                  disabled={quiz.isCompleted}
                >
                  {quiz.type === 'quiz' ? 'Start Quiz' : 'Solve Assignment'}
                </Button>
                
                <Box sx={{ borderBottom: '1px solid #eee', mt: 3, mb: 1 }} />
              </Box>
            ))
          )}
        </Stack>
      </Paper>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Edit Quiz' : 'Create New Quiz'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              value={formData.title}
              onChange={handleInputChange('title')}
              placeholder="Quiz or assignment title"
            />
            <TextField
              label="Course"
              fullWidth
              value={formData.course}
              onChange={handleInputChange('course')}
              placeholder="Course name"
            />
            <TextField
              label="Topic"
              fullWidth
              value={formData.topic}
              onChange={handleInputChange('topic')}
              placeholder="Topic or chapter"
            />
            <TextField
              label="Due Date"
              fullWidth
              type="datetime-local"
              value={formData.dueDate}
              onChange={handleInputChange('dueDate')}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'quiz' | 'assignment' }))}
                label="Type"
              >
                <MenuItem value="quiz">Quiz</MenuItem>
                <MenuItem value="assignment">Assignment</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isCompleted}
                  onChange={handleInputChange('isCompleted')}
                  color="success"
                />
              }
              label="Mark as completed"
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