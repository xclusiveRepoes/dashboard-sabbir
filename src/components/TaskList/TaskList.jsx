import { useSelector, useDispatch } from 'react-redux';
import Tasks from './Tasks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { handleToShowTasks } from '../../userSlice/userSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const { toShowTasks } = useSelector(state => state.userSlice);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const updatedTasks = Array.from(toShowTasks);
    const [movedItem] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedItem);

    dispatch(handleToShowTasks(updatedTasks)); // You'll need to create this action in your Redux slice
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="taskList" direction="horizontal">
        {(provided) => (
          <div
            className="taskList w-full py-[60px] px-[10px] md:px-[30px] mt-[20px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-[30px]"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {toShowTasks.map((item, index) => (
              <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Tasks data={item} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
