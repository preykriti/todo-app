import { useState } from "react";
import "./Task.css";

interface TaskProps {
  title: string;
}

const Task: React.FC<TaskProps> = ({ title }) => {
  const [checked, setChecked] = useState(false);
  const handleOnChecked = () => {
    setChecked(!checked);
  };
  return (
    <div className="task-box">
      <input
        onChange={handleOnChecked}
        type="checkbox"
        checked={checked}
        id="task1"
      />
      <div className={checked ? "cross-out" : ""}>{title}</div>
     
    </div>
  );
};

export default Task;
