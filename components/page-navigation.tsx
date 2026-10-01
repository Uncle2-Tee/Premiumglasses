'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const pages = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Windows Gallery', href: '/gallery-windows' },
  { label: 'Doors Gallery', href: '/gallery-doors' },
  { label: 'Commercial Gallery', href: '/gallery-commercial' },
  { label: 'Partitions Gallery', href: '/gallery-partitions' },
  { label: 'Customised Gallery', href: '/gallery-customised' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function PageNavigation() {
  const pathname = usePathname();
  const currentIndex = pages.findIndex((page) => page.href === pathname);

  if (currentIndex < 0) return null;

  const previousPage = pages[currentIndex - 1];
  const nextPage = pages[currentIndex + 1];

  return (
    <nav className="page-navigation" aria-label="Previous and next pages">
      {previousPage && (
        <Link className="page-nav-link previous" href={previousPage.href} aria-label={`Previous page: ${previousPage.label}`}>
          <ArrowLeft size={18} aria-hidden="true" />
          <span><small>Previous</small><strong>{previousPage.label}</strong></span>
        </Link>
      )}
      {nextPage && (
        <Link className="page-nav-link next" href={nextPage.href} aria-label={`Next page: ${nextPage.label}`}>
          <span><small>Next</small><strong>{nextPage.label}</strong></span>
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}