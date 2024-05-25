import { messages } from './userStore.messages';
import { addNewTask, deleteTask, editATask, getAllTasks } from './userStoreSlice';

const backendURL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_PROXY : process.env.REACT_APP_BACKEND_URL;

export const createANewUserThunk = async (userData, { dispatch }) => {
  try {
    const res = await fetch(`${backendURL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) throw new Error(messages.REGISTER_USER_ERROR.message);
  } catch (err) {
    throw err;
  }
};

export const logInUserThunk = async (userData, { rejectWithValue }) => {
  try {
    const res = await fetch(`${backendURL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (res.status === 403) {
      return rejectWithValue(result.message);
    }

    if (!res.ok) {
      throw new Error(messages.LOGIN_USER_ERROR.message);
    }
    sessionStorage.setItem('token', result.token);

    return result;
  } catch (err) {
    throw err;
  }
};

export const logOutUserThunk = async () => {
  try {
    const res = await fetch(`${backendURL}/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) throw new Error(messages.LOGOUT_USER_ERROR.message);
    sessionStorage.removeItem('token');
  } catch (err) {
    throw err;
  }
};
