import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import { createANewTask, getAllTasksByUser } from '../context/taskStore/taskStoreSlice';
import TodoBoard from '../TodoBoard';
import { Button } from 'react-bootstrap';
import { loadUser, logOutUser } from '../context/userStore/userStoreSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Dashboard() {
  const dispatch = useDispatch();
  const { tasksOfUser } = useSelector((store) => store.taskStore);
  const { me } = useSelector((store) => store.userStore);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (me) {
      dispatch(getAllTasksByUser(me._id));
    }
  }, [dispatch, me]);

  const [taskData, setTaskData] = useState({
    task: '',
    isCompleted: false,
  });

  const handleOnClick = (e) => {
    e.preventDefault();

    if (!taskData.task || taskData.task === '') {
      return null;
    }
    taskData.task.trim();

    console.log(me._id);

    const newTaskData = {
      taskData: taskData,
      userId: me._id,
    };
    dispatch(createANewTask(newTaskData));
    setTaskData({
      task: '',
      isCompleted: false,
    });
  };

  const handleLogOut = useCallback(() => {
    dispatch(logOutUser());
    navigate('/');
  }, []);

  return (
    <Container>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <div style={{ flexGrow: 1 }}>
          <h1>Hello {me?.username}</h1>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <Button onClick={handleLogOut}>Log Out</Button>
        </div>
      </div>

      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={taskData.task}
            onChange={(e) => {
              setTaskData({
                ...taskData,
                task: e.target.value,
              });
            }}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={handleOnClick}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard tasks={tasksOfUser} />
    </Container>
  );
}

Dashboard.propTypes = {
  me: PropTypes.object,
};
export default Dashboard;
