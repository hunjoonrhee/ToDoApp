import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import TodoBoard from './components/TodoBoard';
import { createANewTask, getAllTasks } from './components/context/taskStore/taskStoreSlice';

function App() {
  const dispatch = useDispatch();
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

      <TodoBoard />
    </Container>
  );
}

export default App;
