import React, { useEffect, useState } from "react";
import Header from "../other/Header";
import TaskListNumber from "../other/TaskListNumber";
import TaskList from "../TaskList/TaskList";
import { useDispatch, useSelector } from "react-redux";
import { handleToShowTasks } from "../../userSlice/userSlice";

const EmployeeDashboard = () => {
  const { tasks } = useSelector((state) => state.userSlice.currentUser);

  const [typeOfTask, setTypeOfTask] = useState("New task");
  const { toShowTasks } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleToShowTasks(tasks));
  }, []);

  return (
    <div className="w-full min-h-screen lg:h-screen bg-gray-300 dark:bg-[#1c1c1c] sm:px-[60px] md:px-[10px] lg:px-[60px] overflow-x-hidden">
      <div className="w-full md:px-[30px] px-[10px]">
        <Header />
      </div>
      <TaskListNumber
        typeOfTask={typeOfTask}
        setTypeOfTask={setTypeOfTask}
      />
      <TaskList typeOfTask={typeOfTask} />
      {toShowTasks?.length === 0 && (
        <div className="text-center w-full text-[19px] text-gray-200 md:text-[21px] xl:text-[24px]">
          {toShowTasks.length === 0 && (
            <h1 className="text-start w-full flex items-center text-gray-800 dark:text-white justify-center">
              No {typeOfTask} to Show{" "}
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
