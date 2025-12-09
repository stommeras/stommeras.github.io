'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinksProps {
  className?: string;
  onLinkClick?: () => void;
}

const links = [
  { href: '/', label: 'Tømmerås', isBrand: true },
  { href: '/projects', label: 'Projects', isBrand: false },
  { href: '/about', label: 'About', isBrand: false },
  { href: '/contact', label: 'Contact', isBrand: false },
];

export function NavLinks({ onLinkClick, className }: NavLinksProps) {
  const pathname = usePathname();

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
