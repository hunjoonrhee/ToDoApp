import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link, useNavigate } from 'react-router-dom';
import { logInUser } from '../components/context/userStore/userStoreSlice';
import { useDispatch, useSelector } from 'react-redux';
import { messages } from '../components/context/userStore/userStore.messages';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { me, logInUserError, logInUserDone } = useSelector((store) => store.userStore);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (logInUserError) {
      toast.error(logInUserError, {
        toastId: messages.LOGIN_USER_ERROR.id,
      });
    }
  }, [logInUserError]);

  useEffect(() => {
    if (logInUserDone && me) {
      navigate('/dashboard');
    }
  }, [logInUserDone, me, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInUser({ email: email, password: password }));
    setEmail('');
    setPassword('');
  };

  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <div className="button-box" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="submit" className="button-primary" style={{ margin: '20px' }}>
            Login
          </Button>
          <div style={{ margin: '20px', alignContent: 'center' }}>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </div>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
