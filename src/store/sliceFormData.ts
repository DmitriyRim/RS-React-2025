import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/types';
import { RootState } from './store';

interface formDataState {
  uncontrolled: User[];
  controlled: User[];
}

const initialState: formDataState = {
  uncontrolled: [],
  controlled: [],
};

export const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    updateUncontrolledData(state, action: PayloadAction<User>) {
      state.uncontrolled = [...state.controlled, action.payload];
      console.log(action.payload);
    },
    updateControlledData(state, action: PayloadAction<User>) {
      state.controlled = [...state.uncontrolled, action.payload];
    },
  },
});

export const { updateControlledData, updateUncontrolledData } =
  formSlice.actions;

export const selectControlledData = (state: RootState) =>
  state.formData.controlled;
export const selectUncontrolledData = (state: RootState) =>
  state.formData.uncontrolled;

export default formSlice.reducer;
