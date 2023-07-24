import styled from "styled-components";
import { CELL } from "../../constant/constant";

interface BoardTdProps extends React.ComponentPropsWithoutRef<"td"> {
  data: number;
}

const BoardWrap = styled.div`
  position: relative;
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
const BoardTd = styled.td<BoardTdProps>`
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background-color: ${({ data }) => {
    switch (data) {
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  z-index: 2;
  width: 100%;
  height: 100%;
  font-size: 48px;
  color: #ff6b35;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export { BoardWrap, BoardTable, BoardTd, BoardText, BoardResultP };
