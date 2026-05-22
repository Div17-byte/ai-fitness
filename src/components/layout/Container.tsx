import Box from '@mui/material/Box'
import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
  narrow?: boolean
}

export function Container({ children, className = '', narrow = false }: ContainerProps) {
  return (
    <Box
      component="div"
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${narrow ? 'max-w-3xl' : 'max-w-6xl'} ${className}`}
    >
      {children}
    </Box>
  )
}
