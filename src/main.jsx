import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import React from 'react'
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import ProctectedRoutes from './Services/ProctectedRoutes.jsx'
import Admin from './components/Admin.jsx'
import Api_integrationprt from './components/Api_integrationprt.jsx'

const router=createBrowserRouter([
      {
        path:'/',
        element:<><ProctectedRoutes/><Home/></>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/admin',
        element:<><ProctectedRoutes/><Admin/></>
      },{
        path:'/api',
        element:<Api_integrationprt/>
      }
    ]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>,
)
