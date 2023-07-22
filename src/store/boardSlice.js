import { createSlice } from '@reduxjs/toolkit'
import { createMine } from '../utils/createMine';
import { CELL } from '../constant/constant';

const initialState = {
  boardData: [],
  data: {
    row: 0,
    col: 0,
    mine: 0,
  },
  stop: false,
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    startGame: (state, action) => {
      const { row, col, mine } = action.payload;
      state.data.row = row;
      state.data.col = col;
      state.data.mine = mine;
      const newBoardData = createMine(row, col, mine);
      state.boardData = [...newBoardData];
      state.stop = false;
    },
    openCell: (state, action) => {
      const { rowIndex, colIndex } = action.payload;
      const boardData = [...state.boardData];
      boardData[rowIndex][colIndex] = CELL.OPENED;
    },
    clickedMine: (state, action) => {
      const { rowIndex, colIndex } = action.payload;
      const boardData = [...state.boardData];
      boardData[rowIndex][colIndex] = CELL.CLICKED_MINE;
      state.stop = true;
    }
  },
})

export const { startGame, openCell, clickedMine } = boardSlice.actions

export default boardSlice.reducer