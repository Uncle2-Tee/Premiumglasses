 'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Images, Info, Package, Phone, Wrench } from 'lucide-react';

const navigationItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Products', href: '/products', icon: Package },
  { label: 'Services', href: '/services', icon: Wrench },
  { label: 'Gallery', href: '/gallery', icon: Images },
  { label: 'About Us', href: '/about', icon: Info },
  { label: 'Contact Us', href: '/contact', icon: Phone },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="brand-mark" aria-label="Philipo Inzaghi Glass home">
        <span className="brand-word" aria-hidden="true">
          {'Philipo'.split('').map((letter, index) => <span className="brand-letter" key={`${letter}-${index}`}>{letter}</span>)}
        </span>
        <strong className="brand-word" aria-hidden="true">
          {'Inzaghi'.split('').map((letter, index) => <span className="brand-letter" key={`${letter}-${index}`}>{letter}</span>)}
        </strong>
      </div>
      <nav className="site-nav" aria-label="Primary navigation">
        {navigationItems.map(({ label, href, icon: Icon }) => {
          const active = href === '/' ? pathname === href : pathname.startsWith(href);
          return (
            <Link className={`nav-link${active ? ' active' : ''}`} href={href} key={href}>
              <Icon size={16} strokeWidth={2.4} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
