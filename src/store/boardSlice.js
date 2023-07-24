import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CELL } from "../constant/constant";
import { checkAround } from "../utils/checkAround";
import { createBoard } from "../utils/createBoard";

const initialState = {
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

export const openCellAsync = createAsyncThunk(
  "board/openCellAsync",
  async (payload, { getState }) => {
    const { rowIndex, colIndex } = payload;
    const { boardData, openedCount, data } = getState().board;
    const newBoardData = [...boardData];
    newBoardData.forEach((row, i) => {
      newBoardData[i] = [...boardData[i]];
    });
    const checkAroundResult = checkAround(
      newBoardData,
      rowIndex,
      colIndex,
      openedCount,
      data.mine,
    );
    return checkAroundResult;
  }
);

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
    clickedMine: (state, action) => {
      const { rowIndex, colIndex, row, col } = action.payload;
      const boardData = [...state.boardData];
      boardData[rowIndex][colIndex] = CELL.CLICKED_MINE;
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
  extraReducers: (builder) => {
    builder.addCase(openCellAsync.fulfilled, (state, action) => {
      const { boardData, stop, openedCount } = action.payload;
      state.boardData = boardData;
      state.openedCount += openedCount;
      if (stop) {
        state.stop = true;
        state.result = `${state.timer}초만에 승리하셨습니다!`;
      }
    });
  },
});

export const {
  startGame,
  updateBoard,
  openCell,
  clickedMine,
  updateCell,
  incrementTimer,
  setStatus,
  updateRow,
  updateCol,
  updateMine,
} = boardSlice.actions;
export default boardSlice.reducer;
