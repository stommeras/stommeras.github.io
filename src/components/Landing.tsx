import { animated } from "@react-spring/web";
import styled from "styled-components";
import { useBoop } from "@/hooks/useBoop";
import { DecryptedText } from "./DecryptedText";
import { Pumpkin } from "./icons/fall/Pumpkin";
import { MagicText } from "./MagicText";
import { PageContainer, Subtitle, Title } from "./ui";

const TITLE = "TØMMERÅS";
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const LandingContainer = styled(PageContainer)`
  font-style: italic;
`;

const PumpkinContainer = styled(animated.span)`
  position: absolute;
  width: 12%;
  top: -5%;
  right: 10.5%;
`;

export const Landing = () => {
  const [style, trigger] = useBoop({ y: -10, scale: 1.1, springConfig: { tension: 200, friction: 15 } });

  return (
    <LandingContainer>
      <Title onMouseEnter={trigger} onTouchStart={trigger}>
        <DecryptedText text={TITLE} characters={CHARACTERS} sequential speed={25} maxIterations={4} />
        <PumpkinContainer style={style}>
          <Pumpkin />
        </PumpkinContainer>
      </Title>
      <Subtitle>One of the {<MagicText text="websites" />} of all time.</Subtitle>
    </LandingContainer>
  );
};
