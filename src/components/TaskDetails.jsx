import React, { useEffect, useState } from "react";
import Header from "./other/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  setDefaultPermission,
  setTasksPermission,
} from "../userSlice/dropDownSlice";
import {
  handleTaskCondition,
  setLoadingOn,
  setLoadingOff,
} from "../userSlice/userSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";

const TaskDetails = () => {
  const { taskDets, currentUser } = useSelector((state) => state.userSlice);
  const { isPermit, permitText } = useSelector((state) => state.dropDownSlice);
  const dispatch = useDispatch();

  const [pendingAction, setPendingAction] = useState(null);
  const [localTask, setLocalTask] = useState(taskDets); // local task state

  // Sync localTask when taskDets changes
  useEffect(() => {
    setLocalTask(taskDets);
  }, [taskDets]);

  const updateDatabase = async (updatedTask) => {
    dispatch(setLoadingOn());
    try {
      const updatedTasks = currentUser.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      const userRef = doc(db, "Users", currentUser.uid);
      await updateDoc(userRef, { tasks: updatedTasks });
      dispatch(handleTaskCondition(updatedTask));
      setLocalTask(updatedTask); // update local task for immediate UI response
      toast.success(`Successfully ${permitText} task`, {
        position: "top-center",
      });
      dispatch(setLoadingOff());
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Something went wrong while updating task!", {
        position: "top-center",
      });
      dispatch(setLoadingOff());
    }
  };

  useEffect(() => {
    if (isPermit && pendingAction && localTask) {
      let updatedTask = { ...localTask };

      if (pendingAction === "accept") {
        updatedTask.active = true;
        updatedTask.completed = false;
        updatedTask.failed = false;
      } else if (pendingAction === "complete") {
        updatedTask.completed = true;
        updatedTask.active = false;
        updatedTask.failed = false;
      } else if (pendingAction === "fail") {
        updatedTask.failed = true;
        updatedTask.active = false;
        updatedTask.completed = false;
      }

      updateDatabase(updatedTask);
      setPendingAction(null);
      dispatch(setDefaultPermission());
    }
  }, [isPermit]);

  const handleAccept = () => {
    setPendingAction("accept");
    dispatch(setTasksPermission("accepted"));
  };

  const handleComplete = () => {
    setPendingAction("complete");
    dispatch(setTasksPermission("marked as completed"));
  };

  const handleFailed = () => {
    setPendingAction("fail");
    dispatch(setTasksPermission("marked as failed"));
  };

  return (
    <div className="w-full h-screen md:pb-[40px] flex flex-col items-center bg-gray-300 dark:bg-[#252525] text-gray-800 dark:text-white px-[30px] pb-[30px]">
      <Header />
      <div className="sm:px-[30px] w-full h-[100%] lg:w-[80%] xl:w-[60%] sm:bg-[#ffffff41] rounded-md flex flex-col items-center justify-around">
        <div className="py-[20px] w-full flex flex-col gap-[40px]">
          <div className="w-full sm:flex items-end justify-between">
            <h1 className="font-bold text-[19px] mr-[10px]">
              <span className="italic">Task Title:</span> {localTask?.taskTitle}
            </h1>
            {!localTask?.completed && !localTask?.failed && (
              <h1 className="font-bold text-[19px]">
                <span className="font-bold">Deadline:</span>{" "}
                {localTask?.taskDate}
              </h1>
            )}
          </div>
          <div className="">
              <span className="font-bold text-[24px]">Task Description:</span>
              <article className="overflow-y-auto h-[43vh] sm:h-[35vh] mt[20px]">
                {localTask?.taskDescription}
              </article>
            </div>
        </div>

        <div className="mt-[30px] flex gap-4 flex-wrap">
          {localTask?.active && (
            <>
              <button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white transition-all duration-300"
              >
                Mark as Completed
              </button>
              <button
                onClick={handleFailed}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition-all duration-300"
              >
                Mark as Failed
              </button>
            </>
          )}

          {!localTask?.active &&
            !localTask?.completed &&
            !localTask?.failed && (
              <button
                onClick={handleAccept}
                className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded text-white transition-all duration-300"
              >
                Accept Task
              </button>
            )}

          {localTask?.completed && (
            <button className="bg-teal-700 px-4 py-2 rounded text-white cursor-default">
              Completed!
            </button>
          )}

          {localTask?.failed && (
            <button className="bg-red-600 px-4 py-2 rounded text-white cursor-default">
              Failed!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
