import React, { useEffect, useState } from "react";
import { CELL } from "../../constant/constant";
import { useSelector, useDispatch } from "react-redux";
import { createMine } from "../../utils/createMine";
import { plantMine } from "../../utils/plantMine";
import {
  startGame,
  updateBoard,
  openCell,
  clickedMine,
  updateCell,
  incrementTimer,
  openCellAsync,
  setStatus,
} from "../../store/boardSlice";
import styled from "styled-components";
const Td = styled.td`
  width: 40px;
  height: 40px;
  border: 1px solid black;
  /* color: #fff; */
  background-color: ${({ cellData }) => {
    switch (cellData) {
      case 0:
        return "#fff";
      case -1:
      case -7:
        return "#eee";
      default:
        return "#fff";
    }
  }};
`;

export default function Board() {
  const dispatch = useDispatch();
  const row = useSelector((state) => state.board.data.row);
  const col = useSelector((state) => state.board.data.col);
  const mine = useSelector((state) => state.board.data.mine);
  const boardData = useSelector((state) => state.board.boardData);
  const stopGame = useSelector((state) => state.board.stop);
  const result = useSelector((state) => state.board.result);
  const time = useSelector((state) => state.board.timer);
  const status = useSelector((state) => state.board.status);

  const getText = (code) => {
    switch (code) {
      case CELL.NORMAL:
        return "";
      case CELL.MINE:
        return "X";
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
        // dispatch(openCell({ rowIndex, colIndex }));
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
      {time}
      {result}
      <table>
        <tbody>
          {boardData.length > 0 &&
            boardData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((col, colIndex) => (
                  <Td
                    key={colIndex}
                    cellData={col}
                    onClick={() => onLeftClick(rowIndex, colIndex)}
                    onContextMenu={(e) => onRightClick(e, rowIndex, colIndex)}
                  >
                    {getText(col)}
                  </Td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
