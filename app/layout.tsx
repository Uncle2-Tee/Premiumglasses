import type { Metadata } from 'next';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Philipo Inzaghi Glass',
  description: 'Quality windows, doors, partitions, and customised glass solutions.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteHeader />
        <main>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
