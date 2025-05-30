import { useSelector } from 'react-redux'

import Tasks from './Tasks'

const TaskList = () => {
  const {tasks} = useSelector(state => state.userSlice.currentUser)

  return (
    <div className='taskList w-full py-[60px] columns-1 gap-[20px] lg:columns-2 xl:columns-3 px-[30px] text-white font-semibold mt-[20px]'>
      {
        tasks.map((item , index) => {
          return(
            <Tasks data={item} key={index} />
          )
        })
      }
    </div>
  )
}

export default TaskList