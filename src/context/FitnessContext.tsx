import type { ReactNode } from 'react'
import { createContext, useEffect, useMemo, useState } from 'react'
import { fitnessApi } from '../api/fitnessApi'
import type { CoachMessage, DashboardData, FitnessProfile, MealRequest, WorkoutRequest } from '../utils/fitness'

type LoadingState = {
    bootstrap: boolean
    profile: boolean
    dashboard: boolean
    coach: boolean
    workout: boolean
    meal: boolean
}

type FitnessContextValue = {
    profile: FitnessProfile | null
    dashboard: DashboardData | null
    coachMessages: CoachMessage[]
    workoutPlan: string
    mealPlan: string
    loading: LoadingState
    error: string | null
    refreshProfile: () => Promise<void>
    saveProfile: (profile: FitnessProfile) => Promise<void>
    refreshDashboard: () => Promise<void>
    sendCoachMessage: (message: string) => Promise<void>
    generateWorkoutPlan: (payload: WorkoutRequest) => Promise<void>
    generateMealPlan: (payload: MealRequest) => Promise<void>
    clearError: () => void
}

type FitnessProviderProps = {
    children: ReactNode
}

const defaultLoadingState: LoadingState = {
    bootstrap: true,
    profile: false,
    dashboard: false,
    coach: false,
    workout: false,
    meal: false,
}

const FitnessContext = createContext<FitnessContextValue | null>(null)

function extractErrorMessage(error: unknown) {
    if (typeof error === 'object' && error && 'message' in error) {
        return String((error as { message?: string }).message || 'Something went wrong')
    }

    return 'Something went wrong'
}

export function FitnessProvider({ children }: FitnessProviderProps) {
    const [profile, setProfile] = useState<FitnessProfile | null>(null)
    const [dashboard, setDashboard] = useState<DashboardData | null>(null)
    const [coachMessages, setCoachMessages] = useState<CoachMessage[]>([])
    const [workoutPlan, setWorkoutPlan] = useState('')
    const [mealPlan, setMealPlan] = useState('')
    const [loading, setLoading] = useState<LoadingState>(defaultLoadingState)
    const [error, setError] = useState<string | null>(null)

    const setLoadingKey = (key: keyof LoadingState, value: boolean) => {
        setLoading((current) => ({ ...current, [key]: value }))
    }

    const refreshProfile = async () => {
        setLoadingKey('profile', true)
        try {
            const nextProfile = await fitnessApi.getProfile()
            setProfile(nextProfile)
        } catch (error) {
            setError(extractErrorMessage(error))
        } finally {
            setLoadingKey('profile', false)
        }
    }

    const refreshDashboard = async () => {
        setLoadingKey('dashboard', true)
        try {
            const nextDashboard = await fitnessApi.getDashboard()
            setDashboard(nextDashboard)
            if (nextDashboard.profile) {
                setProfile(nextDashboard.profile)
            }
            setWorkoutPlan(nextDashboard.workoutPlan)
            setMealPlan(nextDashboard.mealPlan)
        } catch (error) {
            setError(extractErrorMessage(error))
        } finally {
            setLoadingKey('dashboard', false)
        }
    }

    const saveProfile = async (nextProfile: FitnessProfile) => {
        setLoadingKey('profile', true)
        try {
            const savedProfile = await fitnessApi.saveProfile(nextProfile)
            setProfile(savedProfile)
            await refreshDashboard()
        } catch (error) {
            setError(extractErrorMessage(error))
        } finally {
            setLoadingKey('profile', false)
        }
    }

    const sendCoachMessage = async (message: string) => {
        setLoadingKey('coach', true)
        setError(null)
        setCoachMessages((current) => [...current, { role: 'user', content: message }])

        try {
            const response = await fitnessApi.sendCoachMessage(message)
            const assistantReply = response.reply || 'No response was returned.'
            setCoachMessages((current) => [...current, { role: 'assistant', content: assistantReply }])
        } catch (error) {
            setError(extractErrorMessage(error))
        } finally {
            setLoadingKey('coach', false)
            await refreshDashboard()
        }
    }

    const generateWorkoutPlan = async (payload: WorkoutRequest) => {
        setLoadingKey('workout', true)
        setError(null)
        try {
            const response = await fitnessApi.generateWorkoutPlan(payload)
            const nextPlan = response.plan || 'Workout plan not returned.'
            setWorkoutPlan(nextPlan)
            await refreshDashboard()
        } catch (error) {
            setError(extractErrorMessage(error))
        } finally {
            setLoadingKey('workout', false)
        }
    }

    const generateMealPlan = async (payload: MealRequest) => {
        setLoadingKey('meal', true)
        setError(null)
        try {
            const response = await fitnessApi.generateMealPlan(payload)
            const nextPlan = response.plan || 'Meal plan not returned.'
            setMealPlan(nextPlan)
            await refreshDashboard()
        } catch (error) {
            setError(extractErrorMessage(error))
        } finally {
            setLoadingKey('meal', false)
        }
    }

    const clearError = () => setError(null)

    useEffect(() => {
        const bootstrap = async () => {
            setLoadingKey('bootstrap', true)
            await Promise.all([refreshProfile(), refreshDashboard()])
            setLoadingKey('bootstrap', false)
        }

        void bootstrap()
    }, [])

    const value = useMemo<FitnessContextValue>(
        () => ({
            profile,
            dashboard,
            coachMessages,
            workoutPlan,
            mealPlan,
            loading,
            error,
            refreshProfile,
            saveProfile,
            refreshDashboard,
            sendCoachMessage,
            generateWorkoutPlan,
            generateMealPlan,
            clearError,
        }),
        [profile, dashboard, coachMessages, workoutPlan, mealPlan, loading, error],
    )

    return <FitnessContext.Provider value={value}>{children}</FitnessContext.Provider>
}

export { FitnessContext }
