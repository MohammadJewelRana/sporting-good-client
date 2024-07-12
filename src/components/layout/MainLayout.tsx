import { Outlet, useNavigate } from "react-router-dom";
import {
  logout,
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
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

  // const navigate = useNavigate();

  // const dispatch = useAppDispatch();
  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate("/login");
  // };

  return (
    <div>
       <Header> </Header>
      <Topbar></Topbar>
      <Navbar></Navbar>
      {/* <button onClick={handleLogout}>Logout</button> */}
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
