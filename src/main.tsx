import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FitnessProvider } from './context/FitnessContext'
import { AppThemeProvider } from './theme/AppThemeProvider'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <FitnessProvider>
        <App />
      </FitnessProvider>
    </AppThemeProvider>
  </StrictMode>,
)
