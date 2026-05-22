import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { Button } from './Button'

type AppBarProps = {
  title?: string
}

export function AppBar({ title = 'AI-Fitness' }: AppBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <MuiAppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Box className="flex flex-1 items-center gap-2">
          <FitnessCenterIcon sx={{ color: 'primary.main', fontSize: 28 }} />
          <Typography
            variant="h6"
            component="span"
            sx={{ fontWeight: 700, color: 'text.primary', display: { xs: 'none', sm: 'block' } }}
          >
            {title}
          </Typography>
        </Box>

        <Box className="hidden items-center gap-2 md:flex">
          <Button uiVariant="ghost" size="small">
            Dashboard
          </Button>
          <Button uiVariant="ghost" size="small">
            Workouts
          </Button>
          <Button uiVariant="ghost" size="small">
            Nutrition
          </Button>
          <Button uiVariant="primary" size="small" sx={{ ml: 1 }}>
            Get Started
          </Button>
        </Box>

        <IconButton
          className="md:hidden"
          edge="end"
          color="inherit"
          aria-label="Open menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {menuOpen && (
        <Box
          className="flex flex-col gap-2 border-t border-white/5 px-4 py-4 md:hidden"
          sx={{ bgcolor: 'background.paper' }}
        >
          <Button uiVariant="ghost" fullWidth sx={{ justifyContent: 'flex-start' }}>
            Dashboard
          </Button>
          <Button uiVariant="ghost" fullWidth sx={{ justifyContent: 'flex-start' }}>
            Workouts
          </Button>
          <Button uiVariant="ghost" fullWidth sx={{ justifyContent: 'flex-start' }}>
            Nutrition
          </Button>
          <Button uiVariant="primary" fullWidth>
            Get Started
          </Button>
        </Box>
      )}
    </MuiAppBar>
  )
}
