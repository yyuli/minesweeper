import { CELL } from "../constant/constant";

export const createBoard = (row: number, col: number) => {
  const boardData: number[][] = [];
  for (let i = 0; i < row; i++) {
    const rowData: number[] = [];
    boardData.push(rowData);
    for (let j = 0; j < col; j++) {
      rowData.push(CELL.NORMAL);
    }
  }
  return boardData;
};
