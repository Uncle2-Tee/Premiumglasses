import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Philipo Inzaghi Glass',
  description: 'Quality windows, doors, partitions, and customised glass solutions.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
