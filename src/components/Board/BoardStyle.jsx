import styled from "styled-components";
import { CELL } from "../../constant/constant";

const BoardWrap = styled.div`
  background-color: #ffa05d;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
`;
const BoardTable = styled.table`
  border-collapse: separate;
  border-spacing: 4px;
`;
const BoardTd = styled.td`
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background-color: ${({ cellData }) => {
    switch (cellData) {
      case CELL.OPENED:
        return "#fff3ac";
      case CELL.NORMAL:
      case CELL.MINE:
      case CELL.CLICKED_MINE:
      case CELL.FLAG_MINE:
      case CELL.FLAG:
      case CELL.QUESTION_MINE:
      case CELL.QUESTION:
        return "#fff";
      default:
        return "#fff3ac";
    }
  }};
`;
const BoardText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bolder;
  font-size: 20px;
  color: #bb794b;
`;
const BoardResultP = styled.p`
  font-size: 18px;
  margin-top: 10px;
`;
export { BoardWrap, BoardTable, BoardTd, BoardText, BoardResultP };
