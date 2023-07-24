import { CELL } from "../constant/constant";

export const checkAround = (
  boardData: number[][],
  rowIndex: number,
  colIndex: number,
  openedCount: number,
  mineCount: number
) => {
  const checked: string[] = [];
  let openedCellCount = 0;
  const checkAroundCell = (rowIndex: number, colIndex: number) => {
    if (
      [
        CELL.OPENED,
        CELL.FLAG_MINE,
        CELL.FLAG,
        CELL.QUESTION_MINE,
        CELL.QUESTION,
      ].includes(boardData[rowIndex][colIndex])
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
    let around: number[] = [];
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
          checkAroundCell(n[0], n[1]);
        }
      });
    }
    // 이미 열린 셀에 대한 카운트 증가 방지
    if (boardData[rowIndex][colIndex] === CELL.NORMAL) {
      openedCellCount += 1;
    }
    boardData[rowIndex][colIndex] = count;
  };
  checkAroundCell(rowIndex, colIndex);
  let stop = false;
  if (
    openedCount + openedCellCount ===
    boardData.length * boardData[0].length - mineCount
  ) {
    stop = true;
  }

  return {
    boardData,
    stop,
    openedCount: openedCellCount,
  };
};
