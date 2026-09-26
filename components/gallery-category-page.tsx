import Link from 'next/link';
import { getGalleryCategories, type GalleryCategory } from '@/lib/gallery-store';
import { GalleryViewer } from '@/components/gallery-viewer';
import { CategoryTabs } from '@/components/page-sections';

export async function GalleryCategoryPage({ title }: { title: GalleryCategory }) {
  const galleryCategories = await getGalleryCategories();
  return <div className="page"><Link className="back-link" href="/gallery">← Back to Gallery</Link><section className="hero-copy gallery-heading"><p className="eyebrow">PROJECTS AND INSTALLATIONS</p><h1>{title}</h1><p className="lede">Sample projects and installations.</p></section><CategoryTabs active={title} /><GalleryViewer images={galleryCategories[title]} label={title} /></div>;
}
