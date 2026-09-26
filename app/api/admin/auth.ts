import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const sessionCookie = 'philipo_admin_session';

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error('ADMIN_PASSWORD is not configured.');
  return password;
}

function createSessionToken() {
  return createHmac('sha256', getAdminPassword()).update('philipo-admin').digest('hex');
}

export function isValidAdminPassword(candidate: string) {
  const expected = Buffer.from(getAdminPassword());
  const actual = Buffer.from(candidate);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function isAdminRequest() {
  const token = (await cookies()).get(sessionCookie)?.value;
  return Boolean(token && token === createSessionToken());
}

export async function setAdminSession() {
  (await cookies()).set(sessionCookie, createSessionToken(), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  (await cookies()).delete(sessionCookie);
}
