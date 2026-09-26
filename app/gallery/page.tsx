import { GalleryViewer } from '@/components/gallery-viewer';
import { CategoryTabs } from '@/components/page-sections';
import { getGalleryCategories } from '@/lib/gallery-store';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const galleryCategories = await getGalleryCategories();
  const allGalleryImages = Object.values(galleryCategories).flat();
  return <div className="page"><section className="hero-copy gallery-heading"><p className="eyebrow">OUR WORK</p><p className="lede">Browse our previous projects and installations.</p></section><CategoryTabs active="All" /><GalleryViewer images={allGalleryImages} label="All projects" /></div>;
}
