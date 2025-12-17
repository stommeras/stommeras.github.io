import { PageContainer } from '@/components/ui/Containers';
import { DecryptedText } from '@/components/ui/text-effects';
import { DECRYPT_PRESETS } from '@/components/ui/text-effects/constants';
import { Subtitle } from '@/components/ui/Typography';
import { getTranslations } from 'next-intl/server';

export async function About() {
  const t = await getTranslations('about');

  return (
    <PageContainer>
      <Subtitle>{t('subtitle')}</Subtitle>
      <p className="max-w-200 text-left">
        <DecryptedText
          {...DECRYPT_PRESETS.subtle}
          text="Nisi culpa magna pariatur adipisicing cillum officia duis dolore."
        />
        <DecryptedText
          {...DECRYPT_PRESETS.subtle}
          text="Et enim aute qui minim et. Lorem commodo in est consectetur."
        />
        <DecryptedText
          {...DECRYPT_PRESETS.subtle}
          text="Sit fugiat velit qui officia incididunt sit mollit ullamco laboris."
        />
        <DecryptedText
          {...DECRYPT_PRESETS.subtle}
          text="Aliquip ex culpa id ex esse excepteur quis mollit nostrud aliquip quis aute."
        />
        <DecryptedText
          {...DECRYPT_PRESETS.subtle}
          text="Dolor sit amet Lorem nostrud velit. Ad dolor est ipsum pariatur voluptate proident culpa tempor laborum occaecat in ipsum."
        />
      </p>
    </PageContainer>
  );
}
