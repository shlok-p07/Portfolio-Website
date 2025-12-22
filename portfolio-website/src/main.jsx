import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Galaxy from './components/Galaxy.jsx'
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Galaxy
      particleCount={520}
      particleSpread={200}
      speed={0.11}
      particleBaseSize={60}
      sizeRandomness={0.6}
      particleColors={["#38bdf8", "#818cf8", "#ffffff"]}
      moveParticlesOnHover={true}
      particleHoverFactor={1.5}
      alphaParticles={true}
      pixelRatio={1}
      opacity={0.4}
    >
      <App />
    </Galaxy>
    <Analytics />
  <SpeedInsights/>
  </StrictMode>,
)
