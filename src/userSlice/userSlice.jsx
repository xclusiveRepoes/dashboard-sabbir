import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    isLoading: true,
    admin: [],
    employees: [],
    currentUser: { id: "", email: "", password: "", firstName: "" },
    role: "",
  },
  reducers: {
    addUsers: (state, action) => {
      (state.isLoading = false),
        (state.admin = action.payload.admin),
        (state.employees = action.payload.employees);
    },
    addCurrentUser: (state, action) => {
      (state.isLoading = false),
        (state.currentUser = action.payload.currentUser),
        (state.role = action.payload.role);
    },
    setLoadingOn: (state) => {
      state.isLoading = true;
    },
    handleLogOutSet: (state) => {
      state.currentUser = { id: "", email: "", password: "", firstName: "" };
      state.role = "";
    },
    handleAcceptTask: (state, action) => {
      state.currentUser.tasks = state.currentUser.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    handleDeleteTask: (state, action) => {
      state.currentUser.tasks = state.currentUser.tasks.filter(task => task.id != action.payload)
    }
  },
});

export const {
  addUsers,
  addCurrentUser,
  setLoadingOn,
  handleLogOutSet,
  handleAcceptTask,
  handleDeleteTask
} = userSlice.actions;

export default userSlice.reducer;
