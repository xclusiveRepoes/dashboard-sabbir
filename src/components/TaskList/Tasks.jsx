import React, { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  handleTaskCondition,
  handleDeleteTask,
  setLoadingOn,
  setLoadingOff,
} from "../../userSlice/userSlice";
import { GiCheckMark } from "react-icons/gi";
import { BsExclamation } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import {
  setDefaultPermission,
  setTasksPermission,
} from "../../userSlice/dropDownSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { toast } from "react-toastify";

const Tasks = ({ data }) => {
  const { currentUser } = useSelector((state) => state.userSlice);
  const { isPermit, permitText } = useSelector((state) => state.dropDownSlice);
  const dispatch = useDispatch();

  const [isShowDesc, setIsShowDesc] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // accept / complete / fail
  const [pendingDeleteId, setPendingDeleteId] = useState(null); // task ID

  const updateDatabase = async (updatedTask) => {
    dispatch(setLoadingOn());
    try {
      const updatedTasks = currentUser.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      const userRef = doc(db, "Users", currentUser.uid);
      await updateDoc(userRef, { tasks: updatedTasks });
      dispatch(handleTaskCondition(updatedTask));
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

  const updateDeleteTaskDatabase = async (id) => {
    dispatch(setLoadingOn());
    try {
      const updatedTasks = currentUser.tasks.filter((task) => task.id !== id);
      const userRef = doc(db, "Users", currentUser.uid);
      await updateDoc(userRef, { tasks: updatedTasks });
      dispatch(setLoadingOff());
      dispatch(handleDeleteTask(id));
      toast.success("Successfully deleted task!", { position: "top-center" });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Something went wrong while deleting task!", {
        position: "top-center",
      });
      dispatch(setLoadingOff());
    }
  };

  useEffect(() => {
    if (isPermit) {
      // ✅ Only act if this task is responsible
      if (pendingAction && data.id === data.id) {
        let updatedTask = { ...data };

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

      if (pendingDeleteId === data.id) {
        updateDeleteTaskDatabase(pendingDeleteId);
        setPendingDeleteId(null);
        dispatch(setDefaultPermission());
      }
    }
  }, [isPermit]);

  // 👉 Action Triggers
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

  const handleDelete = (id) => {
    setPendingDeleteId(id);
    dispatch(setTasksPermission("deleted"));
  };

  return (
  <div className="min-h-[210px] break-inside-avoid relative w-full flex-shrink-0 bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 text-black dark:text-white rounded-xl px-[30px] sm:px-[50px] py-[25px] sm:py-[35px] mb-[20px] shadow-md hover:shadow-xl transition-shadow duration-300">
    <div>
      <div className="w-full flex items-center justify-between text-[12px] md:text-[14px]">
        <div className="bg-gray-500 text-white px-[10px] py-[2px] rounded-md capitalize">
          <h1>{data.category}</h1>
        </div>
        <div className="flex items-center justify-center gap-[10px]">
          {data.failed && (
            <span className="text-[30px] md:text-[30px] absolute right-[70px] leading-[1] text-red-500">
              <BsExclamation />
            </span>
          )}
          {data.completed && (
            <span className="text-green-400 font-bold text-[15px] md:text-[17px]">
              <GiCheckMark />
            </span>
          )}
          {data.active && (
            <div className="flex items-center gap-1 text-green-400 font-medium">
              <div className="w-[12px] h-[12px] bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Active</span>
            </div>
          )}
          <div
            onClick={() => handleDelete(data.id)}
            className="text-[20px] md:text-[22px] text-red-500 cursor-pointer"
          >
            <MdOutlineCancel />
          </div>
        </div>
      </div>

      <h2 className="mt-[15px] text-[18px] md:text-[20px] capitalize">
        {data.taskTitle}
      </h2>

      <h1
        onClick={() => setIsShowDesc(!isShowDesc)}
        className="leading-[1.2] text-[14px] md:text-[15px] font-normal mt-[10px] underline cursor-pointer text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-800 transition-all duration-200 flex items-end"
      >
        Description{" "}
        <span
          className={`${
            isShowDesc ? "rotate-0" : "-rotate-90"
          } transition-all duration-300`}
        >
          <TiArrowSortedDown />
        </span>
      </h1>

      {isShowDesc && (
        <li className="leading-[1.2] text-[15px] md:text-[16px] font-normal mt-[10px] text-gray-800 dark:text-gray-300">
          {data.taskDescription}
        </li>
      )}

      {!data.completed && !data.failed && (
        <h1 className="mt-[10px] text-[15px] dark:text-gray-200 text-gray-900 md:text-[16px] font-normal">
          <span className="font-bold">Deadline:</span> {data.taskDate}
        </h1>
      )}
    </div>

    {/* ✅ ACTION BUTTONS */}
    <div className="w-full text-[12px] md:text-[14px] mt-[25px] flex items-center justify-between">
      {data.active && (
        <div className="flex justify-between w-full items-start gap-[5px]">
          <button
            onClick={handleComplete}
            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded transition-all duration-300 text-white"
          >
            Mark as Completed
          </button>
          <button
            onClick={handleFailed}
            className="bg-red-600 text-white hover:bg-rose-800 px-3 py-1 rounded transition-all duration-300"
          >
            Mark as Failed
          </button>
        </div>
      )}

      {!data.active && !data.completed && !data.failed && (
        <button
          onClick={handleAccept}
          className="dark:bg-gray-700 bg-gray-500 hover:bg-gray-600 text-white w-full dark:hover:bg-gray-800 transition-colors duration-300 px-3 py-[5px] rounded"
        >
          Accept Task
        </button>
      )}

      {data.completed && (
        <button className="bg-[#0D9488] text-white cursor-default w-full px-3 py-[5px] rounded">
          Completed!
        </button>
      )}

      {data.failed && (
        <button className="bg-red-600 cursor-default w-full px-3 py-[5px] rounded text-white">
          Failed!
        </button>
      )}
    </div>
  </div>
);

};

export default Tasks;
