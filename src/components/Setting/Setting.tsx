import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startGame,
  setStatus,
  updateRow,
  updateCol,
  updateMine,
} from "../../store/boardSlice";
import {
  SettingWrap,
  SettingTitle,
  SettingInput,
  SettingBottomWrap,
  SettingBtnWrap,
  SettingBtn,
  SettingTimeP,
} from "./SettingStyle";
import { RootState } from "../../store/store";

export default function Setting() {
  const row = useSelector((state: RootState) => state.board.data.row);
  const col = useSelector((state: RootState) => state.board.data.col);
  const mine = useSelector((state: RootState) => state.board.data.mine);
  const time = useSelector((state: RootState) => state.board.timer);
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
  const initializeGame = (newRow: number, newCol: number, newMine: number) => {
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
    <SettingWrap>
      <SettingTitle>BOARD SIZE</SettingTitle>
      <div>
        <SettingInput
          type="number"
          placeholder="세로"
          value={row}
          onChange={(e) => {
            dispatch(updateRow(e.target.value));
            dispatch(setStatus(false));
          }}
        />
        <SettingInput
          type="number"
          placeholder="가로"
          value={col}
          onChange={(e) => {
            dispatch(updateCol(e.target.value));
            dispatch(setStatus(false));
          }}
        />
        <SettingTitle>MINE</SettingTitle>
        <SettingInput
          type="number"
          placeholder="지뢰"
          value={mine}
          onChange={(e) => {
            dispatch(updateMine(e.target.value));
            dispatch(setStatus(false));
          }}
        />
      </div>
      <SettingTitle>LEVEL</SettingTitle>
      <SettingBottomWrap>
        <SettingBtnWrap>
          <SettingBtn onClick={() => initializeGame(8, 8, 10)}>
            Beginner
          </SettingBtn>
          <SettingBtn onClick={() => initializeGame(16, 16, 40)}>
            Intermediate
          </SettingBtn>
          <SettingBtn onClick={() => initializeGame(16, 32, 99)}>
            Expert
          </SettingBtn>
          <SettingBtn onClick={() => initializeGame(row, col, mine)}>
            Reset
          </SettingBtn>
        </SettingBtnWrap>
        <SettingTimeP>{time}</SettingTimeP>
      </SettingBottomWrap>
    </SettingWrap>
  );
}
