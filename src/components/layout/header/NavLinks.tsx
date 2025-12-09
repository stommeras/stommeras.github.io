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
        const linkClassName = `transition-colors hover:text-[deeppink] ${
          isBrand ? 'text-lg font-bold italic mr-8' : 'not-italic'
        } ${isActive ? 'underline' : ''}`;

        return (
          <Link key={href} href={href} onClick={handleClick} className={linkClassName}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
