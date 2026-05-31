import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState, type FormEvent } from 'react'
import { AIResponseCard } from '../components/AIResponseCard'
import { FormField } from '../components/FormField'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useFitness } from '../hooks/useFitness'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import type { CoachMessage } from '../utils/fitness'

const starterPrompts = [
    'Create a 30-minute fat loss workout for a busy week.',
    'What should I eat after strength training?',
    'How do I recover after a hard leg day?',
]

function ChatBubble({ message }: { message: CoachMessage }) {
    const isUser = message.role === 'user'

    return (
        <Box
            sx={{
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                maxWidth: 'min(100%, 720px)',
                borderRadius: 3,
                px: 2,
                py: 1.5,
                bgcolor: isUser ? 'rgba(16, 185, 129, 0.14)' : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                whiteSpace: 'pre-wrap',
            }}
        >
            <Typography variant="body2" sx={{ lineHeight: 1.75 }}>
                {message.content}
            </Typography>
        </Box>
    )
}

export function CoachPage() {
    const { coachMessages, sendCoachMessage, loading, error, clearError } = useFitness()
    const [message, setMessage] = useState('')

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const trimmedMessage = message.trim()
        if (!trimmedMessage) {
            return
        }

        await sendCoachMessage(trimmedMessage)
        setMessage('')
    }

    if (loading.bootstrap && coachMessages.length === 0) {
        return <LoadingSpinner label="Loading coach workspace" />
    }

    return (
        <Stack spacing={4}>
            <PageHeader title="AI Coach" subtitle="Ask workout, diet, recovery, or general fitness questions and keep the conversation on the backend." />

            {error && (
                <Card padding="md" sx={{ borderColor: 'rgba(248,113,113,0.35)' }}>
                    <Typography variant="body2" color="error.main">
                        {error}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <Button uiVariant="outlined" size="small" onClick={clearError}>
                            Dismiss error
                        </Button>
                    </Box>
                </Card>
            )}

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 7 }}>
                    <Card padding="lg">
                        <Stack spacing={2} sx={{ minHeight: 560 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                Conversation
                            </Typography>

                            <Stack spacing={1.5} sx={{ flex: 1, overflowY: 'auto', pr: 0.5 }}>
                                {coachMessages.length > 0 ? (
                                    coachMessages.map((chatMessage, index) => (
                                        <ChatBubble key={`${chatMessage.role}-${index}-${chatMessage.content.slice(0, 24)}`} message={chatMessage} />
                                    ))
                                ) : (
                                    <Card padding="lg">
                                        <Typography variant="body2" color="text.secondary">
                                            No messages yet. Try one of the starter prompts on the right.
                                        </Typography>
                                    </Card>
                                )}
                            </Stack>

                            <Box component="form" onSubmit={handleSubmit} sx={{ pt: 1 }}>
                                <Stack spacing={2}>
                                    <FormField
                                        label="Your message"
                                        multiline
                                        minRows={3}
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                        placeholder="Ask about workouts, nutrition, recovery, or general fitness advice."
                                    />
                                    <Box className="flex flex-wrap gap-3">
                                        <Button uiVariant="primary" type="submit" disabled={loading.coach} startIcon={<SendIcon />}>
                                            {loading.coach ? 'Sending...' : 'Send'}
                                        </Button>
                                        <Button uiVariant="outlined" type="button" onClick={() => setMessage('')}>
                                            Clear
                                        </Button>
                                    </Box>
                                </Stack>
                            </Box>
                        </Stack>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, lg: 5 }}>
                    <Stack spacing={3}>
                        <AIResponseCard title="Starter prompts" subtitle="Quick questions to begin the conversation" content={starterPrompts.map((prompt, index) => `${index + 1}. ${prompt}`).join('\n\n')} />

                        <Card padding="lg">
                            <Stack spacing={1.25}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Chat behavior
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                                    Messages are posted to the backend, which can swap between AI providers later without changing the UI.
                                </Typography>
                            </Stack>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    )
}
