import React, { useEffect, useState } from "react";

import Login from "./components/Auth/Login";

import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase-config";
import { addCurrentUser, addUsers } from "./userSlice/userSlice";
import UploadUser from './UploadUsers'

const App = () => {
  const { currentUser, role } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(
            addCurrentUser({
              currentUser: docSnap.data(),
              role: docSnap.data().role,
            })
          );
        }
      }
    });
  };

  const fetchAllUsersData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      let admins = [];
      let employees = [];

      querySnapshot.forEach((doc) => {
        let user = doc.data();
        if (user.role === "admin") {
          admins.push(user);
        } else if (user.role === "employee") {
          employees.push(user);
        }
      });
      dispatch(addUsers({ admin: admins, employees: employees }));
    } catch (error) {
      console.error("❌ Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    if (role === "admin") {
      fetchAllUsersData();
    }
  }, []);

  return (
    <>
      {!currentUser.uid && <Login />}
      {role && role === "admin" && <AdminDashboard />}
      {role && role === "employee" && <EmployeeDashboard />}
    </>
  );
};

export default App;
