import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { __renderPreview, type SubmissionNotification } from '@/lib/email';

/**
 * Renders a notification email in the browser so the template can be reviewed
 * without sending mail. Development only — never exposed in production.
 *
 *   /api/dev/email-preview?kind=contact | waitlist | host
 */

const SAMPLES: Record<string, SubmissionNotification> = {
  contact: {
    kind: 'Contact Enquiry',
    subject: 'Partnership enquiry for a Udaipur property',
    headline: 'Partnership enquiry for a Udaipur property',
    replyTo: 'aditi.mehra@example.com',
    replyToName: 'Aditi Mehra',
    fields: [
      { label: 'From', value: 'Aditi Mehra' },
      { label: 'Email', value: 'aditi.mehra@example.com' },
      { label: 'Subject', value: 'Partnership enquiry for a Udaipur property' },
      {
        label: 'Message',
        value:
          'We run a nine-suite heritage haveli overlooking Lake Pichola and are looking for a curated platform rather than a mass listing site.\n\nCould we arrange a call this week to discuss what onboarding looks like?',
        long: true,
      },
    ],
  },
  waitlist: {
    kind: 'VIP Waitlist Signup',
    subject: 'New VIP waitlist signup: rohan.kapoor@example.com',
    headline: 'Rohan Kapoor',
    replyTo: 'rohan.kapoor@example.com',
    replyToName: 'Rohan Kapoor',
    fields: [
      { label: 'Name', value: 'Rohan Kapoor' },
      { label: 'Email', value: 'rohan.kapoor@example.com' },
      { label: 'Phone', value: '+91 98765 43210' },
      { label: 'Preferences', value: { city: 'Mumbai', destinations: 'Goa, Rajasthan' } },
      { label: 'Source', value: 'traveler_page_v2' },
    ],
  },
  host: {
    kind: 'Host Application',
    subject: 'New host application: Amrita Estate',
    headline: 'Amrita Estate',
    replyTo: 'stay@amritaestate.example.com',
    replyToName: 'Vikram Singh',
    fields: [
      { label: 'Business', value: 'Amrita Estate' },
      { label: 'Host Name', value: 'Vikram Singh' },
      { label: 'Category', value: 'Private Villa' },
      { label: 'City', value: 'Alibaug, Maharashtra' },
      { label: 'Email', value: 'stay@amritaestate.example.com' },
      { label: 'Phone', value: '+91 90000 11111' },
      { label: 'Website', value: 'https://amritaestate.example.com' },
      { label: 'Years in Business', value: '6 years' },
      { label: 'Price Range', value: '₹45,000 – ₹80,000 per night' },
      {
        label: 'Description',
        value:
          'A six-bedroom coastal estate on two acres of mango orchard, with a private stretch of beach, a resident chef and a staff of eleven.',
        long: true,
      },
      {
        label: 'Why Join La Vivenzia',
        value:
          'We want guests who value provenance and service over price, and a partner who represents the property the way we would ourselves.',
        long: true,
      },
    ],
  },
};

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const kind = request.nextUrl.searchParams.get('kind') || 'contact';
  const sample = SAMPLES[kind] ?? SAMPLES.contact;

  return new NextResponse(__renderPreview(sample), {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
