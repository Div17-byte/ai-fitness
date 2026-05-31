import Box from "@mui/material/Box";
import { Grid2 as Grid } from "@mui/material";
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
import { dietaryPreferenceOptions, formatCalories } from "../utils/fitness";

export function MealPlannerPage() {
  const { profile, generateMealPlan, mealPlan, loading, dashboard } =
    useFitness();
  const [form, setForm] = useState({
    weight: Number(profile?.weight || 0),
    goal: profile?.goal || "General Fitness",
    dietaryPreference: "Balanced",
    caloriesTarget: dashboard?.dailyCalorieEstimate || 2000,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await generateMealPlan(form);
  };

  if (loading.bootstrap && !mealPlan) {
    return <LoadingSpinner label="Loading meal planner" />;
  }

  return (
    <Stack spacing={4}>
      <PageHeader
        title="Meal Planner"
        subtitle="Create meal suggestions based on body weight, goals, preferences, and calorie target."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card padding="lg">
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Meal request
                </Typography>

                <FormField
                  label="Weight (kg)"
                  type="number"
                  value={form.weight}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      weight: Number(event.target.value),
                    }))
                  }
                />
                <FormField
                  label="Goal"
                  value={form.goal}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      goal: event.target.value,
                    }))
                  }
                />
                <FormField
                  label="Dietary preference"
                  select
                  value={form.dietaryPreference}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      dietaryPreference: event.target.value,
                    }))
                  }
                  options={dietaryPreferenceOptions.map((value) => ({
                    label: value,
                    value,
                  }))}
                />
                <FormField
                  label="Calories target"
                  type="number"
                  value={form.caloriesTarget}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      caloriesTarget: Number(event.target.value),
                    }))
                  }
                />

                <Button
                  uiVariant="primary"
                  type="submit"
                  disabled={loading.meal}
                >
                  {loading.meal
                    ? "Generating meal plan..."
                    : "Generate meal plan"}
                </Button>
              </Stack>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <AIResponseCard
            title="Meal plan"
            subtitle="Generated from the backend AI service"
            content={mealPlan || "Generate a meal plan to see the result here."}
            badges={[
              form.goal,
              form.dietaryPreference,
              formatCalories(form.caloriesTarget),
            ]}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
