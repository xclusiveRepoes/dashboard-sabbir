import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserTaskCounts = ({elem}) => {
    const {currentUser} = useSelector(state => state.userSlice)
    const [taskLengths, setTaskLengths] = useState({
        pending: '',
        completed: '',
        failed: '',
    })

    useEffect(() => {
        let pending = elem.tasks.filter(task => !task.active && !task.completed && !task.failed)
        let completed = elem.tasks.filter(task => task.completed)
        let failed = elem.tasks.filter(task => task.failed)
        setTaskLengths({
            pending: pending,
            completed: completed,
            failed : failed
        })
    }, [currentUser.tasks, elem])

  return (
    <article
      className={`flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-800 dark:border-green-600 last:border-none px-4 py-3`}
    >
      <div className="md:w-1/4 text-center md:border-r border-green-600 py-1 capitalize">
        <span className="font-semibold md:hidden block">Employee:</span>
        {elem.firstName}
      </div>
      <div className="md:w-1/4 text-center md:border-r border-green-600 py-1">
        <span className="font-semibold md:hidden block">Pending:</span>
        {taskLengths.pending.length}
      </div>
      <div className="md:w-1/4 text-center md:border-r border-green-600 py-1">
        <span className="font-semibold md:hidden block">Completed:</span>
        {taskLengths.completed.length}
      </div>
      <div className="md:w-1/4 text-center py-1">
        <span className="font-semibold md:hidden block">Failed:</span>
        {taskLengths.failed.length}
      </div>
    </article>
  );
};

export default UserTaskCounts;
