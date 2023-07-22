import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CELL } from "../../constant/constant";
import { useSelector, useDispatch } from "react-redux";
import {
  startGame,
  openCell,
  clickedMine,
  setFlag,
  setQuestion,
  setNormal,
  incrementTimer,
} from "../../store/boardSlice";
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
export default function BoardSetting() {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [mine, setMine] = useState(20);
  const boardData = useSelector((state) => state.board.boardData);
  const stopGame = useSelector((state) => state.board.stop);
  const result = useSelector((state) => state.board.result);
  const [gameStart, setGameStart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (gameStart && !stopGame) {
      timer = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [gameStart, stopGame]);

  const time = useSelector((state) => state.board.timer);
  console.log(time);

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

  const onLeftClick = (rowIndex, colIndex) => {
    if (stopGame) return;
    switch (boardData[rowIndex][colIndex]) {
      case CELL.OPENED:
      case CELL.FLAG:
      case CELL.FLAG_MINE:
      case CELL.QUESTION:
      case CELL.QUESTION_MINE:
        break;
      case CELL.NORMAL:
        dispatch(openCell({ rowIndex, colIndex }));
        break;
      case CELL.MINE:
        dispatch(clickedMine({ rowIndex, colIndex }));
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
        dispatch(setFlag({ rowIndex, colIndex }));
        break;
      case CELL.FLAG:
      case CELL.FLAG_MINE:
        dispatch(setQuestion({ rowIndex, colIndex }));
        break;
      case CELL.QUESTION:
      case CELL.QUESTION_MINE:
        dispatch(setNormal({ rowIndex, colIndex }));
        break;
      default:
        return;
    }
  };

  return (
    <>
      <input
        type="number"
        placeholder="세로"
        value={row}
        onChange={(e) => {
          setRow(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="가로"
        value={col}
        onChange={(e) => {
          setCol(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="지뢰"
        value={mine}
        onChange={(e) => {
          setMine(e.target.value);
        }}
      />
      <button
        onClick={() => {
          dispatch(startGame({ row, col, mine }));
          setGameStart(true);
        }}
      >
        시작
      </button>
      {result}
      {time}
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
