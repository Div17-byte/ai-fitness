import InsightsIcon from "@mui/icons-material/Insights";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFitness } from "../hooks/useFitness";
import { AIResponseCard } from "../components/AIResponseCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/ui/PageHeader";
import { StatCard } from "../components/ui/StatCard";
import { Card } from "../components/ui/Card";
import { Section } from "../components/ui/Section";
import { formatCalories } from "../utils/fitness";

export function DashboardPage() {
    const { dashboard, loading } = useFitness();

    if (loading.dashboard && !dashboard) {
        return <LoadingSpinner label="Loading dashboard" />;
    }

    return (
        <Stack spacing={4}>
            <PageHeader
                title="Dashboard"
                subtitle="A concise summary of your current profile, calorie estimate, AI recommendations, and latest generated plans."
            />

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6, xl: 3 }}>
                    <StatCard
                        label="Goal"
                        value={dashboard?.currentGoal || "General Fitness"}
                        icon={<InsightsIcon />}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6, xl: 3 }}>
                    <StatCard
                        label="Calories"
                        value={formatCalories(dashboard?.dailyCalorieEstimate)}
                        icon={<LocalFireDepartmentIcon />}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6, xl: 3 }}>
                    <StatCard
                        label="Workouts"
                        value={dashboard?.recentActivity.workoutPlanCount ?? 0}
                        icon={<SportsGymnasticsIcon />}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6, xl: 3 }}>
                    <StatCard
                        label="Chats"
                        value={dashboard?.recentActivity.chatCount ?? 0}
                        icon={<ScheduleIcon />}
                    />
                </Grid>
            </Grid>

            <Section
                title="AI recommendations"
                description="What the coach would focus on today"
            >
                <Box className="grid gap-4 lg:grid-cols-3">
                    {dashboard?.aiRecommendations.map((recommendation) => (
                        <Card key={recommendation} padding="lg">
                            <Typography variant="body2" sx={{ lineHeight: 1.75 }}>
                                {recommendation}
                            </Typography>
                        </Card>
                    ))}
                    {!dashboard?.aiRecommendations?.length && (
                        <Card padding="lg">
                            <Typography variant="body2" color="text.secondary">
                                Add a profile to generate recommendations.
                            </Typography>
                        </Card>
                    )}
                </Box>
            </Section>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 6 }}>
                    <AIResponseCard
                        title="Latest workout plan"
                        subtitle="Backend-generated plan"
                        content={dashboard?.workoutPlan || "No workout plan generated yet."}
                        badges={[dashboard?.currentGoal || "General Fitness"]}
                    />
                </Grid>
                <Grid size={{ xs: 12, lg: 6 }}>
                    <AIResponseCard
                        title="Latest meal plan"
                        subtitle="Backend-generated plan"
                        content={dashboard?.mealPlan || "No meal plan generated yet."}
                        badges={[formatCalories(dashboard?.dailyCalorieEstimate)]}
                    />
                </Grid>
            </Grid>
        </Stack>
    );
}
