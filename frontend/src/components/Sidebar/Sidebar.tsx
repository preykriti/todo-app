import "./Sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="today-bar">
        <li>Today <span>10</span></li>
        <li>Important</li>
        <li>All Tasks</li>
      </ul>
      <hr></hr>
      <ul>
        <li className="my-folders">MY FOLDERS <span>+</span></li>
        <li>General</li>
        <li>Personal</li>
        <li>Grocery</li>
      </ul>
    </div>
  );
}

export default Sidebar