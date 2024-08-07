// import { createBrowserRouter } from "react-router-dom";
// import MainLayout from "../components/layout/MainLayout";
// import Login from "../pages/login/Login";
// import Home from "../pages/home/Home";
// import Contact from "../pages/contact/Contact";
// import About from "../pages/about/About";
// import Cart from "../pages/cart/Cart";
// import SinglePage from "../pages/product/SinglePage";
// import ManageProductLayout from "../pages/manageProducts/ManageProductLayout";
// import Dashboard from "../pages/manageProducts/Dashboard";
// import View from "../pages/manageProducts/crud/View";
// import UpdateProduct from "../pages/manageProducts/crud/UpdateProduct";
// import Checkout from "../pages/cart/Checkout";
// import ProductPage from "../pages/product/ProductPage";
// import AddProducts from "../pages/manageProducts/crud/AddProducts";

// import ProtectedRoute from "../components/layout/ProtectedRoute";
// import SignUp from "../pages/login/SignUp";
// import LoadingPage from "../components/sharedComponants/LoadingPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout></MainLayout>,

//     errorElement: <LoadingPage></LoadingPage>,

//     children: [
//       {
//         path: "/",
//         element: <Home></Home>,
//       },
//       {
//         path: "/contact",
//         element: <Contact />,
//       },

//       {
//         path: "/product/manage/:state",
//         element: <ProductPage />,
//       },
//       {
//         path: "/about",
//         element: <About></About>,
//       },

//       {
//         path: "/cart",
//         element: <Cart></Cart>,
//       },
//       // {
//       //   path: "/myOrder",
//       // element:  <MyOrder></MyOrder>,
//       // },
//       {
//         path: "/checkout",
//         element: (
//           <ProtectedRoute>
//             <Checkout></Checkout>
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/products/:productId",
//         element: <SinglePage></SinglePage>,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login></Login>,
//   },
//   {
//     path: "/signUp",
//     element: <SignUp></SignUp>,
//   },
//   {
//     path: "/manage-products",

//     element: (
//       <ProtectedRoute>
//         <ManageProductLayout></ManageProductLayout>
//       </ProtectedRoute>
//     ),
//     errorElement:<LoadingPage></LoadingPage>,
//     children: [
//       {
//         index: true,
//         // path :'',
//         element: <Dashboard></Dashboard>,
//       },
//       {
//         path: "/manage-products/view",
//         element: <View></View>,
//       },
//       {
//         path: "/manage-products/add-products",
//         element: <AddProducts></AddProducts>,
//       },
//       {
//         path: "/manage-products/update/:id",
//         element: <UpdateProduct></UpdateProduct>,
//       },
//     ],
//   },
// ]);

// export default router;


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
import ProtectedRoute from "../components/layout/ProtectedRoute";
import SignUp from "../pages/login/SignUp";
import LoadingPage from "../components/sharedComponants/LoadingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <LoadingPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/product/manage/:state",
        element: <ProductPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products/:productId",
        element: <SinglePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/manage-products",
    element: (
      <ProtectedRoute>
        <ManageProductLayout />
      </ProtectedRoute>
    ),
    errorElement: <LoadingPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "view",
        element: <View />,
      },
      {
        path: "add-products",
        element: <AddProducts />,
      },
      {
        path: "update/:id",
        element: <UpdateProduct />,
      },
    ],
  },
]);

export default router;
