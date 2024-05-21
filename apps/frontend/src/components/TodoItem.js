import React from 'react';
import { Col, Row } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteTaskFromServer } from './context/taskStore/taskStoreSlice';

function TodoItem({ tasks }) {
  const dispatch = useDispatch();
  const handleOnDelete = (id) => {
    console.log(id);
    dispatch(deleteTaskFromServer(id));
  };

  return tasks.map((task) => {
    if (!task) return null;
    return (
      <Row key={task._id}>
        <Col xs={12}>
          <div className="todo-item">
            <div className="todo-content">{task.task}</div>

            <div>
              <button className="button-delete" onClick={() => handleOnDelete(task._id)}>
                삭제
              </button>
              <button className="button-delete">끝남</button>
            </div>
          </div>
        </Col>
      </Row>
    );
  });
}
TodoItem.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
};
export default TodoItem;
