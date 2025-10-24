import { Toggle } from "@base-ui-components/react";
import { animated } from "@react-spring/web";
import styled from "styled-components";
import { useBoop } from "@/hooks/useBoop";
import { useTheme } from "@/stores/themeStore";

const ToggleButton = styled(animated.button)`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.25rem;
  aspect-ratio: 1 / 1;
`;

export const DarkToggle = () => {
  const { colorMode, setColorMode } = useTheme();
  const [style, trigger] = useBoop({ scale: 1.1, rotation: 15 });

  if (!colorMode) {
    return null;
  }

  return (
    <Toggle
      pressed={colorMode === "dark"}
      onPressedChange={(pressed) => {
        setColorMode(pressed ? "dark" : "light");
      }}
      style={style}
      onClick={trigger}
      render={(props, state) => {
        return <ToggleButton {...props}>{state.pressed ? "☀️" : "🌑"}</ToggleButton>;
      }}
    />
  );
};
