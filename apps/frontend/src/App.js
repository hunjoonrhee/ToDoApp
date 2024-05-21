import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TodoBoard from './components/TodoBoard';
import { getAllTasks } from './components/context/taskStore/taskStoreSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add">추가</button>
        </Col>
      </Row>

      <TodoBoard />
    </Container>
  );
}

export default App;
