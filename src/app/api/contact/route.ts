import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as z from 'zod';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendSubmissionNotification } from '@/lib/email';
import { getErrorMessage } from '@/lib/errors';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(120),
  email: z.string().trim().email('A valid email address is required').max(200),
  subject: z.string().trim().min(2, 'Subject is required').max(200),
  message: z.string().trim().min(5, 'Message is required').max(5000),
});

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid submission.' },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const { error } = await supabaseAdmin()
      .from('contacts')
      .insert([{ name, email, subject, message }]);

    if (error) throw error;
  } catch (error) {
    console.error('[contact] failed to save submission:', getErrorMessage(error));
    return NextResponse.json(
      { error: 'We could not save your message. Please try again.' },
      { status: 500 }
    );
  }

  // The lead is safe in the database at this point, so a mail failure is
  // logged and reported but never fails the request.
  const emailResult = await sendSubmissionNotification({
    kind: 'Contact Enquiry',
    subject: `New contact enquiry: ${subject}`,
    headline: subject,
    replyTo: email,
    replyToName: name,
    fields: [
      { label: 'From', value: name },
      { label: 'Email', value: email },
      { label: 'Subject', value: subject },
      { label: 'Message', value: message, long: true },
    ],
  });

  if (!emailResult.sent) {
    console.error('[contact] notification email not sent:', emailResult.reason);
  }

  return NextResponse.json({ success: true, emailed: emailResult.sent });
}
