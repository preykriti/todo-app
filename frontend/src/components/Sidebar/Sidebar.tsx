import "./Sidebar.css"
import FoldersList from "../FoldersList/FoldersList";
import { useContext } from "react";
import FolderContext from "../../context/taskFolder/taskFolderContext";

const Sidebar: React.FC = () => {

  const context = useContext(FolderContext);
  if (!context) {
    return <div>Error: No Context</div>;
  }

  return (
    <div className="sidebar">
      <ul className="today-bar">
        <li>
          Today <span onClick={handleAddFolder}>10</span>
        </li>
        <li>Important</li>
        <li>All Tasks</li>
      </ul>
      <hr></hr>
      <ul>
        <li className="my-folders">
          MY FOLDERS <span>+</span>
        </li>
        <FoldersList/>
      </ul>
    </div>
  );
}

export default Sidebar