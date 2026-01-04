import { MagicTrail } from '@/components/ui/cursor-effects';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const CURSOR_EFFECTS = {
  NONE: 'none',
  MAGIC: 'magic',
} as const;

type CursorEffect = (typeof CURSOR_EFFECTS)[keyof typeof CURSOR_EFFECTS];

export function CursorEffectSwitcher() {
  const t = useTranslations('common.cursorEffects');
  const isTouchDevice = useIsTouchDevice();
  const [cursorEffect, setCursorEffect] = useState<CursorEffect>(CURSOR_EFFECTS.NONE);

  const renderCursorEffect = () => {
    if (isTouchDevice) return null;

    switch (cursorEffect) {
      case 'magic':
        return <MagicTrail />;
      case 'none':
      default:
        return null;
    }
  };

  return (
    <>
      {renderCursorEffect()}
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:text-primary text-md hover:border-accent border-2 px-2 transition-colors">
          {t('choose')}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Object.values(CURSOR_EFFECTS).map((effect) => (
            <DropdownMenuItem
              key={effect}
              onClick={() => setCursorEffect(effect as CursorEffect)}
              className={cursorEffect === effect ? 'bg-ring' : ''}>
              {t(effect)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
