import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'nb'],
  localePrefix: 'as-needed',
  defaultLocale: 'nb',
  pathnames: {
    '/': '/',
    '/about': {
      nb: '/om-meg',
    },
    '/contact': {
      nb: '/kontakt',
    },
  },
});
