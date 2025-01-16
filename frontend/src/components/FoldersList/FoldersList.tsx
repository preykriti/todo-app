import { useContext } from "react";
import FolderContext from "../../context/taskFolder/taskFolderContext";

const FoldersList = () => {
  const context = useContext(FolderContext);
   if (!context) {
     return <div>Error: No Context</div>;
   }
  const {folders, error,currentFolderId, fetchTaskFromOneFolder} = context;
 

  // if (isLoading) return <div>Loading Folders...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleFolderClick=(folderID: string)=>{
    fetchTaskFromOneFolder(folderID);
  }

  return (
    <>
    {folders.map((item)=>(<li key={item._id} onClick={()=>handleFolderClick(item._id)} className={item._id ===currentFolderId?'selected':''}>{item.name}</li>))}
      <li>Personal</li>
      <li>Grocery</li>
      <li>Shopping</li>
      <li>College</li>

    </>
  );
};

export default FoldersList;
