import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';
import App from './App.tsx';
import { UserProvider } from './contexts/UserContext.tsx';
import './index.css';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)
