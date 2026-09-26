import { NextResponse } from 'next/server';
import { isValidAdminPassword, setAdminSession } from '../auth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!password || !isValidAdminPassword(password)) {
    return NextResponse.json({ error: 'Invalid admin password.' }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
