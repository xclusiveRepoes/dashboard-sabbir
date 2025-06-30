import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTypeOfTask } from "../../userSlice/userSlice";

const TaskListNumber = () => {
  const {typeOfTask} = useSelector(state => state.userSlice)
  const [taskCount, setTaskCount] = useState({
    activeTaskNumber: 0,
    newTask: 0,
    failedTask: 0,
    completedTask: 0,
  });

  const { tasks } = useSelector(
    (state) => state.userSlice.currentUser
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const activeTasks = tasks.filter((task) => task.active);
    const failedTasks = tasks.filter((task) => task.failed);
    const completedTasks = tasks.filter((task) => task.completed);
    const newTasks = tasks.filter(
      (task) => !task.active && !task.completed && !task.failed
    );

    setTaskCount({
      activeTaskNumber: activeTasks.length,
      failedTask: failedTasks.length,
      completedTask: completedTasks.length,
      newTask: newTasks.length,
    });
  }, [tasks]);

  const tasksCount = [
    { name: "New task", color: "bg-blue-500" },
    { name: "Completed task", color: "bg-teal-600" },
    { name: "Active Task", color: "bg-green-600" },
    { name: "Failed task", color: "bg-red-500" },
  ];


  const handleClick = (item) => {
    dispatch(setTypeOfTask(item.name))
  };


  return (
    <div className="w-full flex justify-center sm:justify-between mt-[20px] gap-[10px] lg:gap-[20px] flex-wrap lg:flex-nowrap px-[10px] md:px-[30px]">
      {tasksCount.map((item, index) => {
        const count =
          item.name === "New task"
            ? taskCount.newTask
            : item.name === "Completed task"
            ? taskCount.completedTask
            : item.name === "Active Task"
            ? taskCount.activeTaskNumber
            : item.name === "Failed task"
            ? taskCount.failedTask
            : 0;

        return (
          <div
            onClick={() => handleClick(item)}
            key={index}
            className={`md:w-[45%] w-full px-[20px] py-6 ${item.color}
            ${typeOfTask === item.name ? "border-[4px] border-white" : ""}
            ${item.name === "Active Task" ? "animate-pulse" : ""}
            rounded-xl cursor-pointer text-white text-[21px] font-semibold flex items-center justify-center gap-[10px]`}
          >
            <h1>{count}</h1>
            <h1>{item.name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default TaskListNumber;
