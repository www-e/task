import { Box, Typography, Paper, Avatar, Stack } from '@mui/material';
import { Announcement } from '@/lib/features/apiSlice';

export default function Announcements({ data }: { data: Announcement[] }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }} elevation={0}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">Announcements</Typography>
        <Typography variant="body2" sx={{ color: '#33b5a9', cursor: 'pointer' }}>All</Typography>
      </Box>

      <Stack spacing={3}>
        {data.map((item) => (
          <Box key={item._id} sx={{ display: 'flex', gap: 2 }}>
            <Avatar src={item.avatarUrl} alt={item.author} />
            <Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
                <Typography variant="subtitle2" fontWeight="bold">{item.author}</Typography>
                <Typography variant="caption" color="text.secondary">|</Typography>
                <Typography variant="caption" color="text.secondary">{item.subject}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ 
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2, // Truncate text after 2 lines
                lineHeight: 1.4
              }}>
                {item.content}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}