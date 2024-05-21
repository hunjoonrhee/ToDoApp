import React from 'react';
import { Col, Row } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

function TodoItem({ tasks }) {
  return (
    tasks.map((task) => {
      if (!task) return null;
      return (
        <Row>
          <Col xs={12}>
            <div className="todo-item">
              <div className="todo-content">{task.task}</div>

              <div>
                <button className="button-delete">삭제</button>
                <button className="button-delete">끝남</button>
              </div>
            </div>
          </Col>
        </Row>
      );
    })

  );
}
TodoItem.propTypes = {
  tasks: PropTypes.array.isRequired,
};
export default TodoItem;
