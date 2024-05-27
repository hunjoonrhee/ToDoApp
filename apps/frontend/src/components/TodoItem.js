import React, { useCallback } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskFromServer, editTask } from './context/taskStore/taskStoreSlice';
// eslint-disable-next-line import/no-extraneous-dependencies
import Avatar from '@mui/material/Avatar';

function TodoItem({ task }) {
  const { me } = useSelector((store) => store.userStore);

  const dispatch = useDispatch();
  const handleOnDelete = (id) => {
    const dataForDelete = {
      taskId: id,
      userId: me._id,
    };
    dispatch(deleteTaskFromServer(dataForDelete));
  };

  let editData = task;
  const handleOnEdit = useCallback(() => {
    editData = { ...task, isCompleted: !task.isCompleted };
    dispatch(editTask(editData));
  }, [dispatch, editData.isCompleted]);
  if (editData) {
    task = editData;
  }
  function stringAvatar(name) {
    if (name.split(' ').length > 1) {
      return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
    } else {
      return name[0].toUpperCase() + name[1].toUpperCase();
    }
  }

  const variant = !task.isCompleted ? 'outline-primary' : 'success';
  return (
    <Row key={task._id}>
      <Col xs={12}>
        <div className="todo-item">
          <div className="todo-content">{task.task}</div>

          <div
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' }}>
            <Avatar sx={{ marginRight: '10px' }}> {stringAvatar(task.author.username)} </Avatar>
            <Button variant="outline-danger" onClick={() => handleOnDelete(task._id)} style={{ marginRight: '10px' }}>
              Delete
            </Button>
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
