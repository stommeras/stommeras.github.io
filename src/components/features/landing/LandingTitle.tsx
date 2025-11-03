'use client';

import { Pumpkin } from '@/components/icons/fall/Pumpkin';
import { DecryptedText, Title } from '@/components/ui';
import { useBoop } from '@/hooks/useBoop';
import { animated } from '@react-spring/web';

const TITLE = 'TØMMERÅS';
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function LandingTitle() {
  const [style, trigger] = useBoop({ y: -10, scale: 1.1, springConfig: { tension: 200, friction: 15 } });

  return (
    <Title className="relative cursor-pointer" onMouseEnter={trigger} onTouchStart={trigger} tabIndex={0} role="button">
      <animated.span
        style={style}
        className="absolute -top-full right-[50%] w-[20%] translate-x-[50%]"
        aria-hidden="true">
        <Pumpkin />
      </animated.span>
      <DecryptedText text={TITLE} characters={CHARACTERS} sequential speed={20} maxIterations={4} />
    </Title>
  );
}
