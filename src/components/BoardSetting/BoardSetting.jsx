import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CELL } from "../../constant/constant";
import { useSelector, useDispatch } from "react-redux";
import {
  startGame,
  updateBoard,
  openCell,
  clickedMine,
  updateCell,
  incrementTimer,
} from "../../store/boardSlice";
import { createMine } from "../../utils/createMine";
import { plantMine } from "../../utils/plantMine";

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
  const [row, setRow] = useState(8);
  const [col, setCol] = useState(8);
  const [mine, setMine] = useState(10);
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
    if (!gameStart) {
      dispatch(startGame({ row, col, mine }));
      const currentPosition = rowIndex * col + colIndex;
      console.log(currentPosition);
      const minePositionArr = createMine(row, col, mine, currentPosition);
      const newBoard = plantMine(col, minePositionArr, boardData);
      dispatch(updateBoard(newBoard));
      setGameStart(true);
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

  useEffect(() => {
    dispatch(
      startGame({
        row,
        col,
        mine,
      })
    );
  }, [row, col]);
  const initializeGame = () => {
    dispatch(
      startGame({
        row,
        col,
        mine,
      })
    );
    setGameStart(false);
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
          setRow(8);
          setCol(8);
          setMine(10);
          initializeGame();
        }}
      >
        Beginner
      </button>
      <button
        onClick={() => {
          setRow(16);
          setCol(16);
          setMine(40);
          initializeGame();
        }}
      >
        Intermediate
      </button>
      <button
        onClick={() => {
          setRow(16);
          setCol(32);
          setMine(99);
          initializeGame();
        }}
      >
        Expert
      </button>
      <button onClick={initializeGame}>Custom</button>
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
                    onClick={() => onLeftClick(rowIndex, colIndex, col)}
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
