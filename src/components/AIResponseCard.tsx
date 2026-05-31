import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'
import { Card } from '../components/ui/Card'

type AIResponseCardProps = {
    title: string
    subtitle?: string
    content: string
    badges?: string[]
    action?: ReactNode
}

export function AIResponseCard({ title, subtitle, content, badges = [], action }: AIResponseCardProps) {
    return (
        <Card padding="lg" sx={{ height: '100%' }}>
            <Stack spacing={2}>
                <Box className="flex flex-wrap items-start justify-between gap-3">
                    <Box>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                    {action}
                </Box>

                {badges.length > 0 && (
                    <Box className="flex flex-wrap gap-2">
                        {badges.map((badge) => (
                            <Chip key={badge} label={badge} size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.12)' }} />
                        ))}
                    </Box>
                )}

                <Box
                    sx={{
                        whiteSpace: 'pre-wrap',
                        borderRadius: 2,
                        border: '1px solid rgba(255,255,255,0.06)',
                        bgcolor: 'rgba(3,7,18,0.45)',
                        p: 2,
                        lineHeight: 1.75,
                        color: 'text.primary',
                    }}
                >
                    {content}
                </Box>
            </Stack>
        </Card>
    )
}
