import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { taskStoreReducer } from '../../components/context';

const rootReducer = combineReducers({
  taskStore: taskStoreReducer,
});

export const setupStore = (preloadedState) => configureStore({
  reducer: rootReducer,
  preloadedState,
});
