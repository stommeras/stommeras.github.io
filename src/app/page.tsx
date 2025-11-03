import { About } from '@/components/features/about';
import { Landing } from '@/components/features/landing';

export default function Home() {
  return (
    <main id="main-content" className="flex h-[200vh] w-full flex-col items-center justify-center">
      <Landing />
      <About />
    </main>
  );
}
