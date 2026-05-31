import HomeIcon from '@mui/icons-material/Home'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import RestaurantIcon from '@mui/icons-material/Restaurant'

export const navigationItems = [
    { label: 'Home', path: '/', description: 'Overview', icon: HomeIcon },
    { label: 'Dashboard', path: '/dashboard', description: 'Daily summary', icon: DashboardIcon },
    { label: 'Profile', path: '/profile', description: 'Profile setup', icon: PersonIcon },
    { label: 'AI Coach', path: '/coach', description: 'Ask questions', icon: ChatBubbleIcon },
    { label: 'Workout Generator', path: '/workout', description: 'Plan sessions', icon: FitnessCenterIcon },
    { label: 'Meal Planner', path: '/meal-plan', description: 'Build meals', icon: RestaurantIcon },
] as const
