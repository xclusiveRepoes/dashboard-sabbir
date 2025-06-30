import { useSelector } from 'react-redux';
import Tasks from './Tasks';

const TaskList = () => {
  const { toShowTasks } = useSelector(state => state.userSlice);

  return (
    <div className="taskList w-full py-[60px] px-[10px] md:px-[30px] mt-[20px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-[30px]">
      {toShowTasks.map((item) => (
        <Tasks key={item.id} data={item} />
      ))}
    </div>
  );
};

export default TaskList;
