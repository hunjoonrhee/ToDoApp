import { messages } from './taskStore.messages';
import { addNewTask, getAllTasks } from './taskStoreSlice';

export const getAllTasksThunk = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
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
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!res.ok) throw new Error(messages.POST_TASK_ERROR.message);
    const newTask = await res.json();
    console.log(newTask);
    dispatch(addNewTask(newTask));

    return newTask;
  } catch (err) {
    throw err;
  }
};
