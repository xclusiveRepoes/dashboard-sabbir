import React, { useState } from "react";

import { TiArrowSortedDown } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { handleAcceptTask, handleDeleteTask } from "../../userSlice/userSlice";
import { GiCheckMark } from "react-icons/gi";
import { BsExclamation } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

const Tasks = ({ data }) => {
  const [isShowDesc, setIsShowDesc] = useState(false);
  const dispatch = useDispatch();

  const handleAccept = () => {
    const updatedTask = { ...data, active: true };
    dispatch(handleAcceptTask(updatedTask));
  };
  const handleComplete = () => {
    const updatedTask = { ...data, completed: true, active: false };
    dispatch(handleAcceptTask(updatedTask));
  };
  const handleFailed = () => {
    const updatedTask = {
      ...data,
      failed: true,
      active: false,
      completed: false,
    };
    dispatch(handleAcceptTask(updatedTask));
  };

  return (
    <div className="min-h-[210px] break-inside-avoid relative w-full flex-shrink-0 bg-neutral-800 rounded-xl px-[30px] sm:px-[50px] py-[25px] sm:py-[35px] mb-[20px]">
      <div>
        <div className="w-full flex items-center justify-between text-[16px]">
          <div className="bg-gray-700 px-[10px] py-[2px] rounded-md">
            <h1>{data.category}</h1>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            {
              data.failed && <span className="text-[40px] absolute right-[70px] leading-[1]  text-red-500"><BsExclamation /></span>
            }
            {
              !data.completed && !data.failed && <h1>{data.taskDate}</h1>
            }
            {
              data.completed && <span className="text-green-300 font-bold text-[20px]"><GiCheckMark /></span>
            }
            {data.active && (
              <div className="flex items-center gap-1 text-green-300 font-medium">
                <div className="w-[12px] h-[12px] bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Active</span>
              </div>
            )}
            <div onClick={() => {dispatch(handleDeleteTask(data.id))}} className="text-[23px] text-red-500 cursor-pointer">
              <MdOutlineCancel />
            </div>
          </div>
        </div>
        <h2 className="mt-[15px] text-[24px]">{data.taskTitle}</h2>
        <h1
          onClick={() => {
            setIsShowDesc(!isShowDesc);
          }}
          className="leading-[1.2] text-[18px] font-normal mt-[10px] underline cursor-pointer text-gray-100 hover:text-gray-200 transition-all duration-200 flex items-end"
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
          <li className="leading-[1.2] text-[18px] font-normal mt-[10px] text-white ">
            {data.taskDescription}
          </li>
        )}
      </div>
      <div className="w-full text-[16px] mt-[25px] flex items-center justify-between">
        {data.active && (
          <>
            <button
              onClick={() => {
                handleComplete();
              }}
              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded transition-all duration-300"
            >
              Mark as Completed
            </button>
            <button
              onClick={() => {
                handleFailed();
              }}
              className="bg-red-600 hover:bg-rose-800 px-3 py-1 rounded transition-all duration-300"
            >
              Mark as Failed
            </button>
          </>
        )}
        {!data.active && !data.completed && !data.failed && (
          <button
            onClick={() => {
              handleAccept();
            }}
            className="bg-gray-700 w-full hover:bg-gray-800 transition-colors duration-300 px-3 py-[5px] rounded"
          >
            Accept Task
          </button>
        )}
        {data.completed && (
          <button className="bg-[#0D9488] cursor-default w-full px-3 py-[5px] rounded">
            Completed!
          </button>
        )}
        {data.failed && (
          <button className="bg-red-600 cursor-default w-full px-3 py-[5px] rounded">
            Failed!
          </button>
        )}
      </div>
    </div>
  );
};

export default Tasks;
