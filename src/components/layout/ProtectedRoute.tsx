// import { ReactNode, useContext } from "react";
// import { useAppSelector } from "../../redux/features/hooks";
// import { useCurrentToken } from "../../redux/features/auth/authSlice";
// import { Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../../Provider/AuthProvider";

// const ProtectedRoute = ({ children }: { children: ReactNode }) => {
//   const location = useLocation();

//   const { user } = useContext(AuthContext);
//   const token = useAppSelector(useCurrentToken);
//   if (!token) {
//     return <Navigate to="/login" replace={true}></Navigate>;
//     // return <Navigate to="/login" replace state={{ from: location }}></Navigate>;
//   }

//   // if (user) {
//   //   return children;
//   // }

//   // return children;

//   // return <Navigate to="/login" replace state={{ from: location }}></Navigate>;
// };

// export default ProtectedRoute;



// import { ReactNode, useContext } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../../Provider/AuthProvider';





// const ProtectedRoute = ({children}: { children: ReactNode }) => {

//     const {user}=useContext(AuthContext);
//   const location=useLocation();

//   // if(loading){
//   //   return <LoadingPage></LoadingPage>;
//   // }

//     if(user){
//         return children;
//     }

//     return <Navigate to='/login' replace state={{ from:location }}  ></Navigate>;

// };

// export default ProtectedRoute;



import { ReactNode, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  // Check if authContext is null or if user is null
  if (!authContext || !authContext.user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If user exists, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
