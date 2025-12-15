import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['nb', 'en'],
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
