import { messages } from './taskStore.messages';
import { addNewTask, deleteTask, editATask, getAllTasks } from './taskStoreSlice';

const backendURL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_PROXY : process.env.REACT_APP_BACKEND_URL;

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

export const createTaskThunk = async (taskData, { dispatch }) => {
  try {
    const res = await fetch(`${backendURL}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!res.ok) throw new Error(messages.POST_TASK_ERROR.message);
    const newTask = await res.json();
    dispatch(addNewTask(newTask));

    return newTask;
  } catch (err) {
    throw err;
  }
};

export const deleteTaskFromServerThunk = async (taskId, { dispatch }) => {
  try {
    const res = await fetch(`${backendURL}/task/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error(messages.DELETE_TASK_ERROR.message);

    dispatch(deleteTask(taskId));
    dispatch(getAllTasks());
  } catch (err) {
    throw err;
  }
};

export const editTaskThunk = async (task, { dispatch }) => {
  try {
    const res = await fetch(`${backendURL}/task/${task._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!res.ok) throw new Error(messages.EDIT_TASK_ERROR.message);

    const editedTask = await res.json();

    dispatch(editATask(editedTask));
  } catch (err) {
    throw err;
  }
};
