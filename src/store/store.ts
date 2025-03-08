import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import checkedDataReducer from '../api/checkedSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      checkedData: checkedDataReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
