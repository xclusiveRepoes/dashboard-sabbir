import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogOutSet } from '../../userSlice/userSlice'

const Header = () => {

  const {currentUser} = useSelector(state => state.userSlice)

  const dispatch = useDispatch()
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(handleLogOutSet())
  }
  return (
    <div className='w-full flex items-end justify-between text-white sm:px-[30px] py-[30px] '>
        <div className='text-[22px] font-medium'>
            <h1 className='text-[23px] lg:text-[30px] font-bold'><span className='italic'>Hi</span> <span className=''>{currentUser.firstName}</span>👋</h1>
        </div>
        <button onClick={(e) => {handleLogOut(e)}} className='px-[15px] py-[5px] lg:text-[20px] hover:bg-red-800 transition-all duration-300 bg-red-700 rounded-[5px]'>Log Out</button>
    </div>
  )
}

export default Header