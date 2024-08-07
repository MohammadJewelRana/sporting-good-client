import { Outlet,   } from "react-router-dom";


import Footer from "../sharedComponants/Footer";

// import Topbar from "../sharedComponants/Topbar";
import HeaderComponants from "../sharedComponants/HeaderComponants";
import Navbar from "../sharedComponants/Navbar";
 

const MainLayout = () => {



  return (
    <div>
 
      <HeaderComponants></HeaderComponants>
 
      <Navbar></Navbar>
      {/* <button onClick={handleLogout}>Logout</button> */}
     <div className="bg-base-200">
     <Outlet></Outlet>
     </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
