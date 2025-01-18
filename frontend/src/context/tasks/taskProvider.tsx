import { useState } from "react"
import TaskContext from "./taskContext"


export const TaskProvider: React.FC<{children: React.ReactNode}> = ({children})=>{
    const [selectedTaskId, setSelectedTaskId] = useState<string | null> (null);

    return (
        <TaskContext.Provider value={{selectedTaskId, setSelectedTaskId}}>
            {children}
        </TaskContext.Provider>
    )
}