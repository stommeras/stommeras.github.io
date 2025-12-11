import { Contact } from '@/components/features/contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Steffen Tømmerås',
};

export default function ContactPage() {
  return <Contact />;
}
