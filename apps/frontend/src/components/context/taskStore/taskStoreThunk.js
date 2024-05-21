import { messages } from './taskStore.messages';

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

export const createTaskThunk = async ({ task, isCompleted }) => {
  const requestBodyTask = { task, isCompleted };

  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBodyTask),
    });

    if (!res.ok) throw new Error(messages.POST_TASK_ERROR.message);

    return await res.json();
  } catch (err) {
    throw err;
  }
};
