import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

type LoadingSpinnerProps = {
    label?: string
}

export function LoadingSpinner({ label = 'Loading...' }: LoadingSpinnerProps) {
    return (
        <Box className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center">
            <CircularProgress size={32} />
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>
        </Box>
    )
}
