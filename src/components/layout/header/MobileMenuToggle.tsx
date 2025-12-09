'use client';

import { useBoop } from '@/hooks/useBoop';
import { animated } from '@react-spring/web';

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileMenuToggle({ isOpen, onToggle }: MobileMenuToggleProps) {
  const [style, trigger] = useBoop({ scale: 1.1, rotation: 15 });

  const handleClick = () => {
    trigger();
    onToggle();
  };

  const label = isOpen ? 'Close navigation menu' : 'Open navigation menu';

  return (
    <animated.button
      style={style}
      onClick={handleClick}
      className="cursor-pointer border-none bg-transparent p-2 text-3xl md:hidden"
      aria-label={label}
      aria-expanded={isOpen}
      title={label}>
      {isOpen ? '✕' : '☰'}
    </animated.button>
  );
}
