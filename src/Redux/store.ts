import { configureStore } from '@reduxjs/toolkit';
import matchReducer from './reducers';


export const store = configureStore({
  reducer: matchReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;