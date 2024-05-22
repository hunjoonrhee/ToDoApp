import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskFromServer, editTask, setIsTaskCompleted } from './context/taskStore/taskStoreSlice';

function TodoItem({ task }) {
  const { isTaskCompleted } = useSelector((store) => store.taskStore);

  const dispatch = useDispatch();
  const handleOnDelete = (id) => {
    dispatch(deleteTaskFromServer(id));
  };

  let editData = task;
  const handleOnEdit = useCallback(() => {
    editData = { ...task, isCompleted: !task.isCompleted };
    dispatch(editTask(editData));
  }, [dispatch, editData.isCompleted]);
  if (editData) {
    task = editData;
  }

  const variant = !task.isCompleted ? 'outline-primary' : 'success';

  return (
    <Row key={task._id}>
      <Col xs={12}>
        <div className="todo-item">
          <div className="todo-content">{task.task}</div>

          <div>
            <Button variant="outline-danger" onClick={() => handleOnDelete(task._id)} style={{ marginRight: '10px' }}>
              Delete
            </Button>
            {/* <button className="button-delete" onClick={() => handleOnDelete(task._id)}> */}
            {/*   삭제 */}
            {/* </button> */}
            {/* <button className="button-delete" onClick={handleOnEdit} style={{ backgroundColor }}> */}
            {/*   끝남 */}
            {/* </button> */}
            <Button variant={variant} onClick={handleOnEdit} style={{ marginRight: '10px' }}>
              Done
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}
TodoItem.propTypes = {
  task: PropTypes.object,
};
export default TodoItem;
