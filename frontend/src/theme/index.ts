'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';
import { colors } from './colors';

// Extend the MUI Theme interface
declare module '@mui/material/styles' {
  interface Theme {
    layout: {
      drawerWidth: number;
    };
  }
  interface ThemeOptions {
    layout?: {
      drawerWidth: number;
    };
  }
}

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: 'var(--font-noto-sans), ui-sans-serif, system-ui, sans-serif',
    h1: {
      fontFamily: 'var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif',
      fontWeight: 900,
      letterSpacing: '-0.02em',
      textTransform: 'uppercase',
    },
    h2: {
      fontFamily: 'var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily: 'var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
  },
  layout: {
    drawerWidth: 256, // 64 * 4 = w-64 in Tailwind
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          borderRadius: 8,
          fontWeight: 700,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
};

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.dark.background,
      paper: colors.dark.paper,
    },
    text: {
      primary: colors.dark.textPrimary,
      secondary: colors.dark.textSecondary,
    },
    divider: colors.dark.border,
  },
});

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.light.background,
      paper: colors.light.paper,
    },
    text: {
      primary: colors.light.textPrimary,
      secondary: colors.light.textSecondary,
    },
    divider: colors.light.border,
  },
});
