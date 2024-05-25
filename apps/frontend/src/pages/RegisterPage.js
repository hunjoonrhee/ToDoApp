import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { messages } from '../components/context/userStore/userStore.messages';
import { createANewUser } from '../components/context/userStore/userStoreSlice';
import 'react-toastify/dist/ReactToastify.css';
const RegisterPage = () => {
  const dispatch = useDispatch();
  const { registerError, registerDone } = useSelector((store) => store.userStore);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secPassword, setSecPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (registerDone) {
      if (!registerError) {
        toast.success("Welcome Let's log in!", {
          onClose: () => navigate('/login'),
        });
      } else {
        toast.error(registerError, {
          toastId: messages.LOGIN_USER_ERROR.id,
        });
      }
    }
  }, [registerDone, registerError, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createANewUser({ email: email, password: password, username: name }));
    setEmail('');
    setPassword('');
    setName('');
    setSecPassword('');
  };

  const isPasswordMatched = password === secPassword;

  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="string"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>

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

        {!isPasswordMatched && secPassword && <h6 style={{ color: 'red' }}>password doesn't match!</h6>}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control
            type="password"
            placeholder="re-enter the password"
            value={secPassword}
            onChange={(e) => {
              setSecPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
