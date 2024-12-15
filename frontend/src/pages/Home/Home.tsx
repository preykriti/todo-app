import MainSpace from "../../components/MainSpace/MainSpace";
import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.css"

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="main">
        <Sidebar />
        <MainSpace />
      </div>
    </>
  );
}

export default Home