import { configureStore, createSlice } from '@reduxjs/toolkit';
import formDataReducer from './sliceFormData';

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Japan',
  'India',
  'China',
  'Australia',
];

const countrySlice = createSlice({
  name: 'countries',
  initialState: countries,
  reducers: {},
});

export const store = configureStore({
  reducer: {
    formData: formDataReducer,
    countries: countrySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
