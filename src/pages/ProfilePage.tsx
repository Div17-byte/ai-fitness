import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState, type FormEvent } from "react";
import { useFitness } from "../hooks/useFitness";
import {
    activityLevelOptions,
    defaultProfile,
    fitnessGoalOptions,
    genderOptions,
    normalizeNumber,
    type FitnessProfile,
    formatCalories,
} from "../utils/fitness";
import { AIResponseCard } from "../components/AIResponseCard";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { FormField } from "../components/FormField";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/ui/PageHeader";

export function ProfilePage() {
    const { profile, saveProfile, loading, error, clearError, dashboard } =
        useFitness();
    const [form, setForm] = useState<FitnessProfile>(defaultProfile());

    useEffect(() => {
        setForm(profile || defaultProfile());
    }, [profile]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await saveProfile(form);
    };

    if (loading.bootstrap && !profile) {
        return <LoadingSpinner label="Loading profile workspace" />;
    }

    return (
        <Stack spacing={4}>
            <PageHeader
                title="Profile"
                subtitle="Capture the metrics that drive dashboard estimates, AI coaching, and plan generation."
            />

            {error && (
                <Alert severity="error" onClose={clearError}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 7 }}>
                    <Card padding="lg">
                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2.5}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    User profile form
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <FormField
                                            label="Name"
                                            value={form.name}
                                            onChange={(event) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    name: event.target.value,
                                                }))
                                            }
                                            placeholder="Alex"
                                            required
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <FormField
                                            label="Age"
                                            type="number"
                                            value={form.age}
                                            onChange={(event) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    age: event.target.value,
                                                }))
                                            }
                                            placeholder="29"
                                            required
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <FormField
                                            label="Gender"
                                            select
                                            value={form.gender}
                                            onChange={(event) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    gender: event.target.value,
                                                }))
                                            }
                                            options={genderOptions}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <FormField
                                            label="Activity level"
                                            select
                                            value={form.activityLevel}
                                            onChange={(event) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    activityLevel: event.target.value,
                                                }))
                                            }
                                            options={activityLevelOptions}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField
                                            label="Height (cm)"
                                            type="number"
                                            value={form.height}
                                            onChange={(event) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    height: event.target.value,
                                                }))
                                            }
                                            placeholder="178"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField
                                            label="Weight (kg)"
                                            type="number"
                                            value={form.weight}
                                            onChange={(event) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    weight: event.target.value,
                                                }))
                                            }
                                            placeholder="76"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField
                                            label="Fitness goal"
                                            select
                                            value={form.goal}
                                            onChange={(event) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    goal: event.target.value,
                                                }))
                                            }
                                            options={fitnessGoalOptions}
                                        />
                                    </Grid>
                                </Grid>

                                <Box className="flex flex-wrap gap-3 pt-2">
                                    <Button
                                        uiVariant="primary"
                                        type="submit"
                                        disabled={loading.profile}
                                    >
                                        {loading.profile ? "Saving profile..." : "Save profile"}
                                    </Button>
                                    <Button
                                        uiVariant="outlined"
                                        type="button"
                                        onClick={() => setForm(defaultProfile())}
                                    >
                                        Reset
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, lg: 5 }}>
                    <Stack spacing={3}>
                        <AIResponseCard
                            title="Profile summary"
                            subtitle="What the backend knows right now"
                            badges={[
                                profile?.goal || "No goal yet",
                                profile?.activityLevel || "No activity level yet",
                            ]}
                            content={
                                profile
                                    ? `${profile.name} is ${normalizeNumber(profile.age)} years old, ${normalizeNumber(profile.height)} cm tall, and ${normalizeNumber(profile.weight)} kg.\n\nDaily calorie estimate: ${formatCalories(dashboard?.dailyCalorieEstimate)}.`
                                    : "No profile is saved yet. Fill out the form to unlock personalized recommendations."
                            }
                        />

                        <Card padding="lg">
                            <Stack spacing={1.5}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Saved state
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Profile data persists in the backend JSON store so it can be
                                    expanded into a database later without changing the UI
                                    contract.
                                </Typography>
                            </Stack>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );
}
