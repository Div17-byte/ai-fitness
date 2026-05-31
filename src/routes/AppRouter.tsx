import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { HomePage } from '../pages/HomePage'
import { ProfilePage } from '../pages/ProfilePage'
import { DashboardPage } from '../pages/DashboardPage'
import { CoachPage } from '../pages/CoachPage'
import { WorkoutGeneratorPage } from '../pages/WorkoutGeneratorPage'
import { MealPlannerPage } from '../pages/MealPlannerPage'

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="coach" element={<CoachPage />} />
                    <Route path="workout" element={<WorkoutGeneratorPage />} />
                    <Route path="meal-plan" element={<MealPlannerPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
