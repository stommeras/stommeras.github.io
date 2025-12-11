import { ContactForm } from '@/components/features/contact/ContactForm';
import { PageContainer, Subtitle } from '@/components/ui';

export function Contact() {
  return (
    <PageContainer className="w-[80vw] max-w-4xl">
      <Subtitle>Get in Touch</Subtitle>
      <p className="text-font-medium md:text-lg">Want to reach out? Fill out the form below to send me a message.</p>
      <ContactForm />
    </PageContainer>
  );
}
