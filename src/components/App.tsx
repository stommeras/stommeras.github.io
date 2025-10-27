import styled from "styled-components";
import { About } from "./About";
import { Landing } from "./Landing";

const AppContainer = styled.div`
  height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  `;

export function App() {
  return (
    <AppContainer>
      <Landing />
      <About />
    </AppContainer>
  );
}
