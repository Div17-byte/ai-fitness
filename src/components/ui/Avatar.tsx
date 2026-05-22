import MuiAvatar from '@mui/material/Avatar'
import type { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar'

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

export type AvatarProps = MuiAvatarProps & {
  size?: AvatarSize
}

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
}

export function Avatar({ size = 'md', sx, ...props }: AvatarProps) {
  const dimension = sizeMap[size]
  return (
    <MuiAvatar
      sx={{
        width: dimension,
        height: dimension,
        fontSize: dimension * 0.4,
        bgcolor: 'primary.dark',
        color: 'primary.contrastText',
        fontWeight: 600,
        ...sx,
      }}
      {...props}
    />
  )
}
