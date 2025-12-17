import { ContactForm } from '@/components/features/contact/ContactForm';
import { PageContainer } from '@/components/ui/Containers';
import { Subtitle } from '@/components/ui/Typography';
import { getTranslations } from 'next-intl/server';

export async function Contact() {
  const t = await getTranslations('contact');

  return (
    <PageContainer className="w-[80vw] max-w-4xl">
      <Subtitle>{t('subtitle')}</Subtitle>
      <p className="text-font-medium md:text-lg">{t('description')}</p>
      <ContactForm />
    </PageContainer>
  );
}
