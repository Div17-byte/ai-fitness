import MuiButton from '@mui/material/Button'
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button'
import type { SxProps, Theme } from '@mui/material/styles'

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost' | 'danger'

export type ButtonProps = Omit<MuiButtonProps, 'variant' | 'color'> & {
  uiVariant?: ButtonVariant
}

function getVariantStyles(uiVariant: ButtonVariant): {
  variant: MuiButtonProps['variant']
  color: MuiButtonProps['color']
  sx?: SxProps<Theme>
} {
  switch (uiVariant) {
    case 'primary':
      return { variant: 'contained', color: 'primary' }
    case 'secondary':
      return { variant: 'contained', color: 'secondary' }
    case 'outlined':
      return {
        variant: 'outlined',
        color: 'primary',
        sx: { borderColor: 'rgba(52, 211, 153, 0.5)' },
      }
    case 'ghost':
      return {
        variant: 'text',
        color: 'inherit',
        sx: {
          color: 'text.secondary',
          '&:hover': { color: 'primary.main', bgcolor: 'rgba(52, 211, 153, 0.08)' },
        },
      }
    case 'danger':
      return { variant: 'contained', color: 'error' }
  }
}

export function Button({ uiVariant = 'primary', sx, ...props }: ButtonProps) {
  const { variant, color, sx: variantSx } = getVariantStyles(uiVariant)
  const combinedSx: SxProps<Theme> = variantSx
    ? ([variantSx, sx].filter(Boolean) as SxProps<Theme>)
    : (sx ?? {})

  return <MuiButton variant={variant} color={color} sx={combinedSx} {...props} />
}
