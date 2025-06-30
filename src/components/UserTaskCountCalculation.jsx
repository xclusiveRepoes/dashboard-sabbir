import { useSelector } from "react-redux";

const Calculation = () => {
  const { employees } = useSelector((state) => state.userSlice);
  let tasks = employees.map((employee) => employee.tasks);
  let pending = 0;
  let completed = 0;
  let failed = 0;
  for (let i = 0; i < tasks.length; i++) {
    tasks[i]?.map((task) => {
      if (task.completed) return completed += 1
      if (task.failed) return failed += 1
      if (!task.active && !task.completed && !task.failed || task.active) return pending += 1
    });
  }
  return {pending, completed, failed}
};

export default Calculation;
