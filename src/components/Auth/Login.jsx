import React, { useEffect, useState } from "react";
import Header from "../other/Header";

import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentUser, setLoadingOn } from "../../userSlice/userSlice";


const Login = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const {admin, employees, currentUser, role, isLoading} = useSelector(state => state.userSlice)
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setLoadingOn())
    admin.map((user) => {
      if(user.email === mail && user.password === pass){
        dispatch(addCurrentUser({currentUser: user, role: 'admin'}))
      }
    })
    
    employees.map((user) => {
      if(user.email === mail && user.password === pass){
        dispatch(addCurrentUser({currentUser: user, role: 'employee'}))
      }
    })

    if(!currentUser && !role){
      dispatch(addCurrentUser({currentUser: '', role: ''}))
    }
    setMail("");
    setPass("");
  };

  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0A0A16] text-[white]">
        <div className="px-[30px] sm:px-[50px] py-[30px] sm:py-[60px] border-[2px] border-[#797979] rounded-xl flex flex-col items-center justify-center bg-[#71717119] ">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            action=""
            className="w-fit flex flex-col items-center gap-[15px] text-[15px] md:text-[18px]"
          >
            <h1 className="mb-[20px]">Log in your account</h1>
            <input
              value={mail}
              onChange={(e) => {
                setMail(e.target.value);
              }}
              type="email"
              required
              placeholder="Enter your email"
              className="bg-transparent border-b-[2px] w-[240px] sm:w-[280px] py-[8px] outline-none border-gray-500 placeholder:text-gray-400"
            />
            <div className="relative w-fit h-fit">
              <input
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                type={isVisible ? 'text' : 'password'}
                required
                placeholder="Enter your password"
                className="bg-transparent border-b-[2px] w-[240px] sm:w-[280px] py-[8px] outline-none border-gray-500 placeholder:text-gray-400"
              />
              <span
              onClick={() => {
                setIsVisible(!isVisible)
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[20px] text-[#d5d5d5] cursor-pointer">{isVisible ? <IoEyeOff /> : <IoEyeSharp />}</span>
            </div>
            <button
              type="submit"
              className="w-[240px] sm:w-[280px] bg-[#555555a2] hover:bg-[#55555579] text-[#D5A121]  hover:drop-shadow-xl transition-colors duration-300 rounded-md py-[8px]"
            >
              Log in
            </button>
            <h1 className='text-center mt-[5px]'>Don't have an account? <br /><span className='underline cursor-pointer font-medium text-[#D5A121]'>Sign Up</span></h1>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
