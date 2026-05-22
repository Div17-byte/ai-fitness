import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'
import { Card } from './Card'

type StatCardProps = {
  label: string
  value: string | number
  icon?: ReactNode
  trend?: { value: string; positive?: boolean }
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <Card padding="md" hoverable>
      <Box className="flex items-start justify-between gap-3">
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {label}
          </Typography>
          <Typography variant="h4" component="p" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {value}
          </Typography>
          {trend && (
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'block',
                color: trend.positive ? 'success.main' : 'error.main',
              }}
            >
              {trend.positive ? '↑' : '↓'} {trend.value}
            </Typography>
          )}
        </Box>
        {icon && (
          <Box
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            sx={{ bgcolor: 'rgba(52, 211, 153, 0.12)', color: 'primary.main' }}
          >
            {icon}
          </Box>
        )}
      </Box>
    </Card>
  )
}
