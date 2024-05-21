import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

function TodoBoard() {
  const { tasks } = useSelector((store) => store.taskStore);
  return (
    <div>
      <h2>To-Do List</h2>
      { tasks
        ? <TodoItem tasks={tasks.tasks} />
        : (
          <h5> There is no Tasks to show</h5>
        )}

    </div>
  );
}

export default TodoBoard;
