'use client';

import { DarkToggle } from '@/components/layout/header/DarkToggle';
import { LocaleSwitcher } from '@/components/layout/header/LocaleSwitcher';
import { MobileMenuToggle } from '@/components/layout/header/MobileMenuToggle';
import { NavLinks } from '@/components/layout/header/NavLinks';
import { useState } from 'react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 z-10 w-full backdrop-blur-sm">
      <div className="flex items-center justify-between p-4">
        <NavLinks className="hidden md:flex md:gap-6" />
        <MobileMenuToggle isOpen={isMobileMenuOpen} onToggle={handleMobileMenuToggle} />
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <DarkToggle />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <NavLinks onLinkClick={handleLinkClick} className="flex flex-col gap-4 p-4 pt-0" />
      </div>
    </header>
  );
}
