import Image from 'next/image';
import Link from 'next/link';

const featureItems = [
  {
    title: 'Glass Windows',
    description: 'Clear, tinted, frosted, and made-to-measure windows designed to suit homes, offices, and commercial spaces.',
    image: '/images/w1-20261001.jpg',
  },
  {
    title: 'Glass Doors',
    description: 'Framed and frameless doors that balance security, elegance, and practical daily use.',
    image: '/images/d12.jpg',
  },
  {
    title: 'Partitions',
    description: 'Modern glass partitions that keep spaces bright, private, and open without compromising style.',
    image: '/images/p14.jpg',
  },
  {
    title: 'Commercial Glazing',
    description: 'Professional glazing for shops, offices, restaurants, and larger developments.',
    image: '/images/c2.jpg',
  },
  {
    title: 'Customised Glass',
    description: 'Bespoke glass options built around your measurements, preferences, and design vision.',
    image: '/images/ct2.jpg',
  },
  {
    title: 'Safety Glass',
    description: 'Toughened and laminated glass chosen for strength, protection, and long-term reliability.',
    image: '/images/d13.jpg',
  },
];

const reasons = [
  'Precise measurements and careful project planning',
  'Quality glass, fittings, and durable finishes',
  'Professional installation and clean finishing',
  'Friendly guidance from consultation to completion',
];

const reviews = [
  {
    name: 'Sarah M.',
    quote: 'The team delivered exactly what we needed and the finish was excellent from start to finish.',
  },
  {
    name: 'Daniel K.',
    quote: 'Professional, responsive, and very detail-focused. Our office glazing looks premium and modern.',
  },
  {
    name: 'Amina T.',
    quote: 'We wanted a custom glass feature and they handled the design, installation, and final fit seamlessly.',
  },
];

const faqs = [
  'What types of glass do you install?',
  'Do you offer custom measurements?',
  'Can you work on commercial projects?',
  'How long does installation usually take?',
];

const trustHighlights = [
  {
    tag: 'Bespoke',
    title: 'Tailored to your space',
    description: 'Architecturally consistent finishes and sizes chosen around your property and design intent.',
  },
  {
    tag: 'Reliable',
    title: 'Measured and installed with precision',
    description: 'From consultation to fitting, every stage is managed for quality, safety, and clean presentation.',
  },
  {
    tag: 'Versatile',
    title: 'Homes, shops and commercial sites',
    description: 'Flexible glass solutions designed for daily use across residential and business environments.',
  },
];

export default function HomePage() {
  return (
    <div className="glass-landing-shell">
      <main className="glass-landing-main">
        <div className="glass-shell-inner">
          <section className="glass-hero glass-panel">
            <div className="glass-hero-copy">
              <h1>Premium Glass Solutions for Every Space</h1>
              <p className="glass-lead">
                We create beautiful, durable windows, doors, partitions, and custom glass features for homes,
                offices, shops, and commercial properties.
              </p>
              <div className="glass-cta-row">
                <Link href="/contact" className="glass-primary-button">
                  Get a quote
                </Link>
                <Link href="/services" className="glass-secondary-button">
                  View services
                </Link>
              </div>
            </div>

            <div className="glass-hero-visual">
              <div className="glass-hero-image-wrap">
                <Image src="/images/c2.jpg" alt="Modern glass feature" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
            </div>
          </section>

          <section className="glass-trust-strip glass-panel">
            <div className="glass-section-heading">
              <p>Professional service</p>
              <h2>Thoughtful glazing for modern spaces</h2>
            </div>

            <div className="glass-trust-grid">
              {trustHighlights.map((item) => (
                <article key={item.title} className="glass-trust-card">
                  <span>{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
