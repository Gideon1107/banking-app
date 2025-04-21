import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import './index.css'
import App from './App'
=======
import App from './App.tsx'
>>>>>>> 78babbafe383bd316f0e3bd901b543bb22513136

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
