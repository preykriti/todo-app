import { useState } from "react"
import TaskContext from "./taskContext"
import { TaskType } from "../../types/types";


export const TaskProvider: React.FC<{children: React.ReactNode}> = ({children})=>{
    const [selectedTask, setSelectedTask] = useState<TaskType | null> (null);

    return (
      <TaskContext.Provider value={{ selectedTask, setSelectedTask }}>
        {children}
      </TaskContext.Provider>
    );
}