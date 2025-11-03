import { DarkToggle } from '@/components/layout/header/DarkToggle';

export function Header() {
  return (
    <header className="fixed top-0 z-100 flex w-full justify-end p-1">
      <DarkToggle />
    </header>
  );
}
