'use client';

import { useBoop } from '@/hooks/useBoop';
import { animated } from '@react-spring/web';
import { useTheme } from 'next-themes';
import React from 'react';
import { DecryptedText } from './DecryptedText';
import DotGrid from './DotGrid';
import { Pumpkin } from './icons/fall/Pumpkin';
import { MagicText } from './MagicText';
import { PageContainer, Subtitle, Title } from './ui';

const TITLE = 'TØMMERÅS';
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const Landing = () => {
  const [style, trigger] = useBoop({ y: -10, scale: 1.1, springConfig: { tension: 200, friction: 15 } });
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const dotColor =
    resolvedTheme === 'dark' ? { base: '#333333', active: '#666666' } : { base: '#cccccc', active: '#999999' };

  return (
    <PageContainer className="italic">
      <React.Activity mode={mounted ? 'visible' : 'hidden'}>
        <DotGrid
          className="absolute top-0 -z-10 [-webkit-mask:linear-gradient(to_bottom,black_80%,transparent_100%)] [mask:linear-gradient(to_bottom,black_80%,transparent_100%)]"
          baseColor={dotColor.base}
          activeColor={dotColor.active}
          dotSize={4}
        />
      </React.Activity>
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
