export type FitnessGoal = 'Weight Loss' | 'Muscle Gain' | 'General Fitness'
export type Gender = 'Female' | 'Male' | 'Non-binary' | 'Prefer not to say'
export type ActivityLevel = 'Sedentary' | 'Lightly active' | 'Moderately active' | 'Very active'
export type CoachRole = 'user' | 'assistant'

export type FitnessProfile = {
    name: string
    age: number | string
    gender: Gender | string
    height: number | string
    weight: number | string
    goal: FitnessGoal | string
    activityLevel: ActivityLevel | string
}

export type CoachMessage = {
    role: CoachRole
    content: string
}

export type DashboardData = {
    profile: FitnessProfile | null
    currentGoal: string
    dailyCalorieEstimate: number
    aiRecommendations: string[]
    workoutPlan: string
    mealPlan: string
    recentActivity: {
        profileUpdatedAt: string | null
        workoutPlanCount: number
        mealPlanCount: number
        chatCount: number
    }
}

export type WorkoutRequest = {
    goal: string
    workoutExperience: string
    availableDays: number
    availableEquipment: string
}

export type MealRequest = {
    weight: number
    goal: string
    dietaryPreference: string
    caloriesTarget: number
}

export const fitnessGoalOptions: Array<{ label: string; value: FitnessGoal }> = [
    { label: 'Weight Loss', value: 'Weight Loss' },
    { label: 'Muscle Gain', value: 'Muscle Gain' },
    { label: 'General Fitness', value: 'General Fitness' },
]

export const genderOptions: Array<{ label: string; value: Gender }> = [
    { label: 'Female', value: 'Female' },
    { label: 'Male', value: 'Male' },
    { label: 'Non-binary', value: 'Non-binary' },
    { label: 'Prefer not to say', value: 'Prefer not to say' },
]

export const activityLevelOptions: Array<{ label: string; value: ActivityLevel }> = [
    { label: 'Sedentary', value: 'Sedentary' },
    { label: 'Lightly active', value: 'Lightly active' },
    { label: 'Moderately active', value: 'Moderately active' },
    { label: 'Very active', value: 'Very active' },
]

export const workoutExperienceOptions = ['Beginner', 'Intermediate', 'Advanced']
export const dietaryPreferenceOptions = ['Balanced', 'High protein', 'Vegetarian', 'Vegan', 'Keto']
export const equipmentOptions = ['Bodyweight only', 'Dumbbells', 'Barbell', 'Full gym']

export function formatCalories(value?: number | string | null) {
    if (value === undefined || value === null || value === '') {
        return 'Not set'
    }

    return `${Number(value).toLocaleString()} kcal`
}

export function normalizeNumber(value: number | string | null | undefined) {
    return Number(value || 0)
}

export function defaultProfile(): FitnessProfile {
    return {
        name: '',
        age: '',
        gender: 'Prefer not to say',
        height: '',
        weight: '',
        goal: 'General Fitness',
        activityLevel: 'Moderately active',
    }
}

export function formatGoal(goal?: string | null) {
    if (!goal) {
        return 'General Fitness'
    }

    return goal
}

export function splitResponseBlocks(text: string) {
    return text
        .split(/\n{2,}/)
        .map((block) => block.trim())
        .filter(Boolean)
}
