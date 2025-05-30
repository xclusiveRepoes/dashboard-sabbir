import React, { useEffect, useState } from "react";

import Login from "./components/Auth/Login";

import {admins, employees} from './utils/localStorage'
import { useDispatch, useSelector } from "react-redux";
import { addUsers } from "./userSlice/userSlice";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";

const App = () => {

  const dispatch = useDispatch()

  const {currentUser, role} = useSelector(state => state.userSlice)

  useEffect(() => {
    dispatch(addUsers({admin: admins, employees: employees}))
  }, [admins, employees])



  return <>{
    !currentUser.id && <Login />
  }
  {role && role === 'admin' && <AdminDashboard />}
  {role && role=== 'employee' && <EmployeeDashboard />}
  </>;
};

export default App;
