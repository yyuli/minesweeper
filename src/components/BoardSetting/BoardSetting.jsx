import React, { useState } from "react";

export default function Setting() {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [mine, setMine] = useState(20);

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
    const boardData = [];
    for (let i = 0; i < row; i++) {
      const rowData = [];
      boardData.push(rowData);
      for (let j = 0; j < col; j++) {
        rowData.push(CELL.NORMAL);
      }
    }
    for (let k = 0; k < mineArr.length; k++) {
      const ver = Math.floor(mineArr[k] / col);
      const hor = mineArr[k] % col;
      boardData[ver][hor] = CELL.MINE;
    }
    console.log(boardData);
  };

  return (
    <div>
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
    </div>
  );
}
