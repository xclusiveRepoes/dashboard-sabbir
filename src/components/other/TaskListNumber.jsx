import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TaskListNumber = () => {
  const [taskCount, setTaskCount] = useState({
    activeTaskNumber: 0,
    newTask: 0,
    failedTask: 0,
    completedTask: 0
  });
  const { tasks } = useSelector((state) => state.userSlice.currentUser);
  useEffect(() => {
    let activeTasks = tasks.filter((task) => {
      return task.active;
    });
    let failedTasks = tasks.filter((task) => {
      return task.failed;
    });
    let completedTasks = tasks.filter((task) => {
      return task.completed;
    });
    let newTasks = tasks.filter((task) => {
      return !task.active && !task.completed && !task.failed;
    });
    setTaskCount((prev) => ({
      ...prev,
      activeTaskNumber: activeTasks.length,
      failedTask: failedTasks.length,
      completedTask: completedTasks.length,
      newTask: newTasks.length
    }));
  }, [tasks]);
  const tasksCount = [
    { name: "New task", count: taskCount.newTask, color: "bg-blue-500" },
    {
      name: "Completed task",
      count: taskCount.completedTask,
      color: "bg-teal-600",
    },
    { name: "Active Task", count: taskCount.activeTaskNumber, color: "bg-green-600" },
    { name: "Failed task", count: taskCount.failedTask, color: "bg-red-500" },
  ];
  return (
    <div className="w-full flex justify-center sm:justify-between mt-[20px] gap-[10px] lg:gap-[20px] flex-wrap lg:flex-nowrap px-[30px]">
      {tasksCount.map((item, index) => (
        <div
          key={index}
          className={`md:w-[45%] ${
            item.name === "Active Task" && "animate-pulse"
          } w-full px-[20px] py-6 ${
            item.color
          } rounded-xl text-white text-[21px] font-semibold flex items-center justify-center gap-[10px]`}
        >
          <h1>{item.count}</h1>
          <h1>{item.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default TaskListNumber;
