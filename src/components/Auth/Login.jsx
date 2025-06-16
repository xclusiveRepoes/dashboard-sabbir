import React, { useEffect, useState } from "react";
import Header from "../other/Header";

import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addCurrentUser, setLoadingOff, setLoadingOn, setSignUpShow } from "../../userSlice/userSlice";

import { signInWithEmailAndPassword } from "firebase/auth";

import {auth, db} from '../../firebase-config'
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const fetchUserData = async () => {
    dispatch(setLoadingOn())
    auth.onAuthStateChanged(async (user) => {
      if(user){
        const docRef = doc(db, "Users", user.uid)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
          dispatch(addCurrentUser({currentUser: docSnap.data(), role: docSnap.data().role}))
        }
      }
      else{
        dispatch(setLoadingOff())
      }
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoadingOn())

    try{
      await signInWithEmailAndPassword(auth, mail, pass);
      fetchUserData()
    }catch(error){
      console.log(error);
    }
    setMail("");
    setPass("");
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center dark:bg-[#1C1C1C] bg-gray-300 text-gray-800 dark:text-[white]">
        <div className="px-[30px] sm:px-[50px] py-[30px] sm:py-[60px] shadow-md dark:border-[2px] dark:border-[#797979] rounded-xl flex flex-col items-center justify-center bg-[#6d6d6d2b] ">
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
              className="bg-transparent border-b-[2px] w-[240px] sm:w-[280px] py-[8px] outline-none border-gray-700 dark:border-gray-500 placeholder:text-gray-600 dark:placeholder:text-gray-400"
            />
            <div className="relative w-fit h-fit">
              <input
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                type={isVisible ? "text" : "password"}
                required
                placeholder="Enter your password"
                className="bg-transparent border-b-[2px] w-[240px] sm:w-[280px] py-[8px] outline-none border-gray-700 dark:border-gray-500 placeholder:text-gray-600 dark:placeholder:text-gray-400"
              />
              <span
                onClick={() => {
                  setIsVisible(!isVisible);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[20px] dark:text-[#d5d5d5] cursor-pointer"
              >
                {isVisible ? <IoEyeOff /> : <IoEyeSharp />}
              </span>
            </div>
            <button
              type="submit"
              className="w-[240px] sm:w-[280px] dark:bg-[#555555a2] bg-gray-500 dark:hover:bg-[#55555579] dark:text-[#D5A121] text-[#ffb700]  hover:drop-shadow-xl transition-colors duration-300 rounded-md py-[8px]"
            >
              Log in
            </button>
            <h1 className="text-center mt-[5px]">
              Don't have an account? <br />
              <span
              onClick={() => {
                dispatch(setSignUpShow(true))
              }}
              className="underline cursor-pointer font-medium dark:text-[#D5A121] text-[#ce9300]">
                Sign Up
              </span>
            </h1>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
