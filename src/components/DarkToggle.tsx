import { Toggle } from "@base-ui-components/react";
import styled from "styled-components";
import { useTheme } from "@/stores/themeStore";

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.25rem;
  aspect-ratio: 1 / 1;
`;

export const DarkToggle = () => {
  const { colorMode, setColorMode } = useTheme();

  if (!colorMode) {
    return null;
  }

  return (
    <Toggle
      pressed={colorMode === "dark"}
      onPressedChange={(pressed) => {
        setColorMode(pressed ? "dark" : "light");
      }}
      render={(props, state) => {
        return <ToggleButton {...props}>{state.pressed ? "☀️" : "🌑"}</ToggleButton>;
      }}
    />
  );
};
