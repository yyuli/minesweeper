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
  openCellAsync,
  setStatus,
} from "../../store/boardSlice";
import {
  BoardWrap,
  BoardTable,
  BoardTd,
  BoardText,
  BoardResultP,
} from "./BoardStyle";

export default function Board() {
  const dispatch = useDispatch();
  const row = useSelector((state) => state.board.data.row);
  const col = useSelector((state) => state.board.data.col);
  const mine = useSelector((state) => state.board.data.mine);
  const boardData = useSelector((state) => state.board.boardData);
  const stopGame = useSelector((state) => state.board.stop);
  const result = useSelector((state) => state.board.result);
  const status = useSelector((state) => state.board.status);

  const getText = (code) => {
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
  useEffect(() => {
    let timer;
    if (status && !stopGame) {
      timer = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [status, stopGame]);

  const onLeftClick = (rowIndex, colIndex) => {
    if (!status) {
      dispatch(startGame({ row, col, mine }));
      const currentPosition = rowIndex * col + colIndex;
      const minePositionArr = createMine(row, col, mine, currentPosition);
      const newBoard = plantMine(col, minePositionArr, boardData);
      dispatch(updateBoard(newBoard));
      dispatch(setStatus(true));
    }
    if (stopGame) return;
    switch (boardData[rowIndex][colIndex]) {
      case CELL.OPENED:
      case CELL.FLAG:
      case CELL.FLAG_MINE:
      case CELL.QUESTION:
      case CELL.QUESTION_MINE:
        break;
      case CELL.NORMAL:
        dispatch(openCellAsync({ rowIndex, colIndex }));
        break;
      case CELL.MINE:
        dispatch(clickedMine({ rowIndex, colIndex, row, col }));
        break;
      default:
        return;
    }
  };

  const onRightClick = (e, rowIndex, colIndex) => {
    e.preventDefault();
    if (stopGame) return;
    switch (boardData[rowIndex][colIndex]) {
      case CELL.NORMAL:
      case CELL.MINE:
        dispatch(updateCell({ rowIndex, colIndex, updateType: "setFlag" }));
        break;
      case CELL.FLAG:
      case CELL.FLAG_MINE:
        dispatch(updateCell({ rowIndex, colIndex, updateType: "setQuestion" }));
        break;
      case CELL.QUESTION:
      case CELL.QUESTION_MINE:
        dispatch(updateCell({ rowIndex, colIndex, updateType: "setNormal" }));
        break;
      default:
        return;
    }
  };
  return (
    <>
      <BoardWrap>
        <BoardTable>
          <tbody>
            {boardData.length > 0 &&
              boardData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((col, colIndex) => (
                    <BoardTd
                      key={colIndex}
                      cellData={col}
                      onClick={() => onLeftClick(rowIndex, colIndex)}
                      onContextMenu={(e) => onRightClick(e, rowIndex, colIndex)}
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
    </>
  );
}
