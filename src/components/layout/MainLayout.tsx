import { Outlet,   } from "react-router-dom";
import {
 
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import {   useAppSelector } from "../../redux/features/hooks";
import { useGetAllProductQuery } from "../../redux/features/products/GetAllProducts";
import Footer from "../sharedComponants/Footer";
 
import Topbar from "../sharedComponants/Topbar";
import Header from "../sharedComponants/Header";
import Navbar from "../sharedComponants/Navbar";

const MainLayout = () => {
  const user = useAppSelector(selectCurrentUser); //get user
  console.log(user);

  const token = useAppSelector(useCurrentToken);

  const { data, error, isLoading } = useGetAllProductQuery(undefined, {
    skip: !token,
  });
  console.log(data);

   

  return (
    <div>
       <Header> </Header>
      {/* <Topbar></Topbar> */}
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
