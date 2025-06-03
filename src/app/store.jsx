import { configureStore } from "@reduxjs/toolkit";

import userSlice from "../userSlice/userSlice";
import dropDownSlice from '../userSlice/dropDownSlice'

const store = configureStore({
  reducer: {
    userSlice,
    dropDownSlice
  },
});

export default store;
