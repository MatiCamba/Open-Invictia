import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider autoHideDuration={2000}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
