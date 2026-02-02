import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

export const darkTheme = createTheme({
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
  typography: {
    fontFamily: 'var(--font-noto-sans), "Inter", "Roboto", sans-serif',
    h1: { fontFamily: 'var(--font-space-grotesk), sans-serif', fontWeight: 700 },
    h2: { fontFamily: 'var(--font-space-grotesk), sans-serif', fontWeight: 700 },
    h3: { fontFamily: 'var(--font-space-grotesk), sans-serif', fontWeight: 700 },
    h4: { fontFamily: 'var(--font-space-grotesk), sans-serif', fontWeight: 700 },
    h5: { fontFamily: 'var(--font-space-grotesk), sans-serif', fontWeight: 600 },
    h6: { fontFamily: 'var(--font-space-grotesk), sans-serif', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});
