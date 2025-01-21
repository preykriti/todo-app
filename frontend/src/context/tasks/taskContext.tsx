import { createContext } from "react";
import { TaskType } from "../../types/types";

interface TaskContextType {
  // tasks: Task[];
  error: string | null;
  selectedTask: TaskType | null;
  selectedTaskId: string | null;
  setSelectedTaskId: (taskId: string|null) => void;
  setSelectedTask: (task: TaskType | null) => void;
  fetchOneTask: (taskId: string) => Promise<void>;
}
const TaskContext = createContext<TaskContextType | undefined>(undefined);
export default TaskContext;