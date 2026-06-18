import { createTheme } from '@mui/material/styles'

// Emerald Design System Color Palette - Light Theme
const stitchColors = {
  primary: '#10b981', // Emerald
  secondary: '#34d399',
  tertiary: '#6ee7b7',
  background: '#fafaf8', // Cream
  surface: '#ffffff',
  surfaceContainer: '#f3f4f2',
  surfaceContainerLow: '#f9f9f7',
  surfaceContainerHigh: '#ede8e0',
  surfaceContainerLowest: '#fefdfb',
  onSurface: '#1a1a1a',
  onSurfaceVariant: '#5a5a5a',
  outlineVariant: '#d0d0ce',
  error: '#dc2626',
  onPrimary: '#ffffff',
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: stitchColors.primary, // #10b981
      light: '#34d399',
      dark: '#059669',
      contrastText: stitchColors.onPrimary,
    },
    secondary: {
      main: stitchColors.secondary, // #34d399
      light: '#6ee7b7',
      dark: '#10b981',
      contrastText: '#ffffff',
    },
    success: { main: stitchColors.primary },
    warning: { main: '#f59e0b' },
    error: { main: stitchColors.error },
    background: {
      default: stitchColors.background, // #fafaf8
      paper: stitchColors.surfaceContainer, // #f3f4f2
    },
    text: {
      primary: stitchColors.onSurface, // #1a1a1a
      secondary: stitchColors.onSurfaceVariant, // #5a5a5a
    },
    divider: stitchColors.outlineVariant,
  },
  typography: {
    fontFamily: '"Manrope", "JetBrains Mono", system-ui, -apple-system, sans-serif',
    h1: { fontFamily: '"Manrope"', fontWeight: 700, letterSpacing: '-0.02em', fontSize: '32px' },
    h2: { fontFamily: '"Manrope"', fontWeight: 700, letterSpacing: '-0.02em', fontSize: '28px' },
    h3: { fontFamily: '"Manrope"', fontWeight: 600, fontSize: '24px' },
    h4: { fontFamily: '"Manrope"', fontWeight: 600, fontSize: '20px' },
    h5: { fontFamily: '"Manrope"', fontWeight: 600, fontSize: '16px' },
    h6: { fontFamily: '"Manrope"', fontWeight: 600, fontSize: '14px' },
    subtitle1: { fontFamily: '"Manrope"', fontWeight: 500 },
    body1: { fontFamily: '"Manrope"', fontWeight: 400, fontSize: '16px' },
    body2: { fontFamily: '"Manrope"', fontWeight: 400, fontSize: '14px' },
    button: { fontFamily: '"Manrope"', fontWeight: 600, textTransform: 'none' },
    caption: { fontFamily: '"JetBrains Mono"', fontWeight: 500, fontSize: '12px' },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: stitchColors.background,
          color: stitchColors.onSurface,
          scrollbarColor: `${stitchColors.primary} ${stitchColors.surfaceContainer}`,
          '&::-webkit-scrollbar': { width: 8 },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: stitchColors.primary,
            borderRadius: 4,
          },
          '@import': 'url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap")',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontFamily: '"Manrope"',
        },
        sizeLarge: {
          padding: '12px 28px',
          fontSize: '1rem',
        },
        contained: {
          backgroundColor: stitchColors.primary,
          color: stitchColors.onPrimary,
          '&:hover': {
            backgroundColor: '#00b982',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: stitchColors.surface,
          border: `1px solid ${stitchColors.outlineVariant}`,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'medium' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: stitchColors.surface,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: stitchColors.surface,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: stitchColors.primary,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: stitchColors.primary,
            borderWidth: 1,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { 
          fontFamily: '"Manrope"',
          fontWeight: 500,
          backgroundColor: stitchColors.surfaceContainer,
          borderColor: stitchColors.outlineVariant,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: stitchColors.surfaceContainerHigh,
        },
        bar: {
          backgroundColor: stitchColors.primary,
        },
      },
    },
  },
})

export const brandColors = { 
  ...stitchColors
}
