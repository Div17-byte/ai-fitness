import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ComponentType } from 'react'
import { NavLink } from 'react-router-dom'
import { useFitness } from '../hooks/useFitness'
import { navigationItems } from '../routes/navigation'
import { Card } from './ui/Card'

type SidebarProps = {
    mobileOpen: boolean
    onClose: () => void
}

type IconType = ComponentType<{ fontSize?: 'small' | 'medium' | 'inherit' }>

const drawerWidth = 300

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
    const { profile, dashboard } = useFitness()

    const content = (
        <Box sx={{ width: drawerWidth, p: 2.5 }}>
            <Stack spacing={2.5}>
                <Card padding="lg" sx={{ bgcolor: 'rgba(255,255,255,0.03)' }}>
                    <Stack spacing={1.5}>
                        <Box>
                            <Typography variant="overline" color="text.secondary">
                                Profile Snapshot
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                                {profile?.name || 'Set up your profile'}
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            {profile?.goal || dashboard?.currentGoal || 'General Fitness'}
                        </Typography>
                    </Stack>
                </Card>

                <Card padding="md" sx={{ bgcolor: 'rgba(255,255,255,0.03)' }}>
                    <Stack spacing={0.75}>
                        <Typography variant="body2" color="text.secondary">
                            Daily calorie estimate
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800 }}>
                            {dashboard?.dailyCalorieEstimate?.toLocaleString() || '—'}
                        </Typography>
                    </Stack>
                </Card>

                <Divider sx={{ borderColor: 'divider' }} />

                <List disablePadding>
                    {navigationItems.map((item) => {
                        const Icon = item.icon as IconType

                        return (
                            <ListItemButton
                                key={item.path}
                                component={NavLink}
                                to={item.path}
                                onClick={onClose}
                                sx={{
                                    mb: 0.75,
                                    borderRadius: 2,
                                    '&.active': {
                                        bgcolor: 'rgba(16, 185, 129, 0.14)',
                                        color: 'primary.main',
                                        '& .MuiListItemIcon-root': { color: 'primary.main' },
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Icon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={item.label} secondary={item.description} />
                            </ListItemButton>
                        )
                    })}
                </List>
            </Stack>
        </Box>
    )

    return (
        <>
            <Box sx={{ display: { xs: 'none', lg: 'block' }, width: drawerWidth, flexShrink: 0 }}>
                <Box
                    sx={{
                        position: 'sticky',
                        top: 88,
                        height: 'calc(100vh - 104px)',
                        overflowY: 'auto',
                        px: 2,
                        py: 1.5,
                    }}
                >
                    {content}
                </Box>
            </Box>

            <Drawer open={mobileOpen} onClose={onClose} sx={{ display: { xs: 'block', lg: 'none' } }}>
                {content}
            </Drawer>
        </>
    )
}
