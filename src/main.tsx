import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './global.css';

import App from './App.tsx'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={true}
      rtl={false}
      limit={4}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
    <App />
  </StrictMode>,
)
