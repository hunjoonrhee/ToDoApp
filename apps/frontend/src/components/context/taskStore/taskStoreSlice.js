import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createTaskThunk, deleteTaskFromServerThunk, editTaskThunk, getAllTasksThunk } from './taskStoreThunk';
import { messages } from './taskStore.messages';

export const initialState = {
  tasks: [],
  addTaskLoading: false,
  addTaskDone: false,
  addTaskError: null,
  getTasksLoading: false,
  getTasksDone: false,
  getTasksError: null,
  deleteTaskLoading: false,
  deleteTaskDone: false,
  deleteTaskError: null,
  editTaskLoading: false,
  editTaskDone: false,
  editTaskError: null,
  isTaskCompleted: false,
};

export const getAllTasks = createAsyncThunk('tasks/getAllTasks', getAllTasksThunk);
export const createANewTask = createAsyncThunk('tasks/createANewTask', createTaskThunk);
export const deleteTaskFromServer = createAsyncThunk('tasks/deleteTask', deleteTaskFromServerThunk);
export const editTask = createAsyncThunk('tasks/editTask', editTaskThunk);

const taskStoreSlice = createSlice({
  name: 'taskStore',
  initialState,
  reducers: {
    setIsTaskCompleted: (state, action) => {
      state.isTaskCompleted = action.payload;
    },
    addNewTask(state, action) {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        state.tasks = JSON.parse(storedTasks);
      }
      state.tasks = [...state.tasks, action.payload];
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask(state, action) {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        state.tasks = JSON.parse(storedTasks);
      }

      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editATask(state, action) {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        state.tasks = JSON.parse(storedTasks);
      }
      state.tasks = state.tasks.map((task) => (task._id === action.payload._id ? action.payload : task));
      // const taskToBeEdited = state.tasks.find((task) => task._id === action.payload._id);
      // console.log(taskToBeEdited);

      // state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.getTasksLoading = true;
        state.getTasksDone = false;
        state.getTasksError = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.getTasksLoading = false;
        state.getTasksDone = true;
        state.tasks = action.payload;
        state.getTasksError = null;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.getTasksLoading = false;
        state.getTasksDone = false;
        toast.error(action.payload, {
          toastId: messages.GET_TASKS_ERROR.id,
        });
      })
      .addCase(createANewTask.pending, (state) => {
        state.addTaskLoading = true;
        state.addTaskDone = false;
        state.addTaskError = null;
      })
      .addCase(createANewTask.fulfilled, (state, action) => {
        state.addTaskLoading = false;
        state.addTaskDone = true;
        state.addTaskError = null;
      })
      .addCase(createANewTask.rejected, (state, action) => {
        state.addTaskLoading = false;
        state.addTaskDone = false;
        toast.error(action.payload, {
          toastId: messages.POST_TASK_ERROR.id,
        });
      })
      .addCase(deleteTaskFromServer.pending, (state) => {
        state.deleteTaskLoading = true;
        state.deleteTaskDone = false;
        state.deleteTaskError = null;
      })
      .addCase(deleteTaskFromServer.fulfilled, (state, action) => {
        state.deleteTaskLoading = false;
        state.deleteTaskDone = true;
        state.deleteTaskError = null;
      })
      .addCase(deleteTaskFromServer.rejected, (state, action) => {
        state.deleteTaskLoading = false;
        state.deleteTaskDone = false;
        toast.error(action.payload, {
          toastId: messages.DELETE_TASK_ERROR.id,
        });
      })
      .addCase(editTask.pending, (state) => {
        state.editTaskLoading = true;
        state.editTaskDone = false;
        state.editTaskError = null;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.editTaskLoading = false;
        state.editTaskDone = true;
        state.editTaskError = null;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.editTaskLoading = false;
        state.editTaskDone = false;
        toast.error(action.payload, {
          toastId: messages.EDIT_TASK_ERROR.id,
        });
      });
  },
});

export const { addNewTask, deleteTask, editATask, setIsTaskCompleted } = taskStoreSlice.actions;

export const taskStoreReducer = taskStoreSlice.reducer;
