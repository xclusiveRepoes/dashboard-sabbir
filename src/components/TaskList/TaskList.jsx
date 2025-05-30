import { useSelector } from 'react-redux'

import Tasks from './Tasks'

const TaskList = () => {
  const {tasks} = useSelector(state => state.userSlice.currentUser)

  return (
    <div className='taskList w-full py-[60px] h-[45%] flex gap-[20px] flex-wrap px-[30px] items-start justify-center md:justify-between text-white font-semibold mt-[20px]'>
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