import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState, type FormEvent } from "react";
import { AIResponseCard } from "../components/AIResponseCard";
import { FormField } from "../components/FormField";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useFitness } from "../hooks/useFitness";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { equipmentOptions, workoutExperienceOptions } from "../utils/fitness";

export function WorkoutGeneratorPage() {
    const { profile, generateWorkoutPlan, workoutPlan, loading } = useFitness();
    const [form, setForm] = useState({
        goal: profile?.goal || "General Fitness",
        workoutExperience: "Beginner",
        availableDays: 4,
        availableEquipment: "Bodyweight only",
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await generateWorkoutPlan(form);
    };

    if (loading.bootstrap && !workoutPlan) {
        return <LoadingSpinner label="Loading workout generator" />;
    }

    return (
        <Stack spacing={4}>
            <PageHeader
                title="Workout Generator"
                subtitle="Generate a structured plan using your goal, training level, available days, and equipment."
            />

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 5 }}>
                    <Card padding="lg">
                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2.5}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Workout request
                                </Typography>

                                <FormField
                                    label="Fitness goal"
                                    value={form.goal}
                                    onChange={(event) =>
                                        setForm((current) => ({
                                            ...current,
                                            goal: event.target.value,
                                        }))
                                    }
                                    placeholder="Weight loss"
                                />
                                <FormField
                                    label="Workout experience"
                                    select
                                    value={form.workoutExperience}
                                    onChange={(event) =>
                                        setForm((current) => ({
                                            ...current,
                                            workoutExperience: event.target.value,
                                        }))
                                    }
                                    options={workoutExperienceOptions.map((value) => ({
                                        label: value,
                                        value,
                                    }))}
                                />
                                <FormField
                                    label="Available days"
                                    type="number"
                                    value={form.availableDays}
                                    onChange={(event) =>
                                        setForm((current) => ({
                                            ...current,
                                            availableDays: Number(event.target.value),
                                        }))
                                    }
                                />
                                <FormField
                                    label="Available equipment"
                                    select
                                    value={form.availableEquipment}
                                    onChange={(event) =>
                                        setForm((current) => ({
                                            ...current,
                                            availableEquipment: event.target.value,
                                        }))
                                    }
                                    options={equipmentOptions.map((value) => ({
                                        label: value,
                                        value,
                                    }))}
                                />

                                <Button
                                    uiVariant="primary"
                                    type="submit"
                                    disabled={loading.workout}
                                >
                                    {loading.workout
                                        ? "Generating plan..."
                                        : "Generate workout plan"}
                                </Button>
                            </Stack>
                        </Box>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, lg: 7 }}>
                    <AIResponseCard
                        title="Workout plan"
                        subtitle="Formatted output from the backend AI service"
                        content={
                            workoutPlan || "Generate a workout plan to see the result here."
                        }
                        badges={[
                            form.goal,
                            form.workoutExperience,
                            `${form.availableDays} days`,
                        ]}
                    />
                </Grid>
            </Grid>
        </Stack>
    );
}
