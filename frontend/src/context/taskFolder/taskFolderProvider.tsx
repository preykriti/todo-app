import {useEffect, useState } from "react";
import { Task, TaskFolder } from "../../types/types";
import { toast } from "react-toastify";
import axios from "axios";
import FolderContext from "./taskFolderContext";


export const FoldersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [folders, setFolders] = useState<TaskFolder[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFolderId, setCurrentFolderId] = useState<string | null> (null);

  const fetchFolders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(
        "http://localhost:8080/api/folder/getallfolders",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setFolders(response.data.folders);
        console.log(response.data.folders);
        toast.success(response.data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch folders");
    } finally {
      setIsLoading(false);
    }
  };

  // ! fetch tasks from a folder on click
  const fetchTaskFromOneFolder = async (folderID: string)=>{
    try {
      setIsLoading(true);
      setError(null);
      setCurrentFolderId(folderID);
      const response = await axios.get(
        `http://localhost:8080/api/folder/getonefolder/${folderID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials:true,
        }
      );
      if (response.data.success){
        setTasks(response.data.folderdata.tasks);
        console.log(response.data.folderdata.tasks);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch tasks";
      setError(message);
      toast.error(message)
      
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchFolders();
  }, []);

    useEffect(() => {
      return () => {
        setTasks([]);
        setCurrentFolderId(null);
      };
    }, []);

//   const refreshFolders = () => fetchFolders();

  return (
    <FolderContext.Provider
      value={{ folders, isLoading, error,tasks, currentFolderId, fetchTaskFromOneFolder}}
    >
      {children}
    </FolderContext.Provider>
  );
};

// export const useFolders = () =>{
//     const context = useContext(FolderContext);
//     if (context === undefined) {
//       throw new Error("useFolders must be used within a FolderProvider");
//     }
//     return context;
// }