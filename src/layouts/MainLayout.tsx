import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'

export function MainLayout() {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background:
                    'radial-gradient(circle at top left, rgba(16,185,129,0.04), transparent 32%), radial-gradient(circle at top right, rgba(52,211,153,0.04), transparent 24%), linear-gradient(180deg, #fafaf8 0%, #f7f8f6 58%, #f4f5f3 100%)',
            }}
        >
            <Navbar onMenuClick={() => setMobileOpen(true)} />

            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

                <Box component="main" sx={{ flex: 1, minWidth: 0, py: { xs: 3, sm: 4, lg: 5 } }}>
                    <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
                        <Outlet />
                    </Container>
                </Box>
            </Box>
        </Box>
    )
}
