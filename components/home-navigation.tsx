'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

type NavigationItem = { label: string; href: string };

export function HomeNavigation({ items }: { items: readonly NavigationItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`glass-nav-menu${isOpen ? ' is-open' : ''}`}>
      <button
        className="glass-nav-toggle"
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="home-navigation-links"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>
      <div className={`glass-top-nav-links${isOpen ? ' is-open' : ''}`} id="home-navigation-links">
        {items.map((item) => (
          <Link key={item.label} href={item.href} className="glass-top-nav-link" onClick={() => setIsOpen(false)}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}