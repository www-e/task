import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Quiz } from '@/lib/features/apiSlice';

export default function Quizzes({ data }: { data: Quiz[] }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 4, height: '100%', bgcolor: '#fff' }} elevation={0}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">What&apos;s due</Typography>
        <Typography variant="body2" sx={{ color: '#33b5a9', cursor: 'pointer' }}>All</Typography>
      </Box>

      <Stack spacing={2}>
        {data.map((quiz) => (
          <Box key={quiz._id} sx={{ p: 0, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
              {quiz.type === 'quiz' ? (
                <HourglassEmptyIcon sx={{ color: '#33b5a9', fontSize: 20, mt: 0.5 }} />
              ) : (
                <AssignmentIcon sx={{ color: '#33b5a9', fontSize: 20, mt: 0.5 }} />
              )}
              <Box>
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
            >
              {quiz.type === 'quiz' ? 'Start Quiz' : 'Solve Assignment'}
            </Button>
            
            <Box sx={{ borderBottom: '1px solid #eee', mt: 3, mb: 1 }} />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}