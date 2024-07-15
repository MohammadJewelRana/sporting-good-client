import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Contact from "../pages/contact/Contact";
import About from "../pages/about/About";
import Cart from "../pages/cart/Cart";
import SinglePage from "../pages/product/SinglePage";
import ManageProductLayout from "../pages/manageProducts/ManageProductLayout";
import Dashboard from "../pages/manageProducts/Dashboard";
import View from "../pages/manageProducts/crud/View";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/products/:productId",
        element: <SinglePage></SinglePage>,
      },
      // {
      //     path:'/manage-products',
      //     element:   <ManageProductLayout></ManageProductLayout>,
      //     children:[
      //         {
      //           index:true,
      //             // path :'',
      //             element:<Dashboard></Dashboard>

      //         }
      //     ]
      // },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/manage-products",
    element: <ManageProductLayout></ManageProductLayout>,
    children: [
      {
        index: true,
        // path :'',
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/manage-products/view",
        element: <View></View>,
      },
    ],
  },
]);

export default router;
