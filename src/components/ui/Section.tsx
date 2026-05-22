import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'

type SectionProps = {
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({ title, description, children, className = '' }: SectionProps) {
  return (
    <Box component="section" className={`mb-10 sm:mb-12 ${className}`}>
      {(title || description) && (
        <Box className="mb-5 sm:mb-6">
          {title && (
            <Typography variant="h5" component="h2" sx={{ color: 'text.primary', mb: 0.5 }}>
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
      )}
      {children}
    </Box>
  )
}
