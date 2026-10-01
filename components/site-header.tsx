 'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import philLogo from '../assets/images/phil-logo.png';

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-brand">
          <Image className="site-brand-logo" src={philLogo} alt="Philipo Inzaghi Glass" priority />
        </div>
        <button
          className="site-nav-toggle"
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="site-primary-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
        <nav className={`site-nav${isOpen ? ' is-open' : ''}`} id="site-primary-navigation" aria-label="Primary navigation">
          {navigationItems.map(({ label, href }) => {
            const active = href === '/' ? pathname === href : pathname === href || (href === '/gallery' && pathname.startsWith('/gallery-'));
            return (
              <Link
                className={`site-nav-link${active ? ' active' : ''}`}
                href={href}
                key={href}
                aria-current={active ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
