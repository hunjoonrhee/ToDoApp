import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { taskStoreReducer, userStoreReducer } from '../../components/context';

const rootReducer = combineReducers({
  taskStore: taskStoreReducer,
  userStore: userStoreReducer,
});

export const setupStore = (preloadedState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });
