import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'
import { Card } from './Card'

type EmptyStateProps = {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card padding="lg">
      <Box className="flex flex-col items-center py-6 text-center sm:py-8">
        {icon && (
          <Box
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
            sx={{ bgcolor: 'rgba(255,255,255,0.04)', color: 'text.secondary' }}
          >
            {icon}
          </Box>
        )}
        <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360, mb: action ? 3 : 0 }}>
            {description}
          </Typography>
        )}
        {action}
      </Box>
    </Card>
  )
}
