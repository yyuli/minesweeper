import { CELL } from "../constant/constant";

export const createBoard = (row, col) => {
    const boardData = [];
    for (let i = 0; i < row; i++) {
      const rowData = [];
      boardData.push(rowData);
      for (let j = 0; j < col; j++) {
        rowData.push(CELL.NORMAL);
      }
    }
    return boardData;
  };