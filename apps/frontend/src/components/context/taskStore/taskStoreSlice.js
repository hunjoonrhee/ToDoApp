import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createTaskThunk, getAllTasksThunk } from './taskStoreThunk';
import { messages } from './taskStore.messages';

export const initialState = {
  tasks: [],
  addTaskLoading: false,
  addTaskDone: false,
  addTaskError: null,
  getTasksLoading: false,
  getTasksDone: false,
  getTasksError: null,
};

export const getAllTasks = createAsyncThunk('tasks/getAllTasks', getAllTasksThunk);
export const createANewTask = createAsyncThunk('tasks/createANewTask', createTaskThunk);

const taskStoreSlice = createSlice({
  name: 'taskStore',
  initialState,
  reducers: {
    addNewTask(state, action) {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        state.tasks = JSON.parse(storedTasks);
      }
      state.tasks = [...state.tasks, action.payload];
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
      });
  },
});

export const { addNewTask } = taskStoreSlice.actions;

export const taskStoreReducer = taskStoreSlice.reducer;
