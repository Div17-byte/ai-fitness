import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'
import { Card } from './Card'

type FeatureCardProps = {
  title: string
  description: string
  icon: ReactNode
  action?: ReactNode
}

export function FeatureCard({ title, description, icon, action }: FeatureCardProps) {
  return (
    <Card padding="lg" hoverable className="h-full">
      <Box className="flex h-full flex-col">
        <Box
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
          sx={{ bgcolor: 'rgba(52, 211, 153, 0.12)', color: 'primary.main' }}
        >
          {icon}
        </Box>
        <Typography variant="h6" component="h3" sx={{ mb: 1, color: 'text.primary' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flex: 1, lineHeight: 1.6 }}>
          {description}
        </Typography>
        {action && <Box className="mt-4">{action}</Box>}
      </Box>
    </Card>
  )
}
