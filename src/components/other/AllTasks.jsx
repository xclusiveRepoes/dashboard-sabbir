import { useSelector } from "react-redux"

const AllTasks = () => {
    const {employees} = useSelector(state => state.userSlice)
  return (
    <div className='w-full py-[15px] md:py-[40px] px-[10px] text-[14px] md:text-[18px] text-center md:px-[60px] cursor-pointer'>
        <div className='w-full bg-[#1c1c1c] px-[20px] py-[15px] rounded-lg flex flex-col gap-[10px]'>
            <div className='w-full bg-green-500 py-2 px-4 rounded flex gap-[15px]'>
                <h1 className='w-1/4 flex items-center justify-center'>Employee Name</h1>
                <h1 className='w-1/4 flex items-center justify-center'>Pending Task</h1>
                <h1 className='w-1/4 flex items-center justify-center'>Completed</h1>
                <h1 className='w-1/4 flex items-center justify-center'>Failed</h1>
            </div>
            {
                employees.map((elem, index) => {
                    return(
                        <div key={elem.id} className='w-full border border-green-400 500 py-2 px-4 rounded flex'>
                            <h1 className='w-1/4 flex items-center justify-center'>{elem.firstName}</h1>
                            <h1 className='w-1/4 flex items-center justify-center'>{elem.taskCounts.newTask}</h1>
                            <h1 className='w-1/4 flex items-center justify-center'>{elem.taskCounts.completed}</h1>
                            <h1 className='w-1/4 flex items-center justify-center'>{elem.taskCounts.failed}</h1>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default AllTasks