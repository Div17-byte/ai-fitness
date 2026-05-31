import { httpClient } from './httpClient'
import type { DashboardData, FitnessProfile, MealRequest, WorkoutRequest } from '../utils/fitness'

type ProfileResponse = {
    profile: FitnessProfile | null
}

type AiResponse = {
    reply?: string
    plan?: string
    history?: Array<{ role: string; content: string; createdAt: string }>
}

export const fitnessApi = {
    async getProfile() {
        const response = await httpClient.get<ProfileResponse>('/api/profile')
        return response.data.profile
    },
    async saveProfile(profile: FitnessProfile) {
        const response = await httpClient.post<ProfileResponse>('/api/profile', profile)
        return response.data.profile
    },
    async getDashboard() {
        const response = await httpClient.get<DashboardData>('/api/dashboard')
        return response.data
    },
    async sendCoachMessage(message: string) {
        const response = await httpClient.post<AiResponse>('/api/ai/chat', { message })
        return response.data
    },
    async generateWorkoutPlan(payload: WorkoutRequest) {
        const response = await httpClient.post<AiResponse>('/api/ai/workout', payload)
        return response.data
    },
    async generateMealPlan(payload: MealRequest) {
        const response = await httpClient.post<AiResponse>('/api/ai/meal-plan', payload)
        return response.data
    },
}
