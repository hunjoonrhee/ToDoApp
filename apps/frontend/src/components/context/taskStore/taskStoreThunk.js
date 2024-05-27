import { messages } from './taskStore.messages';
import { addNewTaskOfUser, deleteTaskOfUser, editATask } from './taskStoreSlice';

const backendURL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_PROXY : process.env.REACT_APP_BACKEND_URL_LOCAL;

export const getAllTasksThunk = async () => {
  try {
    const res = await fetch(`${backendURL}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(messages.GET_TASKS_ERROR.message);
    }

    const tasks = await res.json();

    localStorage.setItem('tasks', JSON.stringify(tasks));
    return tasks;
  } catch (err) {
    throw new Error(messages.GET_TASKS_ERROR.message);
  }
};

export const getAllTasksByUserThunk = async (userId) => {
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${backendURL}/tasks/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (!res.ok) {
      throw new Error(messages.GET_TASKS_ERROR.message);
    }

    const tasks = await res.json();

    localStorage.setItem(`task–${userId}`, JSON.stringify(tasks));
    return tasks;
  } catch (err) {
    throw new Error(messages.GET_TASKS_ERROR.message);
  }
};

export const createTaskThunk = async (newTaskData, { dispatch }) => {
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${backendURL}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(newTaskData.taskData),
    });

    if (!res.ok) throw new Error(messages.POST_TASK_ERROR.message);
    const newTask = await res.json();
    dispatch(addNewTaskOfUser(newTask));
    dispatch(getAllTasksByUserThunk(newTask.author));

    return newTask;
  } catch (err) {
    throw err;
  }
};

export const deleteTaskFromServerThunk = async (dataForDelete, { dispatch }) => {
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${backendURL}/task/${dataForDelete.taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (!res.ok) throw new Error(messages.DELETE_TASK_ERROR.message);

    dispatch(deleteTaskOfUser(dataForDelete));
    dispatch(getAllTasksByUserThunk(dataForDelete.userId));
  } catch (err) {
    throw err;
  }
};

export const editTaskThunk = async (editData, { dispatch }) => {
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${backendURL}/task/${editData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(editData),
    });

    if (!res.ok) throw new Error(messages.EDIT_TASK_ERROR.message);

    const editedTask = await res.json();

    dispatch(editATask(editedTask));
  } catch (err) {
    throw err;
  }
};
