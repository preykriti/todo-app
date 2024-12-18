import MainSpace from "../../components/MainSpace/MainSpace";
import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar";
import TaskDetailBar from "../../components/TaskDetailBar/TaskDetailBar";
import "./Home.css"

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="main">
        <Sidebar />
        <MainSpace />
        <TaskDetailBar/>
      </div>
    </>
  );
}

export default Home