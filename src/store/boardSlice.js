import { createSlice } from '@reduxjs/toolkit'
import { createMine } from '../utils/createMine';
import { CELL } from '../constant/constant';
import { checkAround } from '../utils/checkAround';

const initialState = {
  boardData: [],
  data: {
    row: 0,
    col: 0,
    mine: 0,
  },
  stop: false,
  openedCount: 0,
  result: "",
  timer: 0,
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
      state.openedCount = 0;
      state.timer = 0;
      state.result = "";
    },
    openCell: (state, action) => {
      const { rowIndex, colIndex } = action.payload;
      const boardData = [...state.boardData];
      boardData.forEach((row, i) => {
        boardData[i] = [...state.boardData[i]];
      });
      const checkAroundResult = checkAround(boardData,rowIndex, colIndex, state.openedCount, CELL, state.data.mine, state.timer);
      state.boardData = checkAroundResult.boardData;
      state.openedCount += checkAroundResult.openedCount;
      if(checkAroundResult.stop) {
        state.stop = true;
        state.result = `${state.timer}초만에 승리하셨습니다!`
      }
    },
    clickedMine: (state, action) => {
      const { rowIndex, colIndex } = action.payload;
      const boardData = [...state.boardData];
      boardData[rowIndex][colIndex] = CELL.CLICKED_MINE;
      state.stop = true;
    },
    setFlag: (state, action) => {
      const { rowIndex, colIndex } = action.payload;
      const boardData = [...state.boardData];
      if(boardData[rowIndex][colIndex] === CELL.MINE) {
        boardData[rowIndex][colIndex] = CELL.FLAG_MINE;
      }else {
        boardData[rowIndex][colIndex] = CELL.FLAG;
      }
    },
    setQuestion: (state, action) => {
      const { rowIndex, colIndex } = action.payload;
      const boardData = [...state.boardData];
      if(boardData[rowIndex][colIndex] === CELL.FLAG_MINE) {
        boardData[rowIndex][colIndex] = CELL.QUESTION_MINE;
      }else {
        boardData[rowIndex][colIndex] = CELL.QUESTION;
      }
    },
    setNormal: (state, action) => {
      const { rowIndex, colIndex } = action.payload;
      const boardData = [...state.boardData];
      if(boardData[rowIndex][colIndex] === CELL.QUESTION_MINE) {
        boardData[rowIndex][colIndex] = CELL.MINE;
      }else {
        boardData[rowIndex][colIndex] = CELL.NORMAL;
      }
    },
    incrementTimer: (state) => {
      state.timer += 1;
    },
  },
})

export const { startGame, openCell, clickedMine, setFlag, setQuestion, setNormal, incrementTimer } = boardSlice.actions;
export default boardSlice.reducer;
