import { useSelector } from "react-redux"
import UserTaskCounts from "./UserTaskCounts"

const AllTasks = () => {
  const { employees } = useSelector(state => state.userSlice)
  
  return (
    <section className="w-full px-4 md:px-16 py-4 md:py-10 text-sm md:text-base">
      <div className="w-full bg-[#9ca3af8e] dark:bg-[#1c1c1c] p-4 rounded-lg space-y-2 dark:text-white">
        <header className="hidden md:flex bg-green-500 py-2 px-4 rounded font-semibold text-white border-b border-green-600">
          <div className="w-1/4 text-center border-r border-white">Employee Name</div>
          <div className="w-1/4 text-center border-r border-white">Pending Task</div>
          <div className="w-1/4 text-center border-r border-white">Completed</div>
          <div className="w-1/4 text-center">Failed</div>
        </header>

        {/* Employee Rows */}
        {employees.map((elem, index) => {
          return (
            <UserTaskCounts key={index} elem={elem} />
          )
        })}
      </div>
    </section>
  )
}

export default AllTasks
