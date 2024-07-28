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
import UpdateProduct from "../pages/manageProducts/crud/UpdateProduct";
import Checkout from "../pages/cart/Checkout";
import ProductPage from "../pages/product/ProductPage";
import AddProducts from "../pages/manageProducts/crud/AddProducts";

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
        path: "/product",
        element: <ProductPage />,
      },
      {
        path: "/product/manage/:state",
        element: <ProductPage />,
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
        path: "/checkout",
        element:  <Checkout></Checkout>,
      },
      {
        path: "/products/:productId",
        element: <SinglePage></SinglePage>,
      },
      
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
      {
        path: "/manage-products/add-products",
        element: <AddProducts></AddProducts>,
      },
      {
        path: "/manage-products/:id",
        element:  <UpdateProduct></UpdateProduct>,
      },
    ],
  },
]);

export default router;
