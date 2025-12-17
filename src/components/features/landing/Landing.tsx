import { LandingBackground } from '@/components/features/landing/LandingBackground';
import { LandingSubtitle } from '@/components/features/landing/LandingSubtitle';
import { LandingTitle } from '@/components/features/landing/LandingTitle';
import { PageContainer } from '@/components/ui/Containers';

export function Landing() {
  return (
    <PageContainer className="relative italic">
      <LandingBackground />
      <LandingTitle />
      <LandingSubtitle />
    </PageContainer>
  );
}
