import Board from "./components/Board/Board";
import Setting from "./components/Setting/Setting";
import { GlobalStyle } from "./styles/GlobalStyle";

import styled from "styled-components";

function App() {
  return (
    <>
      <GlobalStyle/>
      <Setting/>
      <Board/>
    </>
  );
}
export default App;
