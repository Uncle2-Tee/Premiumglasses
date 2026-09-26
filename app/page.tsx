import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return <div className="page"><section className="hero-image"><Image src="/images/c2.jpg" alt="Architectural glass installation" fill priority sizes="(max-width: 780px) 100vw, 1100px" /><div className="hero-image-copy"><p className="eyebrow">PHILIPO INZAGHI GLASS</p><h1>Glasswork with clarity and character.</h1><p className="lede">Quality windows, doors, partitions, and customised glass solutions, measured and installed with care.</p><Link className="button" href="/contact">Request a quote</Link></div></section></div>;
}
