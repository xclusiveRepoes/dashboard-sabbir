import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskFromAdmin } from "../../userSlice/userSlice";
import { v4 as uuidv4 } from 'uuid';

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
    id: uuidv4()
  });

  const [asignTo, setAsignTo] = useState('')

  const dispatch = useDispatch()
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = useMemo(() => {
    const query = asignTo.toLowerCase();
    return employees.filter((employee) =>
      employee.firstName?.toLowerCase().startsWith(query)
    );
  }, [asignTo, employees]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addTaskFromAdmin({asignTo, task}))
  console.log(employees);

  };

  return (
    <div className="w-full px-[10px] md:px-[60px] text-[14px] md:text-[18px]">
      <form onSubmit={submitHandler}>
        <div className="w-full bg-[#1C1C1C] rounded-md p-8">
          <div className="w-full gap-[10px] lg:gap-0 flex flex-col lg:flex-row items-end justify-between">
            <div className="lg:w-1/3 w-full flex flex-col gap-[10px]">
              <div className="flex flex-col gap-[10px]">
                <h1>Task Title</h1>
                <input
                  type="text"
                  placeholder="Task title"
                  className="bg-transparent border-2 px-[15px] py-[5px] border-[#bebebe] rounded-md"
                  value={task.taskTitle}
                  onChange={(e) =>
                    setTask({ ...task, taskTitle: e.target.value })
                  }
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-[10px]">
                <h1>Date</h1>
                <input
                  type="date"
                  className="bg-transparent border-2 px-[15px] py-[5px] border-[#bebebe] rounded-md"
                  value={task.taskDate}
                  onChange={(e) =>
                    setTask({ ...task, taskDate: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-[10px] relative">
                <h1>Assign to</h1>
                <input
                  type="text"
                  placeholder="Employee Name"
                  className="bg-transparent border-2 px-[15px] py-[5px] border-[#bebebe] rounded-md"
                  value={asignTo}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => {
                    setShowSuggestions(false)
                  }, 300)}
                  onChange={(e) =>
                    setAsignTo(e.target.value)
                  }
                />
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full w-full max-h-[200px] overflow-y-auto bg-white text-black mt-1 rounded-md shadow-md z-10 border border-gray-300">
                    {filteredSuggestions.map((employee, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setAsignTo(employee.firstName)
                          setShowSuggestions(false);
                        }}
                        className="px-4 py-2 hover:bg-[#4fb081] hover:text-white cursor-pointer transition-all duration-150"
                      >
                        {employee.firstName}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Category */}
              <div className="flex flex-col gap-[10px]">
                <h1>Category</h1>
                <input
                  type="text"
                  placeholder="Design, Dev etc."
                  className="bg-transparent border-2 px-[15px] py-[5px] border-[#bebebe] rounded-md"
                  value={task.category}
                  onChange={(e) =>
                    setTask({ ...task, category: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="lg:w-1/3 w-full flex flex-col gap-[10px]">
              <h1>Description</h1>
              <textarea
                rows={8}
                className="bg-transparent p-4 border-2 border-[#bebebe] rounded-md"
                value={task.taskDescription}
                onChange={(e) =>
                  setTask({ ...task, taskDescription: e.target.value })
                }
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#4fb081] py-[8px] rounded-md w-full mt-[20px] hover:bg-[#3c9069] transition-all duration-200"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
