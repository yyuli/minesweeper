import React, { useEffect } from "react";
import { CELL } from "../../constant/constant";
import { useSelector, useDispatch } from "react-redux";
import { createMine } from "../../utils/createMine";
import { plantMine } from "../../utils/plantMine";
import {
  startGame,
  updateBoard,
  clickedMine,
  updateCell,
  incrementTimer,
  openCell,
  setStatus,
} from "../../store/boardSlice";
import {
  BoardWrap,
  BoardTable,
  BoardTd,
  BoardText,
  BoardResultP,
} from "./BoardStyle";
import { RootState } from "../../store/store";

// 게임판 컴포넌트
export default function Board() {
  const dispatch = useDispatch();
  const row = useSelector((state: RootState) => state.board.data.row);
  const col = useSelector((state: RootState) => state.board.data.col);
  const mine = useSelector((state: RootState) => state.board.data.mine);
  const boardData = useSelector((state: RootState) => state.board.boardData);
  const stopGame = useSelector((state: RootState) => state.board.stop);
  const result = useSelector((state: RootState) => state.board.result);
  const status = useSelector((state: RootState) => state.board.status);

  // 각 셀에 따른 텍스트 표시를 위한 함수
  const getText = (code: number) => {
    switch (code) {
      case CELL.NORMAL:
      case CELL.MINE:
        return "";
      case CELL.CLICKED_MINE:
        return "💣";
      case CELL.FLAG_MINE:
      case CELL.FLAG:
        return "🚩";
      case CELL.QUESTION_MINE:
      case CELL.QUESTION:
        return "❓";
      default:
        return code || "";
    }
  };
  // 게임 시간을 측정하기 위한 useEffect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (status && !stopGame) {
      timer = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [status, stopGame]);
  // 좌클릭 이벤트 처리 함수
  const onLeftClick = (rowIndex: number, colIndex: number) => {
    // 게임이 시작되지 않았다면 게임 실행
    if (!status) {
      dispatch(startGame({ row, col, mine }));
      // 현재 클릭한 위치를 파악해서 클릭한 위치를 제외하고 지뢰 생성
      const currentPosition = rowIndex * col + colIndex;
      const minePositionArr = createMine(row, col, mine, currentPosition);
      const newBoard = plantMine(col, minePositionArr, boardData);
      dispatch(updateBoard(newBoard));
      dispatch(setStatus(true));
    }
    // 게임이 종료되면 좌클릭 무시
    if (stopGame) return;
    switch (boardData[rowIndex][colIndex]) {
      case CELL.OPENED:
      case CELL.FLAG:
      case CELL.FLAG_MINE:
      case CELL.QUESTION:
      case CELL.QUESTION_MINE:
        break;
      // 일반 셀인 경우, rowIndex, colIndex를 기준으로 셀 오픈
      case CELL.NORMAL:
        dispatch(openCell({ rowIndex, colIndex }) as any);
        break;
      // 셀에 지뢰가 있는 경우, 지뢰를 클릭하면 모든 지뢰 위치가 공개되면서 게임 종료
      case CELL.MINE:
        dispatch(clickedMine({ rowIndex, colIndex, row, col }));
        break;
      default:
        return;
    }
  };
  // 우클릭 이벤트 처리 함수
  const onRightClick = (
    e: React.MouseEvent<HTMLTableCellElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    // 브라우저의 기본 우클릭 이벤트 막기
    e.preventDefault();
    // 게임 종료되면 우클릭 무시
    if (stopGame) return;
    switch (boardData[rowIndex][colIndex]) {
      // 일반 셀과 지뢰 셀인 경우, 셀에 깃발 표시
      case CELL.NORMAL:
      case CELL.MINE:
        dispatch(updateCell({ rowIndex, colIndex, updateType: "setFlag" }));
        break;
      // 깃발이 표시되어 있는 셀일 경우, 셀에 물음표 표시
      case CELL.FLAG:
      case CELL.FLAG_MINE:
        dispatch(updateCell({ rowIndex, colIndex, updateType: "setQuestion" }));
        break;
      // 물음표가 표시되어 있는 셀일 경우, 일반 셀로 되돌림
      case CELL.QUESTION:
      case CELL.QUESTION_MINE:
        dispatch(updateCell({ rowIndex, colIndex, updateType: "setNormal" }));
        break;
      default:
        return;
    }
  };
  return (
    <BoardWrap>
      <BoardTable>
        <tbody>
          {boardData.length > 0 &&
            boardData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((col, colIndex) => (
                  <BoardTd
                    key={colIndex}
                    onClick={() => onLeftClick(rowIndex, colIndex)}
                    onContextMenu={(e) => onRightClick(e, rowIndex, colIndex)}
                    data={col}
                  >
                    <BoardText>{getText(col)}</BoardText>
                  </BoardTd>
                ))}
              </tr>
            ))}
        </tbody>
      </BoardTable>
      {!!result && <BoardResultP>{result}</BoardResultP>}
    </BoardWrap>
  );
}
