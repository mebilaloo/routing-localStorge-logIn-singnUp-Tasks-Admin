import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProctectedRoutes = () => {
  const auth=localStorage.getItem('loginUser');
  return auth ? <Outlet/> : <Navigate to={"/login"}/>
};

export default ProctectedRoutes