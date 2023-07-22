import { CELL } from "../constant/constant";

export const createMine = (row, col, mine) => {
    const board = Array(row * col)
      .fill()
      .map((_, index) => index);
    const mineArr = [];
    while (board.length > row * col - mine) {
      const mine = board.splice(Math.floor(Math.random() * board.length), 1)[0];
      mineArr.push(mine);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
      const rowData = [];
      data.push(rowData);
      for (let j = 0; j < col; j++) {
        rowData.push(CELL.NORMAL);
      }
    }
    for (let k = 0; k < mineArr.length; k++) {
      const ver = Math.floor(mineArr[k] / col);
      const hor = mineArr[k] % col;
      data[ver][hor] = CELL.MINE;
    }
    return data;
  };