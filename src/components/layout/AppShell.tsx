import Box from '@mui/material/Box'
import type { ReactNode } from 'react'
import { AppBar } from '../ui/AppBar'
import { Container } from './Container'

type AppShellProps = {
  children: ReactNode
  title?: string
  showNav?: boolean
}

export function AppShell({ children, title = 'AI-Fitness', showNav = true }: AppShellProps) {
  return (
    <Box className="flex min-h-screen flex-col bg-[#030712]">
      {showNav && <AppBar title={title} />}
      <Box component="main" className="flex-1 py-6 sm:py-8">
        <Container>{children}</Container>
      </Box>
    </Box>
  )
}
