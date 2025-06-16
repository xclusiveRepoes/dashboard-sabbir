import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { IoEyeOff, IoEyeSharp } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {
  setLoadingOff,
  setLoadingOn,
  setSignUpShow,
} from "../../userSlice/userSlice";

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({
    uid: uuidv4(),
    firstName: "",
    email: "",
    password: "",
    role: "employee",
    tasks: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoadingOn());
    try {
      await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
      const user = auth.currentUser;
      if (user) {
        const userData = {
          ...newUser,
          uid: user.uid, // use Firebase UID instead of custom one
        };
        await setDoc(doc(db, "Users", user.uid), userData);
        dispatch(setLoadingOff());
        dispatch(setSignUpShow(false));
        setNewUser({
          uid: uuidv4(),
          firstName: "",
          email: "",
          password: "",
          role: "employee",
          tasks: [],
        });
      }
    } catch (error) {
      dispatch(setLoadingOff());
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="w-full h-screen fixed top-0 left-0 items-center justify-center flex">
      <div className="w-full h-screen flex flex-col items-center justify-center dark:bg-[#1C1C1C] bg-gray-300 text-gray-800 dark:text-white">
        <div className="px-[30px] sm:px-[50px] py-[30px] sm:py-[60px] shadow-md dark:border-[2px] dark:border-[#797979] rounded-xl flex flex-col items-center justify-center bg-[#6d6d6d2b]">
          <form
            onSubmit={handleSubmit}
            className="w-fit flex flex-col items-center gap-[15px] text-[15px] md:text-[18px]"
          >
            <h1 className="mb-[20px]">Create Your Account Here</h1>
            <input
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, firstName: e.target.value }))
              }
              type="text"
              required
              placeholder="Enter your first name"
              className="bg-transparent border-b-[2px] w-[240px] sm:w-[280px] py-[8px] outline-none border-gray-700 dark:border-gray-500 placeholder:text-gray-600 dark:placeholder:text-gray-400 capitalize"
            />
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              placeholder="Enter your email"
              className="bg-transparent border-b-[2px] w-[240px] sm:w-[280px] py-[8px] outline-none border-gray-700 dark:border-gray-500 placeholder:text-gray-600 dark:placeholder:text-gray-400"
            />
            <div className="relative w-fit h-fit">
              <input
                value={newUser.password}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, password: e.target.value }))
                }
                type={isVisible ? "text" : "password"}
                required
                placeholder="Enter your password"
                className="bg-transparent border-b-[2px] w-[240px] sm:w-[280px] py-[8px] outline-none border-gray-700 dark:border-gray-500 placeholder:text-gray-600 dark:placeholder:text-gray-400"
              />
              <span
                onClick={() => setIsVisible(!isVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[20px] dark:text-[#d5d5d5] cursor-pointer"
              >
                {isVisible ? <IoEyeOff /> : <IoEyeSharp />}
              </span>
            </div>
            <button
              type="submit"
              className="w-[240px] sm:w-[280px] dark:bg-[#555555a2] bg-gray-500 dark:hover:bg-[#55555579] dark:text-[#D5A121] text-[#ffb700] hover:drop-shadow-xl transition-colors duration-300 rounded-md py-[8px]"
            >
              Sign Up
            </button>
            <h1 className="text-center mt-[5px]">
              Already have an account? <br />
              <span
                onClick={() => {
                  dispatch(setSignUpShow(false));
                }}
                className="underline cursor-pointer font-medium dark:text-[#D5A121] text-[#ce9300]"
              >
                Log in
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
