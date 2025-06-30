import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import TaskDetails from "./components/TaskDetails";
import Header from "./components/other/Header";
import { useSelector } from "react-redux";

const Pagination = () => {
  const { isLight } = useSelector((state) => state.userSlice);
  useEffect(() => {
    if (isLight) {
      document.querySelector("html").classList.remove("dark");
    } else {
      document.querySelector("html").classList.add("dark");
    }
  }, [isLight]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/task-details" element={<TaskDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pagination;
