import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import TaskDetails from "./components/TaskDetails";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { auth, db } from "./firebase-config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { addCurrentUser, addUsers, setLoadingOff } from "./userSlice/userSlice";
import Loading from "./components/Loading";

const Pagination = () => {
  const { isLight, role, isLoading } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (isLight) {
      document.querySelector("html").classList.remove("dark");
    } else {
      document.querySelector("html").classList.add("dark");
    }
  }, [isLight]);

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
      } else {
        dispatch(setLoadingOff());
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
  }, [role]);

  return (
    <BrowserRouter>
      {isLoading && <Loading />}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/task-details" element={<TaskDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pagination;
