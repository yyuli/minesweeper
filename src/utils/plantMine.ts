import { CELL } from "../constant/constant";

export const plantMine = (
  col: number,
  minePositionArr: number[],
  boardData: number[][]
) => {
  const newBoard = boardData.map((row) => [...row]);
  minePositionArr.forEach((position) => {
    const ver = Math.floor(position / col);
    const hor = position % col;
    newBoard[ver][hor] = CELL.MINE;
  });
  return newBoard;
};
