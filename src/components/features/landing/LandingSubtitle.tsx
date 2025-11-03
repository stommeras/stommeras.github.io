import { Subtitle } from '@/components/ui';
import { MagicText } from '@/components/ui/text-effects/MagicText';

export function LandingSubtitle() {
  return <Subtitle>One of the {<MagicText text="websites" />} of all time.</Subtitle>;
}
