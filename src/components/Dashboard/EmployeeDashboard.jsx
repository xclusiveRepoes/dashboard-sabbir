import React from 'react'
import Header from '../other/Header'
import TaskListNumber from '../other/TaskListNumber'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = () => {
  return (
    <div className='w-full min-h-screen lg:h-screen bg-[#1c1c1c] sm:px-[60px] overflow-x-hidden'>
        <div className='w-full  px-[30px]'>
          <Header />
        </div>
        <TaskListNumber />
        <TaskList />
    </div>
  )
}

export default EmployeeDashboard