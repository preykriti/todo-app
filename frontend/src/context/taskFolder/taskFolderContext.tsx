import { createContext } from "react";
import { Task, TaskFolder } from "../../types/types";


interface FolderContextType {
  folders: TaskFolder[];
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTaskFromOneFolder: (folderId: string) => Promise<void>;
  currentFolderId: string | null;
  // refreshFolders: ()=>Promise<void>;
}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export default FolderContext;

