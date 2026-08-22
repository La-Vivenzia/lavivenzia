import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as z from 'zod';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendSubmissionNotification } from '@/lib/email';
import { getErrorMessage } from '@/lib/errors';

const optionalText = z.string().trim().max(2000).optional().default('');

const hostSchema = z.object({
  businessName: z.string().trim().min(2, 'Business name is required').max(200),
  hostName: z.string().trim().min(2, 'Host name is required').max(120),
  emailAddress: z.string().trim().email('A valid email address is required').max(200),
  phoneNumber: z.string().trim().max(40).optional().default(''),
  businessCategory: optionalText,
  cityLocation: optionalText,
  websiteUrl: optionalText,
  instagramHandle: optionalText,
  yearsInBusiness: optionalText,
  priceRange: optionalText,
  shortDescription: z.string().trim().max(5000).optional().default(''),
  reasonForJoining: z.string().trim().max(5000).optional().default(''),
  contactMethod: optionalText,
});

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = hostSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid submission.' },
      { status: 400 }
    );
  }

  const form = parsed.data;

  const row = {
    business_name: form.businessName,
    host_name: form.hostName,
    business_category: form.businessCategory,
    city_location: form.cityLocation,
    website_url: form.websiteUrl,
    instagram_handle: form.instagramHandle,
    phone_number: form.phoneNumber,
    email_address: form.emailAddress,
    years_in_business: form.yearsInBusiness,
    price_range: form.priceRange,
    short_description: form.shortDescription,
    reason_for_joining: form.reasonForJoining,
    contact_method: form.contactMethod,
    status: 'Pending',
  };

  try {
    const { error } = await supabaseAdmin().from('host_registrations').insert([row]);
    if (error) throw error;
  } catch (error) {
    console.error('[host-registration] failed to save application:', getErrorMessage(error));
    return NextResponse.json(
      { error: 'We could not save your application. Please try again.' },
      { status: 500 }
    );
  }

  const emailResult = await sendSubmissionNotification({
    kind: 'Host Application',
    subject: `New host application: ${form.businessName}`,
    replyTo: form.emailAddress,
    replyToName: form.hostName,
    fields: [
      { label: 'Business', value: form.businessName },
      { label: 'Host Name', value: form.hostName },
      { label: 'Category', value: form.businessCategory },
      { label: 'City', value: form.cityLocation },
      { label: 'Email', value: form.emailAddress },
      { label: 'Phone', value: form.phoneNumber },
      { label: 'Website', value: form.websiteUrl },
      { label: 'Instagram', value: form.instagramHandle },
      { label: 'Years in Business', value: form.yearsInBusiness },
      { label: 'Price Range', value: form.priceRange },
      { label: 'Preferred Contact', value: form.contactMethod },
      { label: 'Description', value: form.shortDescription },
      { label: 'Why Join', value: form.reasonForJoining },
    ],
  });

  if (!emailResult.sent) {
    console.error('[host-registration] notification email not sent:', emailResult.reason);
  }

  return NextResponse.json({ success: true, emailed: emailResult.sent });
}
