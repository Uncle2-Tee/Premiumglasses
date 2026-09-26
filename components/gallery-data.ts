import type { GalleryCategory } from '@/lib/gallery-store';

export type { GalleryCategory } from '@/lib/gallery-store';
export const galleryCategorySlugs: Record<string, GalleryCategory> = {
  windows: 'Windows',
  doors: 'Doors',
  commercial: 'Commercial',
  partitions: 'Partitions',
  customised: 'Customised',
};
