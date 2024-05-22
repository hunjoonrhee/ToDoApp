import { defineMessages } from '@formatjs/intl';

export const messages = defineMessages({
  GET_TASKS_ERROR: {
    id: 'getTasksError',
    message: 'Error at loading all tasks!',
  },
  POST_TASK_ERROR: {
    id: 'postTaskError',
    message: 'Error at creating a new task!',
  },
  DELETE_TASK_ERROR: {
    id: 'deleteTaskError',
    message: 'Error at deleting a task!',
  },
  EDIT_TASK_ERROR: {
    id: 'editTaskError',
    message: 'Error at editing a task!',
  },
});
