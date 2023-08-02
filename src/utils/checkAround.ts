import { CELL } from "../constant/constant";

// 주변의 지뢰를 검사하는 함수
export const checkAround = (
  boardData: number[][],
  rowIndex: number,
  colIndex: number,
  openedCount: number,
  mineCount: number
) => {
  const checked: string[] = []; // 검사된 칸을 저장하는 배열
  let openedCellCount = 0; // 열린 칸의 개수
  const buffer: number[][] = []; // 주변 칸의 좌표를 저장하는 버퍼 배열

  // 지정된 위치 주변의 칸을 확인해 주변 지뢰수를 계산하는 함수
  const checkAroundCell = (rowIndex: number, colIndex: number) => {
    // 이미 해당 위치가 열려있거나 깃발이나 물음표가 표시되어 있는 경우, 검사하지 않음
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
    // 주어진 위치가 게임판을 벗어나는 경우, 검사하지 않음
    if (
      rowIndex < 0 ||
      rowIndex >= boardData.length ||
      colIndex < 0 ||
      colIndex >= boardData[0].length
    ) {
      return;
    }
    // 이미 검사한 위치인 경우, 다시 검사하지 않음
    if (checked.includes(rowIndex + "/" + colIndex)) {
      return;
    } else {
      checked.push(rowIndex + "/" + colIndex);
    }
    // 지정된 위치 주변의 값들을 저장하는 배열
    let around: number[] = [];
    // 상단 행이 있는 경우, 해당 위치들을 around 배열에 추가
    if (boardData[rowIndex - 1]) {
      around = around.concat(
        boardData[rowIndex - 1][colIndex - 1],
        boardData[rowIndex - 1][colIndex],
        boardData[rowIndex - 1][colIndex + 1]
      );
    }
    // 같은 행의 좌우 위치를 around 배열에 추가
    around = around.concat(
      boardData[rowIndex][colIndex - 1],
      boardData[rowIndex][colIndex + 1]
    );
    // 하단 행이 있는 경우, 해당 위치들을 around 배열에 추가
    if (boardData[rowIndex + 1]) {
      around = around.concat(
        boardData[rowIndex + 1][colIndex - 1],
        boardData[rowIndex + 1][colIndex],
        boardData[rowIndex + 1][colIndex + 1]
      );
    }
    // 현재 위치 주변에 있는 지뢰 개수 구하기
    const count = around.filter((value) =>
      [CELL.MINE, CELL.FLAG_MINE, CELL.QUESTION_MINE].includes(value)
    ).length;
    // 현재 위치 주변에 지뢰가 없는 경우
    if (count === 0) {
      // 주변 위치를 저장하는 배열
      const near = [];
      // 현재 위치에서 상단 행이 있는 경우, 해당 위치들을 near 배열에 추가
      if (rowIndex - 1 > -1) {
        near.push([rowIndex - 1, colIndex - 1]);
        near.push([rowIndex - 1, colIndex]);
        near.push([rowIndex - 1, colIndex + 1]);
      }
      // 현재 위치에서 같은 행의 좌우 위치를 near 배열에 추가
      near.push([rowIndex, colIndex - 1]);
      near.push([rowIndex, colIndex + 1]);
      // 현재 위치에서 하단 행이 있는 경우, 해당 위치들을 near 배열에 추가
      if (rowIndex + 1 < boardData.length) {
        near.push([rowIndex + 1, colIndex - 1]);
        near.push([rowIndex + 1, colIndex]);
        near.push([rowIndex + 1, colIndex + 1]);
      }
      // 주변 위치들을 순회하면서 각 위치가 아직 열리지 않은 경우, 해당 위치를 buffer에 추가
      near.forEach((n) => {
        if (boardData[n[0]][n[1]] !== CELL.OPENED) {
          buffer.push([n[0], n[1]]);
        }
      });
    }
    // 클릭한 셀이 일반 셀이었다면 열린 셀로 바뀌므로 열린 셀의 개수 증가
    if (boardData[rowIndex][colIndex] === CELL.NORMAL) {
      openedCellCount += 1;
    }
    // 현재 위치의 셀 값을 주변의 지뢰 개수로 업데이트
    boardData[rowIndex][colIndex] = count;
  };
  checkAroundCell(rowIndex, colIndex);
  // 버퍼에 저장된 좌표들이 남아있다면 반복문 수행
  while (buffer.length) {
    let data: number[] = buffer.pop() as number[];
    checkAroundCell(data[0], data[1]);
  }
  let stop = false;
  // 열린 셀의 수가 가로 * 세로 - 지뢰의 수와 같다면 게임 종료
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
