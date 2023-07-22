import React, { useState } from "react";
import styled from "styled-components";
import { createMine } from "../../utils/createMine";
import { CELL } from "../../constant/constant";
import { useSelector, useDispatch } from "react-redux";
import { startGame } from "../../store/boardSlice";
const Td = styled.td`
  width: 40px;
  height: 40px;
  border: 1px solid black;
`;
export default function BoardSetting() {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [mine, setMine] = useState(20);
  const boardData = useSelector((state) => state.board.boardData);
  console.log(boardData);
  const dispatch = useDispatch();

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
        }}
      >
        시작
      </button>
      <table>
        <tbody>
          {boardData.length > 0 &&
            boardData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((col, colIndex) => (
                  <Td key={colIndex}>{col === CELL.MINE ? "-7" : "-1"}</Td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
