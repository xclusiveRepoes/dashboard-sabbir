import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogOutSet, setIsLightHandle } from "../../userSlice/userSlice";

import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";

import { IoSunny } from "react-icons/io5";
import { HiMoon } from "react-icons/hi";

const Header = () => {
  const { currentUser } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();

  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    let getIsLight = JSON.parse(localStorage.getItem("isLight"));
    setIsLight(getIsLight);
  }, []);

  useEffect(() => {
    localStorage.setItem("isLight", isLight);
    dispatch(setIsLightHandle(isLight))
  }, [isLight]);

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      dispatch(handleLogOutSet());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex items-end justify-between text-white sm:px-[30px] py-[30px] ">
      <div className="text-[22px] font-medium">
        <h1 className="text-[23px] lg:text-[30px] font-bold dark:text-white text-gray-800">
          <span className="italic">Hi</span>{" "}
          <span className="capitalize">{currentUser.firstName}</span>👋
        </h1>
      </div>
      <div className="flex items-center justify-center gap-[15px]">
        <button
          onClick={(e) => {
            handleLogOut(e);
          }}
          className="px-[15px] py-[5px] lg:text-[20px] hover:bg-red-800 transition-all duration-300 bg-red-700 rounded-[5px]"
        >
          Log Out
        </button>
        <span
          onClick={() => {
            setIsLight(!isLight);
          }}
          className="text-gray-800 dark:text-gray-300 text-[22px] cursor-pointer"
        >
          {
            isLight ? <HiMoon /> : <IoSunny />
          }
        </span>
      </div>
    </div>
  );
};

export default Header;
