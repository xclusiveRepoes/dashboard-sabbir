import React, { useEffect, useState } from "react";

import Login from "./components/Auth/Login";

import { useSelector } from "react-redux";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import SignUp from "./components/Auth/SignUp";

const App = () => {
  const { currentUser, role, isSignUpShow } = useSelector(
    (state) => state.userSlice
  );

  return (
    <>
      {!currentUser.uid && !isSignUpShow && <Login />}
      {role && role === "admin" && <AdminDashboard />}
      {role && role === "employee" && <EmployeeDashboard />}
      {isSignUpShow && <SignUp />}
    </>
  );
};

export default App;
