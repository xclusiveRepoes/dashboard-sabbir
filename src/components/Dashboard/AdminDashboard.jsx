import React from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTasks from '../other/AllTasks'

const AdminDashboard = () => {
  return (
    <div className='w-full min-h-screen md:pb-[40px] bg-gray-300 dark:bg-[#252525] text-gray-800 dark:text-white'>
       <div className='px-[30px]'>
         <Header />
       </div>
        <CreateTask />
        <AllTasks />
    </div>
  )
}

export default AdminDashboard