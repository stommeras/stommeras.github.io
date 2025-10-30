import { Header } from '@/components/Header';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Cascadia_Mono } from 'next/font/google';
import './globals.css';

const cascadiaMono = Cascadia_Mono({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tømmerås',
  description: 'One of the websites of all time.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cascadiaMono.className} antialiased`}>
        <ThemeProvider attribute="data-mode">
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
