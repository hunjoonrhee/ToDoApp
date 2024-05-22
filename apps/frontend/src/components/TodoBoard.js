import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import { editTask } from './context/taskStore/taskStoreSlice';

function TodoBoard({ tasks }) {
  return (
    <div>
      <h2>To-Do List</h2>
      {tasks.length !== 0 ? (
        tasks.map((task) => {
          return <TodoItem task={task} key={task._id} />;
        })
      ) : (
        <h5> There is no Tasks to show</h5>
      )}
    </div>
  );
}
TodoBoard.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
};
export default TodoBoard;
