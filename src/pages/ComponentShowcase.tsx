import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AppShell } from '../components/layout'
import {
  Avatar,
  Button,
  Chip,
  EmptyState,
  FeatureCard,
  PageHeader,
  Section,
  StatCard,
  TextField,
} from '../components/ui'

export function ComponentShowcase() {
  return (
    <AppShell>
      <PageHeader
        align="center"
        title="Your AI Fitness Coach"
        subtitle="Personalized workouts, nutrition guidance, and daily tips — designed to keep you healthy without a personal trainer."
        action={
          <Box className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Button uiVariant="outlined" size="large" fullWidth className="sm:w-auto">
              View Overview
            </Button>
            <Button uiVariant="primary" size="large" fullWidth className="sm:w-auto">
              Start Free
            </Button>
          </Box>
        }
      />

      <Section title="Today's snapshot" description="Track your progress at a glance">
        <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Workouts"
            value="3"
            icon={<DirectionsRunIcon />}
            trend={{ value: '1 more than last week', positive: true }}
          />
          <StatCard
            label="Calories burned"
            value="420"
            icon={<LocalFireDepartmentIcon />}
            trend={{ value: '12% vs yesterday', positive: true }}
          />
          <StatCard
            label="Active minutes"
            value="45"
            icon={<MonitorHeartIcon />}
          />
          <StatCard
            label="Streak"
            value="7 days"
            icon={<SelfImprovementIcon />}
            trend={{ value: 'Keep it up!', positive: true }}
          />
        </Box>
      </Section>

      <Section title="What you get" description="Core features powered by your AI coach">
        <Box className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Workout plans"
            description="Tailored routines based on your goals, equipment, and fitness level."
            icon={<DirectionsRunIcon />}
            action={<Button uiVariant="ghost" size="small">Explore →</Button>}
          />
          <FeatureCard
            title="Diet suggestions"
            description="Balanced meal ideas and macros aligned with your training."
            icon={<RestaurantIcon />}
            action={<Button uiVariant="ghost" size="small">Explore →</Button>}
          />
          <FeatureCard
            title="Daily tips"
            description="Actionable habits and recovery advice delivered every day."
            icon={<TipsAndUpdatesIcon />}
            action={<Button uiVariant="ghost" size="small">Explore →</Button>}
          />
        </Box>
      </Section>

      <Section title="Design system" description="Reusable UI building blocks for consistent screens">
        <Box className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Box className="rounded-xl border border-white/5 bg-gray-900/50 p-5 sm:p-6">
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Buttons
            </Typography>
            <Box className="flex flex-wrap gap-2">
              <Button uiVariant="primary">Primary</Button>
              <Button uiVariant="secondary">Secondary</Button>
              <Button uiVariant="outlined">Outlined</Button>
              <Button uiVariant="ghost">Ghost</Button>
              <Button uiVariant="danger">Danger</Button>
            </Box>
          </Box>

          <Box className="rounded-xl border border-white/5 bg-gray-900/50 p-5 sm:p-6">
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Chips & avatar
            </Typography>
            <Box className="flex flex-wrap items-center gap-2">
              <Chip label="Weight loss" tone="primary" />
              <Chip label="Muscle gain" tone="success" />
              <Chip label="Beginner" tone="neutral" />
              <Chip label="Premium" tone="warning" />
              <Avatar size="md">AF</Avatar>
            </Box>
          </Box>

          <Box className="rounded-xl border border-white/5 bg-gray-900/50 p-5 sm:p-6 lg:col-span-2">
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Form inputs
            </Typography>
            <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="Your goal" placeholder="e.g. Lose 5 kg in 3 months" />
              <TextField label="Email" type="email" placeholder="you@example.com" />
            </Box>
          </Box>
        </Box>
      </Section>

      <Section>
        <EmptyState
          icon={<SelfImprovementIcon sx={{ fontSize: 32 }} />}
          title="No workouts logged yet"
          description="Your AI coach will suggest a plan once you set your goals. Start with a quick assessment."
          action={<Button uiVariant="primary">Set my goals</Button>}
        />
      </Section>
    </AppShell>
  )
}
