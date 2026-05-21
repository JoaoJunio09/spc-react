import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './global.css';
import 'react-loading-skeleton/dist/skeleton.css';

import App from './App.tsx'

import { ToastContainer } from 'react-toastify';

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position='top-right'
        autoClose={3500}
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
    </QueryClientProvider>
  </StrictMode>,
)
