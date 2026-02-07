'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Snackbar, 
  Alert, 
  Backdrop, 
  CircularProgress, 
  Typography,
  alpha,
  ThemeProvider,
  CssBaseline
} from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { darkTheme } from '@/theme/darkTheme';

type NotifyType = 'success' | 'alert' | 'warning' | 'info';

interface ThemeContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  showSnack: (message: string, type?: NotifyType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: NotifyType;
  }>({
    show: false,
    message: '',
    type: 'info',
  });

  const showSnack = (message: string, type: NotifyType = 'info') => {
    setNotification({ show: true, message, type });
  };

  const handleCloseNotify = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  return (
    <ThemeContext.Provider value={{ loading, setLoading, showSnack }}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {children}

          {/* Global Loader Overlay */}
          <Backdrop
            sx={{
              color: 'primary.main',
              zIndex: (theme) => theme.zIndex.drawer + 1000,
              bgcolor: (theme) => alpha(theme.palette.background.default, 0.7),
              backdropFilter: 'blur(4px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
            open={loading}
          >
            <CircularProgress color="inherit" size={60} thickness={2} />
            <Typography 
              variant="h6" 
              sx={{ 
                letterSpacing: '0.2em', 
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                fontWeight: 800
              }}
            >
              System Processing...
            </Typography>
          </Backdrop>

          {/* Global Notifications */}
          <Snackbar
            open={notification.show}
            autoHideDuration={4000}
            onClose={handleCloseNotify}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert
              onClose={handleCloseNotify}
              severity={notification.type === 'alert' ? 'error' : notification.type}
              variant="filled"
              sx={{
                width: '100%',
                borderRadius: 0,
                borderLeft: (theme) => `4px solid ${theme.palette[notification.type === 'alert' ? 'error' : notification.type].dark}`,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                '& .MuiAlert-icon': {
                  fontSize: 20
                }
              }}
            >
              {notification.message}
            </Alert>
          </Snackbar>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
}
