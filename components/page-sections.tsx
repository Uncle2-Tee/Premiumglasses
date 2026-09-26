import Image from 'next/image';

export const processSteps = [
  ['01', 'Consultation', 'We understand your vision, space, and practical requirements.'],
  ['02', 'Measurement', 'Accurate measurements give every project a precise foundation.'],
  ['03', 'Recommendation', 'We guide you through suitable glass, finishes, and installation options.'],
  ['04', 'Installation', 'Our team completes the work carefully, safely, and professionally.'],
] as const;

export function Steps({ steps = processSteps }: { steps?: readonly (readonly [string, string, string])[] }) {
  return <div className="steps">{steps.map(([number, title, description]) => <div className="step" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{description}</p></div>)}</div>;
}

export function ProjectImages({ images }: { images: string[] }) {
  return <div className="image-row">{images.map((image) => <Image key={image} src={image} alt="Philipo Inzaghi Glass project" width={500} height={340} />)}</div>;
}

export function CategoryTabs({ active }: { active?: string }) {
  const tabs = [['All', '/gallery'], ['Windows', '/gallery-windows'], ['Doors', '/gallery-doors'], ['Commercial', '/gallery-commercial'], ['Partitions', '/gallery-partitions'], ['Customised', '/gallery-customised']];
  return <nav className="category-tabs" aria-label="Gallery categories">{tabs.map(([label, href]) => <a className={`category-tab${active === label ? ' active' : ''}`} href={href} key={label}>{label}</a>)}</nav>;
}
