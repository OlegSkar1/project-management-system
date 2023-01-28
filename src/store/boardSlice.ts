import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoards } from '../server/models';
import { AppDispatch } from '.';
import { getBoards, getOwnerBoard } from '../server/methods';

interface BoardState {
  list: IBoards[];
}

const initialState: BoardState = {
  list: [],
};

export const getAllBoards = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch }
>('board/getBoards', async (email, { dispatch }) => {
  const ownerBoard = await getOwnerBoard(email);
  const boards = await getBoards(email);
  const resultBoards = [...ownerBoard, ...boards];

  localStorage.setItem(
    'boards',
    (localStorage.getItem('boards') || '') + JSON.stringify(resultBoards)
  );

  dispatch(setBoard(resultBoards));
});

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<IBoards[]>) => {
      state.list.push(...action.payload);
    },
  },
});

export const { setBoard } = boardSlice.actions;

export default boardSlice.reducer;
