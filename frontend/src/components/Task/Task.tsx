import { useContext, useState } from "react";
import "./Task.css";
import {TaskType } from "../../types/types";
import TaskContext from "../../context/tasks/taskContext";

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [checked, setChecked] = useState(false);
  const context = useContext(TaskContext);
   if (!context) {
     return <div>Error: No Context</div>;
   }
  const {selectedTaskId, setSelectedTaskId} = context;
  const handleOnChecked = () => {
    setChecked(!checked);
  };
  console.log(task);
  return (
    <div className={`task-box ${selectedTaskId === task._id? 'selected' : ''}`} onClick={()=>setSelectedTaskId(task._id)}>
      <input
        onChange={handleOnChecked}
        type="checkbox"
        checked={checked}
        id="task1"
      />
      
      <div className={checked ? "cross-out" : ""}>{task.title}</div>
      
     
    </div>
  );
};

export default Task;
