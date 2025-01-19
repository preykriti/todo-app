import { createContext } from "react";
import { TaskType } from "../../types/types";

interface TaskContextType {
    // tasks: Task[];
    selectedTask: TaskType | null;
    setSelectedTask: (task: TaskType| null) =>void;
}
const TaskContext = createContext<TaskContextType | undefined>(undefined);
export default TaskContext;