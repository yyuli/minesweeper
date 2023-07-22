import { createSlice } from '@reduxjs/toolkit'
import { createMine } from '../utils/createMine';

const initialState = {
  boardData: [],
  data: {
    row: 0,
    col: 0,
    mine: 0,
  },
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    startGame: (state, { payload: { row, col, mine } }) => {
      state.data.row = row;
      state.data.col = col;
      state.data.mine = mine;
      const newBoardData = createMine(row, col, mine);
      state.boardData = [...newBoardData];
    },
  },
})

export const { startGame } = boardSlice.actions

export default boardSlice.reducer