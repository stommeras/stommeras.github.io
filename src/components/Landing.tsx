'use client';

import { useBoop } from '@/hooks/useBoop';
import { animated } from '@react-spring/web';
import { DecryptedText } from './DecryptedText';
import { Pumpkin } from './icons/fall/Pumpkin';
import { MagicText } from './MagicText';
import { PageContainer, Subtitle, Title } from './ui';

const TITLE = 'TØMMERÅS';
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const Landing = () => {
  const [style, trigger] = useBoop({ y: -10, scale: 1.1, springConfig: { tension: 200, friction: 15 } });

  return (
    <PageContainer className="italic">
      <Title className="relative cursor-pointer" onMouseEnter={trigger} onTouchStart={trigger}>
        <animated.span style={style} className="absolute -top-full right-[50%] w-[20%] translate-x-[50%]">
          <Pumpkin />
        </animated.span>
        <DecryptedText text={TITLE} characters={CHARACTERS} sequential speed={20} maxIterations={4} />
      </Title>
      <Subtitle>One of the {<MagicText text="websites" />} of all time.</Subtitle>
    </PageContainer>
  );
};
