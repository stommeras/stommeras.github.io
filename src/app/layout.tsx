import type { Metadata } from 'next';
import { Cascadia_Mono } from 'next/font/google';
import { ThemeProvider } from '../components/ThemeProvider';
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
