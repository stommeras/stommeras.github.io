import { LandingBackground } from '@/components/features/landing/LandingBackground';
import { LandingSubtitle } from '@/components/features/landing/LandingSubtitle';
import { LandingTitle } from '@/components/features/landing/LandingTitle';
import { PageContainer } from '@/components/ui';

export function Landing() {
  return (
    <PageContainer className="relative h-full italic">
      <LandingBackground />
      <LandingTitle />
      <LandingSubtitle />
    </PageContainer>
  );
}
