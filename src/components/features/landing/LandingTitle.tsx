'use client';

import { DecryptedText } from '@/components/ui/text-effects';
import { DECRYPT_PRESETS } from '@/components/ui/text-effects/constants';
import { Title } from '@/components/ui/Typography';
import { useBoopJump } from '@/hooks/useBoop';
import { animated } from '@react-spring/web';

const TITLE = 'TØMMERÅS';
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function LandingTitle() {
  const [style, trigger] = useBoopJump();

  return (
    <Title className="relative cursor-pointer" onMouseEnter={trigger} onTouchStart={trigger} tabIndex={0} role="button">
      <animated.span
        style={style}
        className="absolute -top-full right-[50%] w-[20%] translate-x-[50%] text-3xl not-italic md:text-[3rem]"
        aria-hidden="true">
        🎅
      </animated.span>
      <DecryptedText text={TITLE} characters={CHARACTERS} {...DECRYPT_PRESETS.dramatic} />
    </Title>
  );
}
