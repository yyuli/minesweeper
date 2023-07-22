import React, { useState } from "react";
import styled from "styled-components";
import { createMine } from "../../utils/createMine";
import { CELL } from "../../constant/constant";
const Td = styled.td`
  width: 40px;
  height: 40px;
  border: 1px solid black;
`;
export default function BoardSetting() {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [mine, setMine] = useState(20);
  const [boardData, setBoardData] = useState([]);

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
          setBoardData(createMine(row, col, mine));
        }}
      >
        시작
      </button>
      <table>
        <tbody>
          {boardData.map((row, rowIndex) => (
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
