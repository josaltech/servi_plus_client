import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { TicketsContextProvider } from './context/TicketsContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TicketsContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TicketsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
