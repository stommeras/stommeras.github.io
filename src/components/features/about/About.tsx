import { DecryptedText, PageContainer, Subtitle } from '@/components/ui';
import { getTranslations } from 'next-intl/server';

export async function About() {
  const t = await getTranslations('about');

  return (
    <PageContainer>
      <Subtitle>{t('subtitle')}</Subtitle>
      <p className="max-w-200 text-left">
        <DecryptedText
          animateOn="view"
          speed={15}
          maxIterations={1}
          sequential
          text="Nisi culpa magna pariatur adipisicing cillum officia duis dolore."
        />
        <DecryptedText
          animateOn="view"
          speed={15}
          maxIterations={1}
          sequential
          text="Et enim aute qui minim et. Lorem commodo in est consectetur."
        />
        <DecryptedText
          animateOn="view"
          speed={15}
          maxIterations={1}
          sequential
          text="Sit fugiat velit qui officia incididunt sit mollit ullamco laboris."
        />
        <DecryptedText
          animateOn="view"
          speed={15}
          maxIterations={1}
          sequential
          text="Aliquip ex culpa id ex esse excepteur quis mollit nostrud aliquip quis aute."
        />
        <DecryptedText
          animateOn="view"
          speed={15}
          maxIterations={1}
          sequential
          text="Dolor sit amet Lorem nostrud velit. Ad dolor est ipsum pariatur voluptate proident culpa tempor laborum occaecat in ipsum."
        />
      </p>
    </PageContainer>
  );
}
