import "./Sidebar.css"
import FoldersList from "../FoldersList/FoldersList";
import { useContext, useState } from "react";
import FolderContext from "../../context/taskFolder/taskFolderContext";

const Sidebar: React.FC = () => {

  const [showInputBox, setShowInputBox] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const context = useContext(FolderContext);
  if (!context) {
    return <div>Error: No Context</div>;
  }
  const {createFolder} = context;

  const handleSave = async ()=>{
    if(!newFolderName.trim()){
      setShowInputBox(false);
      return;
    }
    const success = await createFolder(newFolderName.trim());
    if(success){
      setNewFolderName("");
      setShowInputBox(false);
    }
    
  }
  const handleCancel = () => {
    setShowInputBox(false);
    setNewFolderName("");
  };

  //!for keyboard
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === 'Enter'){
      handleSave();
    }
    else if(e.key === 'Escape'){
      handleCancel();
    }
  }

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
                onKeyDown={handleKeyPress}
                autoFocus
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