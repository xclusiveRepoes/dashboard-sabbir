import React from "react";
import Header from "../other/Header";
import CreateTask from "../other/CreateTask";
import AllTasks from "../other/AllTasks";
import AdminChart from "../AdminChart";

const AdminDashboard = () => {
  return (
    <div className="w-full min-h-screen md:pb-[40px] bg-gray-300 dark:bg-[#252525] text-gray-800 dark:text-white">
      <div className="px-[30px]">
        <Header />
      </div>
      <div className="flex flex-col gap-[20px]">
        <CreateTask />
        <AdminChart />
        <AllTasks />
      </div>
    </div>
  );
};

export default AdminDashboard;
