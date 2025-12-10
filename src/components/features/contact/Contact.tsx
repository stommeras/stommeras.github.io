import { ContactForm } from '@/components/features/contact/ContactForm';
import { PageContainer, Subtitle } from '@/components/ui';

export function Contact() {
  return (
    <PageContainer className="w-[80vw] max-w-4xl">
      <Subtitle>Get in touch</Subtitle>
      <p className="text-font-medium md:text-lg">
        Want to reach out? Fill out the form below, or send an email directly to me at{' '}
        <a href="mailto:contact@example.com" className="text-blue-600 hover:underline">
          contact@example.com
        </a>
      </p>
      <ContactForm />
    </PageContainer>
  );
}
