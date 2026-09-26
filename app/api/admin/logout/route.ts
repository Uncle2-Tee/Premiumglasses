import { NextResponse } from 'next/server';
import { clearAdminSession } from '../auth';

export async function POST() {
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
