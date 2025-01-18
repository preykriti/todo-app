import { useContext } from "react";
import MainSpace from "../../components/MainSpace/MainSpace";
import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar";
import TaskDetailBar from "../../components/TaskDetailBar/TaskDetailBar";
import "./Home.css"
import TaskContext from "../../context/tasks/taskContext";
const Home = () => {
  const context = useContext(TaskContext);
  if(!context){
     return <div>Error: No Context</div>;
  }
  const { selectedTaskId } = context;
  return (
    <>
      <Navbar />
      <div className="main">
        <Sidebar />
        <MainSpace />
        {selectedTaskId && <TaskDetailBar/>}
      </div>
    </>
  );
}
export default Home