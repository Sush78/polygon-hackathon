import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Erc20VerifierProvider } from './context/ERC20VerifierContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Erc20VerifierProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Erc20VerifierProvider>
)
