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

          <section className="glass-features glass-panel">
            <div className="glass-section-heading">
              <p>Featured</p>
              <h2>Our specialist solutions</h2>
            </div>

            <div className="glass-card-grid">
              {featureItems.map((item) => (
                <article key={item.title} className="glass-feature-card">
                  <div className="glass-card-image">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 100vw, 33vw" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="glass-why glass-panel">
            <div className="glass-section-heading">
              <p>Why choose us</p>
              <h2>Built around quality and trust</h2>
            </div>

            <div className="glass-why-layout">
              <div className="glass-why-points">
                {reasons.map((reason, index) => (
                  <div key={reason} className="glass-why-item">
                    <span>{index + 1}</span>
                    <p>{reason}</p>
                  </div>
                ))}
              </div>

              <div className="glass-why-callout">
                <p>
                  We combine craftsmanship, expert guidance, and reliable installation so your glass project looks
                  beautiful and performs for years.
                </p>
              </div>
            </div>
          </section>

          <section className="glass-review glass-panel">
            <div className="glass-section-heading center">
              <p>Reviews</p>
              <h2>Clients trust our work</h2>
            </div>

            <div className="glass-review-grid">
              {reviews.map((review) => (
                <article key={review.name} className="glass-review-card">
                  <div className="glass-stars" aria-label="Five star review">
                    ★★★★★
                  </div>
                  <p>“{review.quote}”</p>
                  <strong>{review.name}</strong>
                </article>
              ))}
            </div>
          </section>

          <section className="glass-faq glass-panel">
            <div className="glass-section-heading">
              <p>FAQ</p>
              <h2>Answers to common questions</h2>
            </div>
            <div className="glass-faq-list">
              {faqs.map((faq, index) => (
                <details key={faq} className="glass-faq-item" open={index === 0}>
                  <summary>{faq}</summary>
                  <p>
                    Our team helps with measurements, material selection, design suggestions, and installation so each
                    glass solution matches your needs, budget, and intended space.
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="glass-cta glass-panel">
            <div>
              <p className="glass-kicker light">Ready to begin?</p>
              <h2>Let us help you choose the right glass for your next project.</h2>
            </div>
            <Link href="/contact" className="glass-primary-button dark-button">
              Request a call back
            </Link>
          </section>

        </div>
      </main>
    </div>
  );
}
