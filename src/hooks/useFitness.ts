import { useContext } from 'react'
import { FitnessContext } from '../context/FitnessContext'

export function useFitness() {
    const context = useContext(FitnessContext)

    if (!context) {
        throw new Error('useFitness must be used within a FitnessProvider')
    }

    return context
}
