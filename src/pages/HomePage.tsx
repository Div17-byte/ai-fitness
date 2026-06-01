import FavoriteIcon from '@mui/icons-material/Favorite'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import TimerIcon from '@mui/icons-material/Timer'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'

const featureCards = [
    {
        title: 'Profile-first coaching',
        description: 'Store your goals, activity level, and body metrics once, then reuse them across every AI flow.',
        icon: FavoriteIcon,
    },
    {
        title: 'Fast AI planning',
        description: 'Generate workouts, meals, and coaching replies through a backend proxy that can swap providers later.',
        icon: SelfImprovementIcon,
    },
    {
        title: 'Daily actionability',
        description: 'The dashboard turns your profile into calorie estimates, plan summaries, and practical next steps.',
        icon: TimerIcon,
    },
]

export function HomePage() {
    return (
        <Stack spacing={4}>
            <PageHeader
                title="AI Fitness Platform"
                subtitle="Track your profile, get daily insights, and plan workouts and meals with AI support."
                action={
                    <Box className="flex flex-col gap-3 sm:flex-row">
                        <Link to="/dashboard" className="inline-block">
                            <Button uiVariant="outlined">View Dashboard</Button>
                        </Link>
                        <Link to="/profile" className="inline-block">
                            <Button uiVariant="primary">Build Profile</Button>
                        </Link>
                    </Box>
                }
            />

            <Section title="Why this platform works" description="A focused and complete fitness experience">
                <Box className="grid gap-4 md:grid-cols-3">
                    {featureCards.map((item) => {
                        const Icon = item.icon
                        return (
                            <Card key={item.title} padding="lg" hoverable>
                                <Stack spacing={2}>
                                    <Box className="flex h-12 w-12 items-center justify-center rounded-2xl" sx={{ bgcolor: 'rgba(16, 185, 129, 0.12)', color: 'primary.main' }}>
                                        <Icon />
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                        {item.description}
                                    </Typography>
                                </Stack>
                            </Card>
                        )
                    })}
                </Box>
            </Section>

            <Section title="Workflow" description="From profile setup to AI output in four steps">
                <Box className="grid gap-4 lg:grid-cols-4">
                    {['Create profile', 'Generate dashboard', 'Ask the coach', 'Build plans'].map((step, index) => (
                        <Card key={step} padding="lg">
                            <Stack spacing={1.25}>
                                <Typography variant="overline" color="text.secondary">
                                    Step {index + 1}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {step}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {index === 0 && 'Capture the user metrics that power the rest of the app.'}
                                    {index === 1 && 'Turn the profile into dashboard insights and calorie estimates.'}
                                    {index === 2 && 'Send questions to the backend AI proxy and keep the conversation stateful.'}
                                    {index === 3 && 'Generate a structured workout or meal response from form inputs.'}
                                </Typography>
                            </Stack>
                        </Card>
                    ))}
                </Box>
            </Section>
        </Stack>
    )
}
