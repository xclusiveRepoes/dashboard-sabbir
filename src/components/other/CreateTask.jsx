import React, { useState } from "react";

const CreateTask = () => {
  const [task, setTask] = useState({
    taskTitle: "",
    taskDescription: "",
    taskDate: "",
    asignTo: "",
    category: "",
    active: false,
    newTask: true,
    failed: false,
    completed: false,
  });
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="w-full px-[10px] md:px-[60px] text-[14px] md:text-[18px]">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          action=""
        >
          <div className="w-full bg-[#1C1C1C] rounded-md p-8">
            <div className="w-full gap-[10px] lg:gap-0 flex flex-col lg:flex-row items-end justify-between">
              <div className="lg:w-1/3 w-full flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[10px]">
                  <h1>Task Title</h1>
                  <input
                    onChange={(e) => {
                      setTask((prevTask) => ({
                        ...prevTask,
                        taskTitle: e.target.value,
                      }));
                    }}
                    value={task.taskTitle}
                    type="text"
                    placeholder="Task title"
                    className="bg-transparent border-2 px-[15px] py-[5px] border-[#bebebe] rounded-md "
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <h1>Date</h1>
                  <input
                    value={task.taskDate}
                    onChange={(e) => {
                      setTask((prevTask) => ({
                        ...prevTask,
                        taskDate: e.target.value,
                      }));
                    }}
                    type="date"
                    className="bg-transparent border-2 px-[15px] py-[5px] border-[#bebebe] rounded-md "
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <h1>Asign to</h1>
                  <input
                    onChange={(e) => {
                      setTask((prevTask) => ({
                        ...prevTask,
                        asignTo: e.target.value,
                      }));
                    }}
                    value={task.asignTo}
                    type="text"
                    placeholder="Employee Name"
                    className="bg-transparent border-2 px-[15px] py-[5px] border-[#bebebe] rounded-md "
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <h1>Catagory</h1>
                  <input
                    onChange={(e) => {
                      setTask((prevTask) => ({
                        ...prevTask,
                        category: e.target.value,
                      }));
                    }}
                    value={task.category}
                    type="text"
                    placeholder="Design, Dev etc."
                    className="bg-transparent border-2 px-[15px] py-[5px] border-[#bebebe] rounded-md "
                  />
                </div>
              </div>
              <div className="lg:w-1/3 w-full flex flex-col gap-[10px]">
                <h1>Description</h1>
                <textarea
                  onChange={(e) => {
                    setTask((prevTask) => ({
                      ...prevTask,
                      taskDescription: e.target.value,
                    }));
                  }}
                  value={task.taskDescription}
                  rows={8}
                  className="bg-transparent p-4 border-2 border-[#bebebe] rounded-md"
                ></textarea>
              </div>
            </div>
            <button className="bg-[#4fb081] py-[8px] rounded-md w-full mt-[20px]">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateTask;
