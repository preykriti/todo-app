import Task from "../Task/Task"
import "./MainSpace.css"

const MainSpace = () => {
  return (
    <div className="main-space">
      <Task title="This is my first task" />
      <Task title="This is my second task" />
    </div>
  );
}

export default MainSpace