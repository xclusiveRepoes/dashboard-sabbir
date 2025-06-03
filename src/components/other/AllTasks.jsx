import { useSelector } from "react-redux"

const AllTasks = () => {
  const { employees } = useSelector(state => state.userSlice)

  return (
    <section className="w-full px-4 md:px-16 py-4 md:py-10 text-sm md:text-base">
      <div className="w-full bg-[#1c1c1c] border border-green-600 p-4 rounded-lg space-y-2 text-white">
        <header className="hidden md:flex bg-green-500 py-2 px-4 rounded font-semibold text-white border-b border-green-600">
          <div className="w-1/4 text-center border-r border-white">Employee Name</div>
          <div className="w-1/4 text-center border-r border-white">Pending Task</div>
          <div className="w-1/4 text-center border-r border-white">Completed</div>
          <div className="w-1/4 text-center">Failed</div>
        </header>

        {/* Employee Rows */}
        {employees.map((elem, index) => {
          const activeTask = elem.tasks.filter(item => item.active)
          const completedTask = elem.tasks.filter(item => item.completed)
          const failedTask = elem.tasks.filter(item => item.failed)
          const newTask = elem.tasks.filter(item => !item.active && !item.failed && !item.completed)

          return (
            <article
              key={index}
              className={`flex flex-col md:flex-row md:items-center md:justify-between border-b border-green-600 last:border-none px-4 py-3 rounded md:rounded-none bg-[#1c1c1c]`}
            >
              <div className="md:w-1/4 text-center md:border-r border-green-600 py-1">
                <span className="font-semibold md:hidden block">Employee:</span>
                {elem.firstName}
              </div>
              <div className="md:w-1/4 text-center md:border-r border-green-600 py-1">
                <span className="font-semibold md:hidden block">Pending:</span>
                {newTask.length}
              </div>
              <div className="md:w-1/4 text-center md:border-r border-green-600 py-1">
                <span className="font-semibold md:hidden block">Completed:</span>
                {completedTask.length}
              </div>
              <div className="md:w-1/4 text-center py-1">
                <span className="font-semibold md:hidden block">Failed:</span>
                {failedTask.length}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default AllTasks
