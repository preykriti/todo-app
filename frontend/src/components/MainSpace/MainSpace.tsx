import { useContext } from "react";
import Task from "../Task/Task";
import "./MainSpace.css";
import FolderContext from "../../context/taskFolder/taskFolderContext";

const MainSpace = () => {
  
  const context = useContext(FolderContext);
  if(!context){
    return <div>Error: No Context</div>;
  }
  const {tasks,  error, currentFolderId} = context;
  

  // if(isLoading) return <div>Loading Tasks...</div>;
  if(error) return <div>Error: {error}</div>;
  return (
    <div className="main-space">
      {currentFolderId && (<div className="task-list">
        {tasks.map((item)=>(<Task key={item._id} task={item}/>))}

      </div>)}
      <button className="add-task-button">+</button>
    </div>
  );
};

export default MainSpace;
