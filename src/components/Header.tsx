import styled from "styled-components";
import { DarkToggle } from "./DarkToggle";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: clamp(1rem, 2vw, 3rem) clamp(1rem, 2vw, 3rem);
  z-index: 100;
`;

export function Header() {
  return (
    <HeaderContainer>
      <DarkToggle />
    </HeaderContainer>
  );
}
