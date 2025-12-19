'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface NavLinksProps {
  className?: string;
  onLinkClick?: () => void;
}

export function NavLinks({ onLinkClick, className }: NavLinksProps) {
  const pathname = usePathname();
  const t = useTranslations('common');

  const links = [
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ] as const;

  const handleClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <nav className={className}>
      {links.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            onClick={handleClick}
            className={`hover:text-primary transition-colors ${isActive ? 'underline underline-offset-3' : ''}`}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
