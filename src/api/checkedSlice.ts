import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Book } from '../types/types';

interface checkedState {
  value: Book[];
}

const initialState: checkedState = {
  value: [],
};

export const checkedSlice = createSlice({
  name: 'checkedData',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Book>) => {
      if (!state.value.find((book) => book.id === action.payload.id)) {
        state.value.push(action.payload);
      }
    },
    removeCard: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((book) => book.id !== action.payload);
    },
    removeAll: (state) => {
      state.value = [];
    },
  },
});

export const { addCard, removeCard, removeAll } = checkedSlice.actions;

export const selectCheckedCard = (state: RootState) => state.checkedData.value;

export default checkedSlice.reducer;
