import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Web3OnboardProvider } from '@web3-onboard/react'
import { web3onboard } from './services/web3'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3OnboardProvider web3Onboard={web3onboard}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </Web3OnboardProvider>
  </React.StrictMode>,
)
