import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  subtitle?: string
  action?: ReactNode
  align?: 'left' | 'center'
}

export function PageHeader({ title, subtitle, action, align = 'left' }: PageHeaderProps) {
  const centered = align === 'center'

  return (
    <Box
      className={`mb-8 flex flex-col gap-4 sm:mb-10 ${centered ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}
    >
      <Box className={centered ? 'max-w-2xl' : ''}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1, fontSize: { xs: '0.95rem', sm: '1.05rem' }, lineHeight: 1.6 }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && <Box className={`shrink-0 ${centered ? '' : 'w-full sm:w-auto'}`}>{action}</Box>}
    </Box>
  )
}
