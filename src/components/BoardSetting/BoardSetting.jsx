import React, { useState } from "react";
import styled from "styled-components";
const Td = styled.td`
  width: 40px;
  height: 40px;
  border: 1px solid black;
`;
export default function Setting() {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [mine, setMine] = useState(20);
  const [boardData, setBoardData] = useState([]);
  const CELL = {
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    MINE: -7,
    OPENED: 0,
  };
  const createMine = () => {
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
    setBoardData(data);
  };
  console.log(boardData);

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
      <button onClick={createMine}>시작</button>
      <table>
        <tbody>
          {boardData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) =>
                col === CELL.MINE ? (
                  <Td key={colIndex}>-7</Td>
                ) : (
                  <Td key={colIndex}>-1</Td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
