import "./Task.css"

interface TaskProps{
    title: string;
}

const Task:React.FC<TaskProps>= ({title}) => {
  return (
    <div className="task-box">
        <input type="checkbox" id="task1"/>
        <label>{title}</label>
    </div>
  )
}

export default Task