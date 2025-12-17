import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 space-y-4">
        <Spinner />
        <p className="text-card-foreground text-sm">Loading...</p>
      </div>
    </div>
  );
}
