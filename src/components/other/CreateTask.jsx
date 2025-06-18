import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskFromAdmin,
  setLoadingOff,
  setLoadingOn,
} from "../../userSlice/userSlice";
import { v4 as uuidv4 } from "uuid";

import { db } from "../../firebase-config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const CreateTask = () => {
  const { employees } = useSelector((state) => state.userSlice);
  const [task, setTask] = useState({
    taskTitle: "",
    taskDescription: "",
    taskDate: "",
    category: "",
    active: false,
    failed: false,
    completed: false,
    id: uuidv4(),
  });

  const [asignTo, setAsignTo] = useState("");
  const dispatch = useDispatch();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = useMemo(() => {
    const query = asignTo.toLowerCase();
    return employees.filter((employee) =>
      employee.firstName?.toLowerCase().startsWith(query)
    );
  }, [asignTo, employees]);

  const updateDatabase = async () => {
    let user = employees.find(
      (user) =>
        user.firstName.trim().toLowerCase() === asignTo.trim().toLowerCase()
    );

    if (!user) {
      dispatch(setLoadingOff());
      toast.error('User not found!')
      console.log("User not found in employee list");
      return;
    }

    const userRef = doc(db, "Users", user.uid);

    try {
      const userDoc = await getDoc(userRef);

      let updatedTasks;

      if (userDoc.exists()) {
        const existingTasks = userDoc.data().tasks || [];
        updatedTasks = [...existingTasks, task];
        await updateDoc(userRef, { tasks: updatedTasks });
        toast.success("Successfully added task!", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        updatedTasks = [task];
        toast.error("Failed to add task!", {
          position: "top-center",
          autoClose: 3000,
        });
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email || "",
          firstName: user.firstName || asignTo,
          tasks: updatedTasks,
        });
      }

      dispatch(setLoadingOff());
    } catch (error) {
      dispatch(setLoadingOff());
      console.log("Error updating/creating user document:", error);
      toast.error("Failed to add task!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setLoadingOn());
    dispatch(addTaskFromAdmin({ asignTo, task }));
    updateDatabase();
    setTask({
      taskTitle: "",
      taskDescription: "",
      taskDate: "",
      category: "",
      active: false,
      failed: false,
      completed: false,
      id: uuidv4(),
    });
    setAsignTo('')
  };

  return (
    <div className="w-full px-4 md:px-[60px] text-[14px] md:text-[18px]">
      <form onSubmit={submitHandler}>
        <div className="w-full dark:bg-[#1C1C1C] bg-[#9ca3af8e] rounded-md p-8">
          <div className="w-full gap-[10px] lg:gap-0 flex flex-col lg:flex-row items-end justify-between">
            {/* Left Column */}
            <div className="lg:w-1/3 w-full flex flex-col gap-[10px]">
              <div className="flex flex-col gap-[10px]">
                <h1>Task Title</h1>
                <input
                  required
                  type="text"
                  placeholder="Task title"
                  className="bg-transparent border-2 px-[15px] py-[5px] border-gray-600 capitalize placeholder:text-gray-700 dark:placeholder:text-gray-400 dark:border-[#bebebe] outline-none rounded-md"
                  value={task.taskTitle}
                  onChange={(e) =>
                    setTask({ ...task, taskTitle: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-[10px]">
                <h1>Date</h1>
                <input
                  required
                  type="date"
                  className="bg-transparent border-2 px-[15px] py-[5px] border-gray-600 placeholder:text-gray-700 dark:placeholder:text-gray-400 dark:border-[#bebebe] outline-none rounded-md"
                  value={task.taskDate}
                  onChange={(e) =>
                    setTask({ ...task, taskDate: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-[10px] relative">
                <h1>Assign to</h1>
                <input
                  required
                  type="text"
                  placeholder="Employee Name"
                  className="bg-transparent border-2 px-[15px] py-[5px] border-gray-600 placeholder:text-gray-700 dark:placeholder:text-gray-400 dark:border-[#bebebe] outline-none rounded-md capitalize"
                  value={asignTo}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => {
                      setShowSuggestions(false);
                    }, 300)
                  }
                  onChange={(e) => setAsignTo(e.target.value)}
                />
                {showSuggestions && (
                  <div className="absolute top-full w-full max-h-[200px] overflow-y-auto bg-white text-black mt-1 rounded-md shadow-md z-10 border border-gray-300 capitalize">
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map((employee, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setAsignTo(employee.firstName);
                            setShowSuggestions(false);
                          }}
                          className="px-4 py-2 hover:bg-[#4fb081] hover:text-white cursor-pointer transition-all duration-150"
                        >
                          {employee.firstName}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500 italic">
                        No matching employee found.
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-[10px]">
                <h1>Category</h1>
                <input
                  required
                  type="text"
                  placeholder="Design, Dev etc."
                  className="bg-transparent capitalize border-2 px-[15px] py-[5px] border-gray-600 placeholder:text-gray-700 dark:placeholder:text-gray-400 dark:border-[#bebebe] outline-none rounded-md"
                  value={task.category}
                  onChange={(e) =>
                    setTask({ ...task, category: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:w-1/3 w-full flex flex-col gap-[10px]">
              <h1>Description</h1>
              <textarea
                required
                rows={8}
                className="bg-transparent p-4 border-2 border-gray-600 dark:border-[#bebebe] rounded-md"
                value={task.taskDescription}
                onChange={(e) =>
                  setTask({ ...task, taskDescription: e.target.value })
                }
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-500 font-bold text-white py-[8px] rounded-md w-full mt-[20px] hover:bg-green-600 transition-all duration-200"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
