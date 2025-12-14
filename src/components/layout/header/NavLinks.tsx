'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinksProps {
  className?: string;
  onLinkClick?: () => void;
}

export function NavLinks({ onLinkClick, className }: NavLinksProps) {
  const pathname = usePathname();
  const t = useTranslations('common');

  const links = [
    { href: '/', label: t('brand'), isBrand: true },
    { href: '/about', label: t('nav.about'), isBrand: false },
    { href: '/contact', label: t('nav.contact'), isBrand: false },
  ];

  const handleClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <nav className={className}>
      {links.map(({ href, label, isBrand }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            onClick={handleClick}
            className={`transition-colors hover:text-[deeppink] ${
              isBrand ? 'mr-8 text-2xl font-bold italic' : 'text-lg not-italic'
            } ${isActive ? 'underline' : ''}`}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
