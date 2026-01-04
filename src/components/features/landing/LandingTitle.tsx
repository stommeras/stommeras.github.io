import { DecryptedText } from '@/components/ui/text-effects';
import { DECRYPT_PRESETS } from '@/components/ui/text-effects/constants';
import { Title } from '@/components/ui/Typography';

const TITLE = 'TØMMERÅS';
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function LandingTitle() {
  return (
    <Title className="cursor-target relative cursor-pointer" tabIndex={0} role="button">
      <DecryptedText text={TITLE} characters={CHARACTERS} {...DECRYPT_PRESETS.dramatic} animateOn="both" />
    </Title>
  );
}
