import { createSlice } from "@reduxjs/toolkit";

const dropDownSlice = createSlice({
  name: "dropDownSlice",
  initialState: {
    isShow: false,
    isPermit: false,
    permitText: "",
  },
  reducers: {
    setTasksPermission: (state, action) => {
      state.isShow = true;
      state.permitText = action.payload
    },
    handlePermission: (state, action) => {
      if (action.payload === "YES") {
        state.isPermit = true;
      }
      if (action.payload === "NO") {
        state.isPermit = false;
      }
      state.isShow = false;
    },
    setDefaultPermission: (state, action) => {
      state.isPermit = false
    }
  },
});

export const { setTasksPermission, handlePermission, setDefaultPermission } = dropDownSlice.actions;
export default dropDownSlice.reducer;
