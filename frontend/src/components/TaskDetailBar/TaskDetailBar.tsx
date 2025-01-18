import { useContext, useState } from "react";
// import Task from "../Task/Task"
import "./TaskDetailBar.css"
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import TaskContext from "../../context/tasks/taskContext";

const TaskDetailBar = () => {
  const [isFavourite, setIsFavourite] = useState(false);
  const context = useContext(TaskContext);
  if(!context){
    return <div>Error: no context</div>
  }
  const { setSelectedTaskId} = context;
    const toggleFavorite=()=>{
        setIsFavourite(!isFavourite);
    }
  return (
    <div className="detail-bar-box">
      <div className="detail-bar">
        <div className="top-container">
          <div className="delete-container">
            <MdDelete />
          </div>
          <div className="close-container" onClick={()=>setSelectedTaskId(null)}>
            <RxCross2 />
          </div>
        </div>

        {/* <Task task= {let task = {title: "detail bar task"}} /> */}

        <div onClick={toggleFavorite} className="favourite-container">
          Favourite
          {isFavourite ? (
            <MdFavorite className="heart" />
          ) : (
            <MdFavoriteBorder className="heart" />
          )}
        </div>

        <div className="description-box">
          <p>Description</p>
          <textarea placeholder="Enter description"></textarea>
        </div>

        <div className="deadline">
          <p>Deadline</p>
          <input type="date"></input>
        </div>

        <label htmlFor="folder-name">Select Folder</label>
        <select className="folder-name">
          <option value="general"> General</option>
          <option value="work"> Work</option>
          <option value="work"> Work</option>
          <option value="work"> Work</option>
          <option value="add-new">+ Add new</option>
        </select>
      </div>
      <div className="buttons">
        <button>Save</button>
        <button onClick={()=>setSelectedTaskId(null)}>Cancel</button>
      </div>
    </div>
  );
}

export default TaskDetailBar
