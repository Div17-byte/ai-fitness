import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import type { CardProps as MuiCardProps } from '@mui/material/Card'
import type { ReactNode } from 'react'

export type CardProps = MuiCardProps & {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

const paddingMap = {
  none: 0,
  sm: 2,
  md: 3,
  lg: 4,
}

export function Card({
  children,
  padding = 'md',
  hoverable = false,
  sx,
  ...props
}: CardProps) {
  return (
    <MuiCard
      sx={{
        transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
        ...(hoverable && {
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'rgba(52, 211, 153, 0.3)',
            boxShadow: 3,
            transform: 'translateY(-2px)',
          },
        }),
        ...sx,
      }}
      {...props}
    >
      {padding === 'none' ? children : (
        <CardContent sx={{ p: paddingMap[padding], '&:last-child': { pb: paddingMap[padding] } }}>
          {children}
        </CardContent>
      )}
    </MuiCard>
  )
}
