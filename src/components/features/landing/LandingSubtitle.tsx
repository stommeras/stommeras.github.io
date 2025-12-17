import { Subtitle } from '@/components/ui/Typography';
import { MagicText } from '@/components/ui/text-effects/MagicText';
import { getTranslations } from 'next-intl/server';

export async function LandingSubtitle() {
  const t = await getTranslations('landing');

  const highlight = t('highlight');
  const subtitle = t('subtitle', { highlight });
  const parts = subtitle.split(highlight);

  return (
    <Subtitle>
      {parts[0]}
      <MagicText text={highlight} />
      {parts[1]}
    </Subtitle>
  );
}
