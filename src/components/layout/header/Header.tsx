'use client';

import { DarkToggle } from '@/components/layout/header/DarkToggle';
import { LocaleSwitcher } from '@/components/layout/header/LocaleSwitcher';
import { NavLinks } from '@/components/layout/header/NavLinks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBoop } from '@/hooks/useBoop';
import { Link } from '@/i18n/navigation';
import { animated } from '@react-spring/web';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations('common');
  const [style, trigger] = useBoop({ scale: 1.1, rotation: 10 });

  const mobileLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ] as const;

  return (
    <header className="fixed top-0 z-10 w-full backdrop-blur-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-8">
          <DropdownMenu onOpenChange={trigger}>
            <DropdownMenuTrigger className="rounded p-2 text-lg transition-colors hover:text-[deeppink] md:hidden">
              <animated.div className="leading-none" style={style}>
                <Menu className="h-6 w-6" />
              </animated.div>
              <span className="sr-only">{t('mobileMenu.open')}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="flex flex-col gap-1">
              {mobileLinks.map(({ href, label }) => (
                <DropdownMenuItem key={href} asChild>
                  <Link href={href}>{label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/" className="text-2xl font-bold italic hover:text-[deeppink]">
            {t('brand')}
          </Link>
          <NavLinks className="hidden md:flex md:gap-6" />
        </div>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <DarkToggle />
        </div>
      </div>
    </header>
  );
}
