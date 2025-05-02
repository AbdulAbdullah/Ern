import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { web3onboard } from './services/web3.ts'
import { Web3OnboardProvider } from '@web3-onboard/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3OnboardProvider web3Onboard={web3onboard}>
      <App />
    </Web3OnboardProvider>
  </React.StrictMode>
)
