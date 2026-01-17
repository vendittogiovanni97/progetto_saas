'use client';
import { Box, Typography } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function AnalyticsPage() {
  return (
    <>
      <Box sx={{ p: 4 }}>
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1a1f2e 0%, #0f1419 100%)',
            borderRadius: '16px',
            border: '1px solid #2d3748',
            p: 6,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.1) 0%, transparent 60%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 8px 24px rgba(234, 179, 8, 0.3)',
            }}
          >
            <BarChartIcon sx={{ fontSize: 40, color: '#ffffff' }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              color: '#ffffff',
              fontWeight: 600,
              mb: 2,
              position: 'relative',
            }}
          >
            Analytics
          </Typography>
          <Typography
            sx={{
              color: '#94a3b8',
              fontSize: '16px',
              position: 'relative',
            }}
          >
            Statistiche e analytics in arrivo
          </Typography>
        </Box>
      </Box>
    </>
  );
}
