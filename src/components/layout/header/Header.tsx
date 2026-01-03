'use client';

import { LocaleSwitcher } from '@/components/layout/header/LocaleSwitcher';
import { NavLinks } from '@/components/layout/header/NavLinks';
import { ThemeSwitcher } from '@/components/layout/header/ThemeSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBoopHover } from '@/hooks/useBoop';
import { Link } from '@/i18n/navigation';
import { animated } from '@react-spring/web';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations('common');
  const [style, trigger] = useBoopHover();

  const mobileLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ] as const;

  return (
    <header className="fixed top-0 z-20 w-full">
      <div className="from-card absolute inset-0 bg-linear-to-b to-transparent backdrop-blur-sm [mask:linear-gradient(black,black,transparent)]" />
      <div className="relative flex items-center justify-between p-2 md:p-4">
        <div className="flex items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="hover:text-primary rounded p-2 text-lg transition-colors md:hidden"
              onMouseEnter={trigger}>
              <animated.div className="leading-none" style={style}>
                <Menu className="h-6 w-6" />
              </animated.div>
              <span className="sr-only">{t('mobileMenu.open')}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="flex flex-col gap-1">
              {mobileLinks.map(({ href, label }) => (
                <DropdownMenuItem key={href} render={<Link href={href}>{label}</Link>} />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/" className="hover:text-primary text-2xl font-bold italic">
            {t('brand')}
          </Link>
          <NavLinks className="hidden md:flex md:gap-6" />
        </div>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
