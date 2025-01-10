import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextProvider } from './context/Context';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
    <ContextProvider>
      <App />
      <Toaster/>
      <ToastContainer/>
    </ContextProvider>
    </React.StrictMode>
);


