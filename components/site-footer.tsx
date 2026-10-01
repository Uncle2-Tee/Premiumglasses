'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="glass-footer">
      <div className="glass-footer-brand">
        <span className="glass-footer-logo">Philipo Inzaghi Glass</span>
        <p>Premium glass solutions for residential and commercial projects.</p>
      </div>
      <nav className="glass-footer-links" aria-label="Footer navigation">
        <div>
          <h2>Explore</h2>
          <Link href="/products">Products</Link>
          <Link href="/services">Services</Link>
          <Link href="/gallery">Gallery</Link>
        </div>
        <div>
          <h2>Company</h2>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
      <div className="glass-footer-meta">
        <h2>Contact</h2>
        <a href="tel:0248329783">0248329783</a>
        <a href="mailto:philipoinzaghi250@gmail.com">philipoinzaghi250@gmail.com</a>
        <span>Ashalaja</span>
      </div>
    </footer>
  );
}