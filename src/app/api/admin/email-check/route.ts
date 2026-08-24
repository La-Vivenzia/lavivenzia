import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySmtp } from '@/lib/email';

/**
 * Admin-only SMTP health check, so a misconfigured mail server is visible in
 * the dashboard instead of only showing up as missing notification emails.
 */
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  if (!token || token.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await verifySmtp();
  return NextResponse.json({
    ...result,
    notifyTo: process.env.NOTIFICATION_EMAIL || 'tejas.natani@lavivenzia.com',
  });
}
