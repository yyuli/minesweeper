import styled from "styled-components";
import clock from "../../assets/images/clock.svg";

const SettingWrap = styled.section`
  background-color: #ffa05d;
  padding: 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 4px;
`;
const SettingTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  &:nth-of-type(2),
  &:last-of-type {
    margin-top: 10px;
  }
  margin-bottom: 2px;
  color: #7a5237;
`;
const SettingInput = styled.input`
  width: 168px;
  color: #7a5237;
  height: 30px;
  font-size: 16px;
  border-radius: 4px;
  padding-left: 10px;
  &:nth-child(2) {
    margin: 0 10px;
  }
`;
const SettingBottomWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SettingBtnWrap = styled.div`
  display: flex;
  gap: 8px;
`;
const SettingBtn = styled.button`
  background-color: #fff;
  color: #7a5237;
  height: 30px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
`;
const SettingTimeP = styled.p`
  color: #7a5237;
  font-size: 18px;
  height: 30px;
  line-height: 30px;
  background: url(${clock}) no-repeat center 4px / 20px 20px;
  padding-left: 60px;
`;

export {
  SettingWrap,
  SettingTitle,
  SettingInput,
  SettingBottomWrap,
  SettingBtnWrap,
  SettingBtn,
  SettingTimeP,
};
