import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { createANewTask, getAllTasks } from '../context/taskStore/taskStoreSlice';
import TodoBoard from '../TodoBoard';

function Dashboard() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((store) => store.taskStore);

  const [taskData, setTaskData] = useState({
    task: '',
    isCompleted: false,
  });
  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const handleOnClick = (e) => {
    e.preventDefault();

    if (!taskData.task || taskData.task === '') {
      return null;
    }
    taskData.task.trim();
    dispatch(createANewTask(taskData));
    setTaskData({
      task: '',
      isCompleted: false,
    });
  };

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={taskData.task}
            onChange={(e) => {
              setTaskData({ ...taskData, task: e.target.value });
            }}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={handleOnClick}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard tasks={tasks} />
    </Container>
  );
}

export default Dashboard;
