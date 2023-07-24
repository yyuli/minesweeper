import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startGame,
  setStatus,
  updateRow,
  updateCol,
  updateMine,
} from "../../store/boardSlice";

export default function Setting() {
  const row = useSelector((state) => state.board.data.row);
  const col = useSelector((state) => state.board.data.col);
  const mine = useSelector((state) => state.board.data.mine);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      startGame({
        row,
        col,
        mine,
      })
    );
  }, [row, col]);
  const initializeGame = (newRow, newCol, newMine) => {
    dispatch(updateRow(newRow));
    dispatch(updateCol(newCol));
    dispatch(updateMine(newMine));

    dispatch(
      startGame({
        row: newRow,
        col: newCol,
        mine: newMine,
      })
    );
    dispatch(setStatus(false));
  };
  return (
    <>
      <input
        type="number"
        placeholder="세로"
        value={row}
        onChange={(e) => {
          dispatch(updateRow(e.target.value));
          dispatch(setStatus(false));
        }}
      />
      <input
        type="number"
        placeholder="가로"
        value={col}
        onChange={(e) => {
          dispatch(updateCol(e.target.value));
          dispatch(setStatus(false));
        }}
      />
      <input
        type="number"
        placeholder="지뢰"
        value={mine}
        onChange={(e) => {
          dispatch(updateMine(e.target.value));
          dispatch(setStatus(false));
        }}
      />
      <button onClick={() => initializeGame(8, 8, 10)}>Beginner</button>
      <button onClick={() => initializeGame(16, 16, 40)}>Intermediate</button>
      <button onClick={() => initializeGame(16, 32, 99)}>Expert</button>
      <button onClick={() => initializeGame(row, col, mine)}>Custom</button>
    </>
  );
}
