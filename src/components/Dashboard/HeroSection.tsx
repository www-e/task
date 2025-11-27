import { Box, Button, Typography, Paper } from '@mui/material';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 4, 
        borderRadius: 4, 
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4
      }}
    >
      <Box sx={{ maxWidth: '60%' }}>
        <Typography variant="h3" fontWeight="bold" sx={{ color: '#153c5e', mb: 2 }}>
          EXAMS TIME
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Here we are, Are you ready to fight? Don&apos;t worry, we prepared some tips to be ready for your exams.
        </Typography>
        <Typography variant="subtitle2" sx={{ fontStyle: 'italic', color: '#999', mb: 3 }}>
          &quot;Nothing happens until something moves&quot; - Albert Einstein
        </Typography>
        
        <Button 
          variant="contained" 
          size="large"
          sx={{ 
            bgcolor: '#33b5a9', 
            fontWeight: 'bold', 
            px: 4, 
            py: 1.5,
            fontSize: '1rem',
            '&:hover': { bgcolor: '#2a968c' }
          }}
        >
          View exams tips
        </Button>
      </Box>

      {/* Optimized Image */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Image 
          src="https://ouch-cdn2.icons8.com/r0-YqF7s3N0c6mK2m3c6mK2m3c6mK2m3/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNDg2/LzQ1NGIyYzQ0LTQz/YzItNDQzZC05ZWQz/LTQ0ZDMzYjY0ZDI2/MS5wbmc.png" 
          alt="Exams Illustration" 
          width={250}
          height={250}
          style={{ objectFit: 'contain', opacity: 0.9 }} 
          priority
        />
      </Box>
    </Paper>
  );
}