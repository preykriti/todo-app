import { useState } from "react";
import Task from "../Task/Task"
import "./TaskDetailBar.css"
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

const TaskDetailBar = () => {
    const [isFavourite, setIsFavourite] = useState(false);
    const toggleFavorite=()=>{
        setIsFavourite(!isFavourite);
    }
  return (
    <div className="detail-bar-box">
      <div className="detail-bar">
        <Task title="detail bar task" />
        <p onClick={toggleFavorite} className="favourite-container">
          Favourite{" "}
          {isFavourite ? (
            <MdFavorite className="heart filled" />
          ) : (
            <MdFavoriteBorder className="heart outline" />
          )}
        </p>
        <div className="description-box">
          <p>Description</p>
          <textarea placeholder="Enter description"></textarea>
        </div>
        <div className="deadline">
          <p>Deadline</p>
          <input type="date"></input>
        </div>
      </div>
      <div className="buttons">
        <button>Save</button>
        <button>Cancel</button>
      </div>
    </div>
  );
}

export default TaskDetailBar
