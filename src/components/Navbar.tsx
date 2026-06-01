import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link, useLocation } from 'react-router-dom'

type NavbarProps = {
    onMenuClick: () => void
}

const routeTitleMap: Record<string, string> = {
    '/': 'Home',
    '/dashboard': 'Dashboard',
    '/profile': 'Profile',
    '/coach': 'AI Coach',
    '/workout': 'Workout Generator',
    '/meal-plan': 'Meal Planner',
}

export function Navbar({ onMenuClick }: NavbarProps) {
    const location = useLocation()
    const title = routeTitleMap[location.pathname] || 'AI Fitness'

    return (
        <Box
            component="header"
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1200,
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: 'rgba(3, 7, 18, 0.85)',
                backdropFilter: 'blur(18px)',
            }}
        >
            <Toolbar sx={{ minHeight: 76, px: { xs: 2, sm: 3, lg: 4 } }}>
                <IconButton edge="start" color="inherit" aria-label="open navigation" onClick={onMenuClick} sx={{ mr: 1, display: { lg: 'none' } }}>
                    <MenuIcon />
                </IconButton>

                <Box className="flex min-w-0 flex-1 items-center gap-3">
                    <Box
                        className="flex h-11 w-11 items-center justify-center rounded-2xl"
                        sx={{ bgcolor: 'rgba(16, 185, 129, 0.14)', color: 'primary.main' }}
                    >
                        <FitnessCenterIcon />
                    </Box>
                    <Box className="min-w-0">
                        <Typography variant="subtitle1" component={Link} to="/" sx={{ color: 'text.primary', fontWeight: 800, textDecoration: 'none' }}>
                            AI Fitness
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {title}
                        </Typography>
                    </Box>
                </Box>


            </Toolbar>
        </Box>
    )
}
