import { messages } from './userStore.messages';

const backendURL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_PROXY : process.env.REACT_APP_BACKEND_URL_LOCAL;

export const createANewUserThunk = async (userData, { rejectedWithValue }) => {
  try {
    const res = await fetch(`${backendURL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    if (!res.ok) {
      return rejectedWithValue(messages.REGISTER_USER_ERROR.message);
    }

    return result;
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
      credentials: 'include',
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
    localStorage.clear();
  } catch (err) {
    throw err;
  }
};

export const loadUserThunk = async () => {
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${backendURL}/user/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      credentials: 'include',
    });

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
