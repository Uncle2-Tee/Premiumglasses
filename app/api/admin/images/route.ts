import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getGalleryCategories, getCategoryPrefix, isGalleryFilename, isSupabaseGalleryFilename, type GalleryCategory } from '@/lib/gallery-store';
import { galleryBucket, getSupabaseAdmin } from '@/lib/supabase-admin';
import { isAdminRequest } from '../auth';

const allowedTypes = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
]);

const validCategories = new Set<GalleryCategory>(['Windows', 'Doors', 'Commercial', 'Partitions', 'Customised']);

function unauthorized() {
  return NextResponse.json({ error: 'Admin authentication required.' }, { status: 401 });
}

export async function GET() {
  if (!(await isAdminRequest())) return unauthorized();
  return NextResponse.json(await getGalleryCategories());
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) return unauthorized();

  const formData = await request.formData();
  const category = formData.get('category');
  const image = formData.get('image');

  if (typeof category !== 'string' || !validCategories.has(category as GalleryCategory)) {
    return NextResponse.json({ error: 'Choose a valid gallery category.' }, { status: 400 });
  }
  if (!(image instanceof File)) {
    return NextResponse.json({ error: 'Choose an image to upload.' }, { status: 400 });
  }

  const extension = allowedTypes.get(image.type);
  if (!extension) return NextResponse.json({ error: 'Use a JPG, PNG, or WebP image.' }, { status: 400 });
  if (image.size > 8 * 1024 * 1024) return NextResponse.json({ error: 'Images must be 8MB or smaller.' }, { status: 400 });

  const prefix = getCategoryPrefix(category as GalleryCategory);
  const filename = `${prefix}-${randomUUID()}${extension}`;
  const { error } = await getSupabaseAdmin().storage.from(galleryBucket).upload(filename, image, {
    contentType: image.type,
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) return NextResponse.json({ error: 'Image storage failed.' }, { status: 500 });

  return NextResponse.json({ ok: true, filename, category }, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!(await isAdminRequest())) return unauthorized();

  const body = await request.json().catch(() => null);
  const filename = typeof body?.filename === 'string' ? body.filename : '';
  if (!filename || filename !== body.filename || !isGalleryFilename(filename)) {
    return NextResponse.json({ error: 'Invalid gallery image.' }, { status: 400 });
  }

  if (!(await isSupabaseGalleryFilename(filename))) {
    return NextResponse.json({ error: 'Image was not found.' }, { status: 404 });
  }
  const { error } = await getSupabaseAdmin().storage.from(galleryBucket).remove([filename]);
  if (error) return NextResponse.json({ error: 'Image deletion failed.' }, { status: 500 });

  return NextResponse.json({ ok: true });
}
