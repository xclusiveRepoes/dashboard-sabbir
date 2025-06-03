import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handlePermission } from '../userSlice/dropDownSlice'

const DropDownAsk = () => {
  const { isShow, permitText } = useSelector((state) => state.dropDownSlice)
  const dispatch = useDispatch()

  return (
    <div
      className={`fixed w-full h-screen top-0 left-0 flex items-center justify-center bg-[#a3a3a369] backdrop-blur-lg transition-all duration-300 ${
        isShow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-[90%] max-w-[360px] sm:max-w-[420px] flex flex-col items-center justify-center bg-gray-400 py-6 px-5 sm:px-7 rounded-md text-gray-800 shadow-md shadow-gray-800 text-center">
        <h1 className="text-[17px] sm:text-[19px] leading-[1.4]">
          Do you wanna {permitText} this task?
        </h1>
        <div className="flex items-center gap-[5px] w-full mt-[25px]">
          {['YES', 'No'].map((item, index) => (
            <button
              key={index}
              onClick={() => dispatch(handlePermission(item))}
              className="w-1/2 py-[6px] font-medium text-[15px] bg-gray-500 rounded-md text-gray-300 hover:bg-gray-700 transition-colors duration-300 shadow-sm shadow-gray-600"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DropDownAsk
