import { FaAddressBook, FaLocationArrow, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/features/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { deleteShoppingCart } from "../../utils/localStorage";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import LoadingPage from "./LoadingPage";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());

    deleteShoppingCart();

    navigate("/login");
  };
  const authContext = useContext(AuthContext);
  if(!authContext){
    return <LoadingPage></LoadingPage>
  }
  const { user } = authContext;

  return (
    <div className="  flex flex-col box-border  ">
      {/* <div className="  md:px-12 w-full   flex justify-between items-center border border-b-gray-200 "> */}
      <div className="  flex flex-wrap items-center justify-between md:gap-12   border border-b-gray-200 px-2  md:px-12  ">
        <div className="flex gap-8   p-3  ">
          <div className="flex justify-center items-center">
            <FaLocationArrow className="text-green-600 text-xl"></FaLocationArrow>
          </div>
          <div>
            <p className="  text-gray-400">Store Location</p>
            <h1 className="font-bold text-gray-600">USA</h1>
          </div>
        </div>

        <div className="    "></div>

        <div className="flex gap-8    p-3 ">
          <div className="flex justify-center items-center">
            <FaAddressBook className="text-green-600 text-xl" />
          </div>
          <div>
            <p className="  text-gray-400"> Call Us Now</p>
            <h1 className="font-bold text-green-600"> +013269524128</h1>
          </div>
        </div>

        <div className="flex gap-8    p-3 ">
          <div className="flex justify-center items-center">
            <FaUser className="text-green-600 text-xl"></FaUser>
          </div>
          <div>
            <p className="  text-gray-400"> Welcome</p>
            <h1 className="font-bold text-green-600"> My Account</h1>
          </div>
        </div>

        <div className="flex gap-8     ">
          <div className=" flex  items-center justify-center">
            {user ? (
              <>
                {" "}
                <button
                  onClick={handleLogout}
                  className="rounded-lg  w-full font-bold bg-green-600 text-white px-4 py-2"
                >
                  Logout
                </button>
              </>
            ) : (


             <Link to='/login'>
               <button
                onClick={handleLogout}
                className="rounded-lg  w-full font-bold bg-green-600 text-white px-4 py-2"
              >
                Login
              </button>
             </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
