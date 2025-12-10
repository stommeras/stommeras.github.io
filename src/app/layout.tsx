import '@/app/globals.css';
import { Header } from '@/components/layout/header/Header';
import { Toaster } from '@/components/ui/sonner';
import { ConsoleArt } from '@/ConsoleArt';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Cascadia_Code } from 'next/font/google';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cascadiaCode.className} bg-card text-card-foreground antialiased`}>
        <ConsoleArt />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <ViewTransition>
            <main id="main-content" className="flex h-screen w-full justify-center">
              {children}
            </main>
            <Toaster />
          </ViewTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
