import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    isLoading: true,
    admin: [],
    employees: [],
    currentUser: { uid: "", email: "", password: "", firstName: "" },
    role: "",
    toShowTasks: [],
    isLight: false,
    isSignUpShow: false,
    taskDets: ''
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
    setLoadingOff: (state) => {
      state.isLoading = false;
    },
    handleLogOutSet: (state) => {
      state.currentUser = { uid: "", email: "", password: "", firstName: "" };
      state.role = "";
    },
    handleTaskCondition: (state, action) => {
      state.toShowTasks = state.toShowTasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      state.currentUser.tasks = state.currentUser.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    handleDeleteTask: (state, action) => {
      state.currentUser.tasks = state.currentUser.tasks.filter(
        (task) => task.id != action.payload
      );
      state.toShowTasks = state.toShowTasks.filter(
        (task) => task.id != action.payload
      );
    },
    handleToShowTasks: (state, action) => {
      state.toShowTasks = action.payload;
    },
    addTaskFromAdmin: (state, action) => {
      const { asignTo, task } = action.payload;

      state.employees.forEach((employee) => {
        if (employee.firstName === asignTo) {
          if (!employee.tasks) {
            employee.tasks = [];
          }
          employee.tasks.push(task);
        }
      });
    },
    setIsLightHandle: (state, action) => {
      state.isLight = action.payload
    }, 
    setSignUpShow: (state, action) => {
      state.isSignUpShow = action.payload
    },
    setTaskDesc: (state, action) => {
      state.taskDets = action.payload
    }
  },
});

export const {
  addUsers,
  addCurrentUser,
  setLoadingOn,
  handleLogOutSet,
  handleTaskCondition,
  handleDeleteTask,
  handleToShowTasks,
  addTaskFromAdmin,
  setLoadingOff,
  setIsLightHandle,
  setSignUpShow,
  setTaskDesc
} = userSlice.actions;

export default userSlice.reducer;
