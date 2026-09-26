import 'server-only';

import { createClient } from '@supabase/supabase-js';

export const galleryBucket = process.env.SUPABASE_STORAGE_BUCKET ?? 'gallery';

export function isSupabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function getGalleryImageUrl(filename: string) {
  const url = process.env.SUPABASE_URL;
  if (!url) throw new Error('SUPABASE_URL is required.');
  return `${url}/storage/v1/object/public/${galleryBucket}/${encodeURIComponent(filename)}`;
}