'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

export function LocaleSwitcher() {
  const t = useTranslations('common.locales');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: newLocale }
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="hover:text-primary text-md hover:border-accent border-2 px-2 transition-colors"
        disabled={isPending}>
        {locale.toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        {routing.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={locale === loc ? 'bg-ring' : ''}>
            {t(loc)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
