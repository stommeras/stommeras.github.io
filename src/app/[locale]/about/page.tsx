import { About } from '@/components/features/about';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Steffen Tømmerås',
};

export default function AboutPage() {
  return <About />;
}
