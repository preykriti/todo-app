import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import { FoldersProvider } from './context/taskFolder/taskFolderProvider.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FoldersProvider>
      <App />
    </FoldersProvider>
    <ToastContainer />
  </StrictMode>
);
