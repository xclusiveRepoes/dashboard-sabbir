import { useSelector } from 'react-redux'

import Tasks from './Tasks'

const TaskList = () => { 
  const {toShowTasks} = useSelector(state => state.userSlice)
  return (
    <div className='taskList w-full py-[60px] columns-1 gap-[20px] lg:columns-2 xl:columns-3 px-[30px] text-white font-semibold mt-[20px]'>
      {
        toShowTasks.map((item , index) => {
          return(
            <Tasks data={item} key={index} />
          )
        })
      }
    </div>
  )
}

export default TaskList