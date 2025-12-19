'use client';

import { useBoopHover } from '@/hooks/useBoop';
import { animated } from '@react-spring/web';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('common');
  const [githubStyle, triggerGithub] = useBoopHover();
  const [linkedinStyle, triggerLinkedin] = useBoopHover();

  const currentYear = new Date().getFullYear();

  const socials = [
    {
      key: 'github',
      href: 'https://github.com/stommeras/tommeras.no',
      icon: <GithubIcon />,
      style: githubStyle,
      trigger: triggerGithub,
    },
    {
      key: 'linkedin',
      href: 'https://www.linkedin.com/in/steffen-tommeras/',
      icon: <LinkedInIcon />,
      style: linkedinStyle,
      trigger: triggerLinkedin,
    },
  ] as const;

  return (
    <footer className="border-border/40 bg-card/50 mt-auto flex w-full flex-col items-center justify-between gap-4 border-t p-4 backdrop-blur-sm md:flex-row">
      <p className="text-muted-foreground text-sm" suppressHydrationWarning>
        Steffen Tømmerås © {currentYear}
      </p>
      <nav className="flex items-center gap-4" aria-label={t('footer.nav.ariaLabel')}>
        {socials.map((social) => (
          <a
            key={social.key}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary text-lg transition-colors"
            onMouseEnter={social.trigger}
            aria-label={t(`footer.nav.${social.key}.ariaLabel`)}>
            <animated.div style={social.style}>{social.icon}</animated.div>
          </a>
        ))}
      </nav>
    </footer>
  );
}

function GithubIcon() {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
      <title>LinkedIn</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.5h3.414v1.569h.049c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.37 4.268 5.455v6.328zm-14.693-13.003c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.064 2.063-2.064s2.063.926 2.063 2.064c0 1.139-.92 2.065-2.063 2.065zm1.777 13.003h-3.554v-11.5h3.554v11.5zm16.469-20.452h-22.451c-.981 0-1.776.795-1.776 1.777v20.451c0 .981.795 1.776 1.776 1.776h22.451c.981 0 1.776-.795 1.776-1.776v-20.451c0-.982-.795-1.777-1.776-1.777z" />
    </svg>
  );
}
