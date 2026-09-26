import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { unstable_noStore as noStore } from 'next/cache';
import { getGalleryImageUrl, galleryBucket, getSupabaseAdmin, isSupabaseConfigured } from './supabase-admin';

export const galleryCategories = ['Windows', 'Doors', 'Commercial', 'Partitions', 'Customised'] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

const categoryPrefixes: Record<GalleryCategory, string> = {
  Windows: 'w',
  Doors: 'd',
  Commercial: 'c',
  Partitions: 'p',
  Customised: 'ct',
};

const imagePattern = /\.(jpe?g|png|webp)$/i;

function sortNaturally(left: string, right: string) {
  return left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' });
}

function belongsToCategory(filename: string, category: GalleryCategory) {
  const prefix = categoryPrefixes[category];
  return category === 'Customised'
    ? filename.startsWith(`${prefix}`)
    : new RegExp(`^${prefix}(?:\\d+|-)`, 'i').test(filename);
}

export async function getGalleryCategories(): Promise<Record<GalleryCategory, string[]>> {
  noStore();
  const imageDirectory = path.join(process.cwd(), 'public', 'images');
  const files = await readdir(imageDirectory);
  const galleryFiles = files.filter((file) => imagePattern.test(file) && file !== 'w_logo.jpg');
  const supabaseFiles = isSupabaseConfigured()
    ? (await getSupabaseAdmin().storage.from(galleryBucket).list('', { limit: 1000 })).data ?? []
    : [];
  const remoteFiles = supabaseFiles.map((file) => file.name).filter((file) => imagePattern.test(file));

  return Object.fromEntries(
    galleryCategories.map((category) => [
      category,
      [...new Set([
        ...galleryFiles.filter((file) => belongsToCategory(file, category)).map((file) => `/images/${file}`),
        ...remoteFiles.filter((file) => belongsToCategory(file, category)).map(getGalleryImageUrl),
      ])]
        .sort(sortNaturally)
    ]),
  ) as Record<GalleryCategory, string[]>;
}

export function getCategoryPrefix(category: GalleryCategory) {
  return categoryPrefixes[category];
}

export function isGalleryFilename(filename: string) {
  return galleryCategories.some((category) => belongsToCategory(filename, category));
}

export async function isSupabaseGalleryFilename(filename: string) {
  if (!isSupabaseConfigured()) return false;
  const { data, error } = await getSupabaseAdmin().storage.from(galleryBucket).list('', { limit: 1000 });
  if (error) throw error;
  return data.some((file) => file.name === filename);
}
