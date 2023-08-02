import { createSlice } from "@reduxjs/toolkit";
import { CELL } from "../constant/constant";
import { checkAround } from "../utils/checkAround";
import { createBoard } from "../utils/createBoard";

interface BoardState {
  boardData: number[][];
  data: {
    row: number;
    col: number;
    mine: number;
  };
  stop: boolean;
  openedCount: number;
  result: string;
  timer: number;
  status: boolean;
}

const initialState: BoardState = {
  boardData: [],
  data: {
    row: 8,
    col: 8,
    mine: 10,
  },
  stop: false,
  openedCount: 0,
  result: "",
  timer: 0,
  status: false,
};
export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    startGame: (state, action) => {
      const { row, col, mine } = action.payload;
      state.data.row = row;
      state.data.col = col;
      state.data.mine = mine;
      const newBoardData = createBoard(row, col);
      state.boardData = [...newBoardData];
      state.stop = false;
      state.openedCount = 0;
      state.timer = 0;
      state.result = "";
    },
    updateBoard: (state, action) => {
      state.boardData = action.payload;
    },
    openCell: (state, action) => {
      const { rowIndex, colIndex } = action.payload;
      const boardData = [...state.boardData];
      boardData.forEach((_, i) => {
        boardData[i] = [...state.boardData[i]];
      });
      const checkAroundResult = checkAround(
        boardData,
        rowIndex,
        colIndex,
        state.openedCount,
        state.data.mine
      );
      state.boardData = checkAroundResult.boardData;
      state.openedCount += checkAroundResult.openedCount;
      if (checkAroundResult.stop) {
        state.stop = true;
        state.result = "WIN!";
      }
    },
    clickedMine: (state, action) => {
      const { rowIndex, colIndex, row, col } = action.payload;
      const boardData = [...state.boardData];
      boardData[rowIndex][colIndex] = CELL.CLICKED_MINE;
      // 지뢰 클릭 시 모든 지뢰 위치 오픈
      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
          if (boardData[i][j] === CELL.MINE) {
            boardData[i][j] = CELL.CLICKED_MINE;
          }
        }
      }
      state.boardData = boardData;
      state.stop = true;
    },
    updateCell: (state, action) => {
      const { rowIndex, colIndex, updateType } = action.payload;
      const boardData = [...state.boardData];
      switch (updateType) {
        case "setFlag":
          boardData[rowIndex][colIndex] =
            boardData[rowIndex][colIndex] === CELL.MINE
              ? CELL.FLAG_MINE
              : CELL.FLAG;
          break;
        case "setQuestion":
          boardData[rowIndex][colIndex] =
            boardData[rowIndex][colIndex] === CELL.FLAG_MINE
              ? CELL.QUESTION_MINE
              : CELL.QUESTION;
          break;
        case "setNormal":
          boardData[rowIndex][colIndex] =
            boardData[rowIndex][colIndex] === CELL.QUESTION_MINE
              ? CELL.MINE
              : CELL.NORMAL;
          break;
        default:
          break;
      }
      state.boardData = boardData;
    },
    incrementTimer: (state) => {
      state.timer += 1;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    updateRow: (state, action) => {
      state.data.row = action.payload;
    },
    updateCol: (state, action) => {
      state.data.col = action.payload;
    },
    updateMine: (state, action) => {
      state.data.mine = action.payload;
    },
  },
});

export const {
  startGame,
  updateBoard,
  clickedMine,
  updateCell,
  openCell,
  incrementTimer,
  setStatus,
  updateRow,
  updateCol,
  updateMine,
} = boardSlice.actions;
export default boardSlice.reducer;
