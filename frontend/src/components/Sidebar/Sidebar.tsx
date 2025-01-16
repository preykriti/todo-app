import "./Sidebar.css"
import FoldersList from "../FoldersList/FoldersList";
import { useContext, useState } from "react";
import FolderContext from "../../context/taskFolder/taskFolderContext";

const Sidebar: React.FC = () => {

  const [showInputBox, setShowInputBox] = useState(true);
  const [newFolderName, setNewFolderName] = useState("");
  const context = useContext(FolderContext);
  if (!context) {
    return <div>Error: No Context</div>;
  }
  const {createFolder} = context;

  const handleSave=()=>{
    if(!newFolderName.trim()){
      setShowInputBox(false);
      return;
    }
    
  }
  const handleCancel = () => {
    setShowInputBox(false);
    setNewFolderName("");
  };

  return (
    <div className="sidebar">
      <ul className="today-bar">
        <li>
          Today <span>10</span>
        </li>
        <li>Important</li>
        <li>All Tasks</li>
      </ul>
      <hr></hr>
      <ul>
        <li className="my-folders">
          MY FOLDERS <span onClick={() => setShowInputBox(true)}>+</span>
          {showInputBox && (
            <div className="input-box">
              <input
                type="text"
                value={newFolderName}
                placeholder="Enter folder name"
                onChange={(e) => setNewFolderName(e.target.value)}
              />
              <div className="buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          )}
        </li>
        <FoldersList />
      </ul>
    </div>
  );
}

export default Sidebar