import { createContext } from "react";

interface TaskContextType {
    // tasks: Task[];
    selectedTaskId: string | null;
    setSelectedTaskId: (id: string| null) =>void;
}
const TaskContext = createContext<TaskContextType | undefined>(undefined);
export default TaskContext;