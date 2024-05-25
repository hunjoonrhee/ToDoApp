import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createANewUserThunk, logInUserThunk, logOutUserThunk } from './userStoreThunk';
import { messages } from './userStore.messages';

export const initialState = {
  me: null,
  logInUserLoading: false,
  logInUserDone: false,
  logInUserError: null,
  logOutUserLoading: false,
  logOutUserDone: false,
  logOutUserError: null,
  registerLoading: false,
  registerDone: false,
  registerError: null,
};

export const logInUser = createAsyncThunk('user/logInUser', logInUserThunk);
export const logOutUser = createAsyncThunk('user/logOutUser', logOutUserThunk);

export const createANewUser = createAsyncThunk('user/createANewUser', createANewUserThunk);

const userStoreSlice = createSlice({
  name: 'userStore',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(logInUser.pending, (state) => {
        state.logInUserLoading = true;
        state.logInUserDone = false;
        state.logInUserError = null;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.logInUserLoading = false;
        state.logInUserDone = true;
        state.me = action.payload.user;
        state.logInUserError = null;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.logInUserLoading = false;
        state.logInUserDone = false;
        state.logInUserError = action.payload;
        toast.error(action.payload, {
          toastId: messages.LOGIN_USER_ERROR.id,
        });
      })
      .addCase(logOutUser.pending, (state) => {
        state.logOutUserLoading = true;
        state.logOutUserDone = false;
        state.logOutUserError = null;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.logOutUserLoading = false;
        state.logOutUserDone = true;
        state.me = null;
        state.logOutUserError = null;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.logOutUserLoading = false;
        state.logOutUserDone = false;
        toast.error(action.payload, {
          toastId: messages.LOGOUT_USER_ERROR.id,
        });
      })
      .addCase(createANewUser.pending, (state) => {
        state.registerLoading = true;
        state.registerDone = false;
        state.registerError = null;
      })
      .addCase(createANewUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerDone = true;
        state.registerError = null;
      })
      .addCase(createANewUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerDone = false;
        toast.error(action.payload, {
          toastId: messages.REGISTER_USER_ERROR.id,
        });
      });
  },
});

export const {} = userStoreSlice.actions;

export const userStoreReducer = userStoreSlice.reducer;
