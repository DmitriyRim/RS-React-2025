import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/types';
import { RootState } from './store';

interface formDataState {
  uncontrolled: User;
  controlled: User;
}

const initialData: User = {
  name: '',
  age: 0,
  email: '',
  password: '',
  gender: '',
  termCondition: false,
  img: '',
  country: '',
};

const initialState: formDataState = {
  uncontrolled: initialData,
  controlled: initialData,
};

export const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    updateUncontrolledData(state, action: PayloadAction<User>) {
      console.log(state, action);
    },
    updateControlledData(state, action: PayloadAction<User>) {
      console.log(state, action);
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
