
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
import Contact from '../pages/contact/Contact'
import About from '../pages/about/About'
 

const router =  createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/contact',
                element:<Contact />
            },
            {
                path:'/about',
                element: <About></About>
            },

        ]
    },
    {
        path:'/login',
        element:<Login></Login>
    },
 
])

export default router
