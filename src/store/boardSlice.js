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
    },
    openCell: (state, action) => {
      const { rowIndex, colIndex } = action.payload;
      const boardData = [...state.boardData];
      boardData.forEach((row, i) => {
        boardData[i] = [...state.boardData[i]];
      });
      const checked = [];
      let openedCount = 0;
      const checkAround = (rowIndex, colIndex) => {
        console.log(rowIndex, colIndex);
        if (
          [CELL.OPENED, CELL.FLAG_MINE, CELL.FLAG, CELL.QUESTION_MINE, CELL.QUESTION].includes(
            boardData[rowIndex][colIndex]
          )
        ) {
          return;
        }
        if (
          rowIndex < 0 ||
          rowIndex >= boardData.length ||
          colIndex < 0 ||
          colIndex >= boardData[0].length
        ) {
          return;
        }
        if (checked.includes(rowIndex + "/" + colIndex)) {
          return;
        } else {
          checked.push(rowIndex + "/" + colIndex);
        }
        let around = [];
        if (boardData[rowIndex - 1]) {
          around = around.concat(
            boardData[rowIndex - 1][colIndex - 1],
            boardData[rowIndex - 1][colIndex],
            boardData[rowIndex - 1][colIndex + 1]
          );
        }
        around = around.concat(
          boardData[rowIndex][colIndex - 1],
          boardData[rowIndex][colIndex + 1]
        );
        if (boardData[rowIndex + 1]) {
          around = around.concat(
            boardData[rowIndex + 1][colIndex - 1],
            boardData[rowIndex + 1][colIndex],
            boardData[rowIndex + 1][colIndex + 1]
          );
        }
        const count = around.filter((value) =>
          [CELL.MINE, CELL.FLAG_MINE, CELL.QUESTION_MINE].includes(value)
        ).length;
        if (count === 0) {
          const near = [];
          if (rowIndex - 1 > -1) {
            near.push([rowIndex - 1, colIndex - 1]);
            near.push([rowIndex - 1, colIndex]);
            near.push([rowIndex - 1, colIndex + 1]);
          }
          near.push([rowIndex, colIndex - 1]);
          near.push([rowIndex, colIndex + 1]);
          if (rowIndex + 1 < boardData.length) {
            near.push([rowIndex + 1, colIndex - 1]);
            near.push([rowIndex + 1, colIndex]);
            near.push([rowIndex + 1, colIndex + 1]);
          }
          near.forEach((n) => {
            if (boardData[n[0]][n[1]] !== CELL.OPENED) {
              checkAround(n[0], n[1]);
            }
          });
        }
        // 이미 열린 셀에 대한 카운트 증가 방지
        if (boardData[rowIndex][colIndex] === CELL.NORMAL) { 
          openedCount += 1;
        }
        boardData[rowIndex][colIndex] = count;
      };
      checkAround(rowIndex, colIndex);
      let stop = false;
      let result = "";
      if(state.data.row * state.data.col - state.data.mine === state.openedCount + openedCount) {
        stop = true;
        result = `${state.timer}초만에 승리하셨습니다!`;
      }
      state.boardData = boardData;
      state.stop = stop;
      state.result = result;
      state.openedCount += openedCount;
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
