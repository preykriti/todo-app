import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import { FoldersProvider } from './context/taskFolder/taskFolderProvider.tsx';
import { TaskProvider } from './context/tasks/taskProvider.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskProvider>
      <FoldersProvider>
        <App />
      </FoldersProvider>
    </TaskProvider>
    <ToastContainer />
  </StrictMode>
);
