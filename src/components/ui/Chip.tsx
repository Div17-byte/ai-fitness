import MuiChip from '@mui/material/Chip'
import type { ChipProps as MuiChipProps } from '@mui/material/Chip'

export type ChipTone = 'default' | 'primary' | 'success' | 'warning' | 'neutral'

export type ChipProps = Omit<MuiChipProps, 'color'> & {
  tone?: ChipTone
}

const toneColor: Record<ChipTone, MuiChipProps['color']> = {
  default: 'default',
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  neutral: 'default',
}

export function Chip({ tone = 'default', sx, ...props }: ChipProps) {
  return (
    <MuiChip
      color={toneColor[tone]}
      size="small"
      sx={{
        ...(tone === 'neutral' && {
          bgcolor: 'rgba(255,255,255,0.06)',
          color: 'text.secondary',
        }),
        ...sx,
      }}
      {...props}
    />
  )
}
