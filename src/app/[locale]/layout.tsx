import '@/app/globals.css';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/sonner';
import { ConsoleArt } from '@/ConsoleArt';
import { routing } from '@/i18n/routing';
import { QueryProvider } from '@/providers/QueryProvider';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { Cascadia_Code } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ViewTransition } from 'react';

const cascadiaCode = Cascadia_Code({
  subsets: ['latin'],
  fallback: [
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: 'Tømmerås',
    template: '%s | Tømmerås',
  },
  description: 'Personal website and portfolio of Steffen Tømmerås.',
  keywords: ['portfolio', 'developer', 'website', 'design', 'programming', 'steffen', 'tømmerås'],
  authors: [{ name: 'Steffen Tømmerås' }],
  creator: 'Steffen Tømmerås',
  robots: {
    index: true,
    follow: false,
  },
  metadataBase: new URL('https://stommeras.github.io'),
};

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cascadiaCode.className} bg-card text-card-foreground flex min-h-screen flex-col antialiased`}>
        <ConsoleArt />
        <Analytics />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
          Skip to main content
        </a>
        <NextIntlClientProvider>
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <Header />
              <ViewTransition>
                <main
                  id="main-content"
                  className="flex h-full min-h-0 flex-1 grow justify-center pt-14 md:pt-20"
                  suppressHydrationWarning>
                  {children}
                </main>
                <Toaster richColors />
              </ViewTransition>
              <Footer />
            </ThemeProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
