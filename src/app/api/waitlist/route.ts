import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as z from 'zod';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendSubmissionNotification } from '@/lib/email';
import { getErrorMessage } from '@/lib/errors';

const waitlistSchema = z.object({
  email: z.string().trim().email('A valid email address is required').max(200),
  name: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(40).optional(),
  // The column is jsonb, so callers pass whichever shape their form collects.
  preferences: z.record(z.string(), z.unknown()).nullish(),
  source: z.string().trim().max(60).optional(),
});

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid submission.' },
      { status: 400 }
    );
  }

  const { email, name, phone, preferences, source } = parsed.data;

  try {
    const { error } = await supabaseAdmin()
      .from('waitlist')
      .insert([
        {
          email,
          name: name || null,
          phone: phone || null,
          preferences: preferences ?? null,
          source: source || 'website',
        },
      ]);

    if (error) throw error;
  } catch (error) {
    console.error('[waitlist] failed to save signup:', getErrorMessage(error));
    return NextResponse.json(
      { error: 'We could not save your details. Please try again.' },
      { status: 500 }
    );
  }

  const emailResult = await sendSubmissionNotification({
    kind: 'VIP Waitlist',
    subject: `New VIP waitlist signup: ${email}`,
    replyTo: email,
    replyToName: name,
    fields: [
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      { label: 'Phone', value: phone },
      { label: 'Preferences', value: preferences },
      { label: 'Source', value: source || 'website' },
    ],
  });

  if (!emailResult.sent) {
    console.error('[waitlist] notification email not sent:', emailResult.reason);
  }

  return NextResponse.json({ success: true, emailed: emailResult.sent });
}
