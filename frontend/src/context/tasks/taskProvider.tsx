import { useState } from "react"
import TaskContext from "./taskContext"
import { TaskType } from "../../types/types";
import { toast } from "react-toastify";
import axios from "axios";


export const TaskProvider: React.FC<{children: React.ReactNode}> = ({children})=>{
    const [selectedTask, setSelectedTask] = useState<TaskType | null> (null);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchOneTask = async(taskId: string)=>{
        try {
            const response = await axios.get(
              `http://localhost:8080/api/task/getonetask/${taskId}`,
              {headers: {
                "ContentType": "application/json",
              },
            withCredentials: true}
            );
            if(response.data.success){
                setSelectedTask(response.data.task);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to fetch tasks";
                  setError(message);
                  toast.error(message)
        }
    }

    // ! edit a task:
    const editTask = async()=>{
        try {
          const response = await axios.get(
            `http://localhost:8080/api/task/updatetask/${taskId}`,
            {
              headers: {
                ContentType: "application/json",
              },
              withCredentials: true,
            }
          );
          if (response.data.success) {
            setSelectedTask(response.data.task);
          }
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Failed to fetch tasks";
          setError(message);
          toast.error(message);
        }
    }


    return (
      <TaskContext.Provider value={{selectedTaskId, setSelectedTaskId, selectedTask, error, setSelectedTask, fetchOneTask }}>
        {children}
      </TaskContext.Provider>
    );
}