import nodemailer, { type Transporter } from 'nodemailer';
import { getErrorMessage } from '@/lib/errors';
import { siteUrl } from '@/lib/site';

/**
 * Notification email for form submissions.
 *
 * Every public form on the site (contact, VIP waitlist, host registration)
 * notifies a single inbox. The recipient defaults to the team address but can
 * be overridden per-environment with NOTIFICATION_EMAIL.
 *
 * Delivery is plain SMTP through nodemailer, so moving from the current
 * provider to AWS SES later is a credentials change (SMTP_HOST /
 * email-smtp.<region>.amazonaws.com, port 587, the SES SMTP user + password)
 * rather than a code change.
 */

const DEFAULT_TO = 'tejas.natani@lavivenzia.com';
const DEFAULT_FROM = 'noreply@lavivenzia.com';

export interface NotificationField {
  label: string;
  value: unknown;
  /** Render full width in its own panel — for message bodies and descriptions. */
  long?: boolean;
}

export interface SubmissionNotification {
  /** Short label for the kind of submission, e.g. "Contact Form". */
  kind: string;
  /** Subject line for the notification. */
  subject: string;
  /** Headline shown at the top of the email, e.g. the sender or business name. */
  headline: string;
  /** Ordered label/value pairs rendered into the email body. */
  fields: NotificationField[];
  /** Address of the person who submitted, used as Reply-To so replies work. */
  replyTo?: string;
  replyToName?: string;
}

export type EmailResult =
  | { sent: true; messageId: string }
  | { sent: false; reason: string };

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
}

function smtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  if (!host) return null;

  const port = Number(process.env.SMTP_PORT || 587);
  // Port 465 is implicit TLS; 587 and 25 start plaintext and upgrade with
  // STARTTLS. SMTP_SECURE overrides when a provider deviates from that.
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === 'true'
    : port === 465;

  return {
    host,
    port,
    secure,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  };
}

/**
 * One pooled transporter per server process. Building a transporter per email
 * would open a fresh TCP + TLS handshake for every form submission.
 */
let cachedTransport: Transporter | null = null;

function transporter(config: SmtpConfig): Transporter {
  if (!cachedTransport) {
    cachedTransport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      pool: true,
      maxConnections: 3,
      ...(config.user && config.pass
        ? { auth: { user: config.user, pass: config.pass } }
        : {}),
    });
  }
  return cachedTransport;
}

function recipient() {
  return process.env.NOTIFICATION_EMAIL || DEFAULT_TO;
}

function sender() {
  const email = process.env.NOTIFICATION_FROM_EMAIL || DEFAULT_FROM;
  const name = process.env.NOTIFICATION_FROM_NAME || 'La Vivenzia';
  return `"${name}" <${email}>`;
}

// ── Brand palette ────────────────────────────────────────────────────────────
// Mirrors the tokens in src/app/globals.css. The two translucent border tokens
// are pre-flattened against the card background, because Outlook's Word engine
// ignores rgba() and would drop the rule entirely.
const C = {
  ground: '#080806',      // --color-background
  card: '#0D0C09',        // --color-background-soft
  panel: '#100E0A',       // --color-surface
  inset: '#151109',       // --color-surface-warm
  gold: '#C6943B',        // --color-gold-primary
  goldLight: '#D7AE63',   // --color-gold-light
  goldDeep: '#96702F',    // --color-gold-muted
  ivory: '#E7D5B4',       // --color-ivory
  body: '#C8BCA9',        // --color-body-text
  faint: '#A89C8B',       // --color-muted-text
  border: '#4E3C1B',      // --color-border-gold, flattened on --card
  hairline: '#2B2416',    // --color-border-subtle, flattened on --card
} as const;

// Cinzel and Montserrat load in Apple Mail and are silently ignored by Gmail,
// so each stack names a system fallback that carries the same character.
const DISPLAY = `'Cinzel', Georgia, 'Times New Roman', serif`;
const SANS = `'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif`;

/** Values arrive from JSON, so anything can show up — flatten it readably. */
function displayValue(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== null && v !== undefined && v !== '')
      .map(([k, v]) => `${k}: ${String(v)}`)
      .join(' · ');
  }
  return String(value);
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function receivedAt(): string {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Populated fields only — empty rows make the email look broken, not thorough. */
function presentFields(fields: NotificationField[]): NotificationField[] {
  return fields.filter(
    (f) => f.value !== null && f.value !== undefined && f.value !== '' && displayValue(f.value) !== '—'
  );
}

function renderText(notification: SubmissionNotification): string {
  const lines = presentFields(notification.fields).map(
    (f) => `${f.label}: ${displayValue(f.value)}`
  );
  return [
    'LA VIVENZIA',
    `New ${notification.kind}`,
    '',
    notification.headline,
    '─'.repeat(40),
    '',
    ...lines,
    '',
    '─'.repeat(40),
    `Received ${receivedAt()} IST`,
    `Also saved to the admin dashboard: ${siteUrl}/admin`,
  ].join('\n');
}

/** One label/value row, or a full-width panel when the value is long-form. */
function renderField(field: NotificationField, isLast: boolean): string {
  const label = escapeHtml(field.label).toUpperCase();
  const value = escapeHtml(displayValue(field.value)).replace(/\n/g, '<br />');
  const divider = isLast ? 'none' : `1px solid ${C.hairline}`;

  if (field.long) {
    return `<tr><td style="padding:18px 0;border-bottom:${divider};">
      <div style="font-family:${SANS};font-size:9px;letter-spacing:0.28em;text-transform:uppercase;color:${C.gold};padding-bottom:10px;">${label}</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="2" bgcolor="${C.gold}" style="width:2px;background-color:${C.gold};font-size:0;line-height:0;">&nbsp;</td>
          <td bgcolor="${C.inset}" style="background-color:${C.inset};padding:14px 18px;font-family:${SANS};font-size:14px;line-height:1.75;color:${C.body};font-weight:300;">${value}</td>
        </tr>
      </table>
    </td></tr>`;
  }

  return `<tr><td style="padding:15px 0;border-bottom:${divider};">
    <div style="font-family:${SANS};font-size:9px;letter-spacing:0.28em;text-transform:uppercase;color:${C.faint};padding-bottom:6px;">${label}</div>
    <div style="font-family:${SANS};font-size:15px;line-height:1.5;color:${C.ivory};font-weight:400;">${value}</div>
  </td></tr>`;
}

function renderHtml(notification: SubmissionNotification): string {
  const fields = presentFields(notification.fields);
  const rows = fields
    .map((f, i) => renderField(f, i === fields.length - 1))
    .join('');

  // Shown by the inbox next to the subject, then hidden in the body itself.
  const preheader = escapeHtml(
    `${notification.headline} · received ${receivedAt()} IST`
  );

  const replyButton = notification.replyTo
    ? `<tr><td align="center" style="padding:8px 0 4px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr><td bgcolor="${C.gold}" style="background-color:${C.gold};background-image:linear-gradient(135deg,${C.goldLight} 0%,${C.gold} 50%,${C.goldDeep} 100%);">
            <a href="mailto:${escapeHtml(notification.replyTo)}?subject=${encodeURIComponent(
              `Re: ${notification.subject}`
            )}" style="display:inline-block;padding:14px 34px;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${C.ground};text-decoration:none;">Reply to ${escapeHtml(
              notification.replyToName || notification.replyTo
            )}</a>
          </td></tr>
        </table>
      </td></tr>`
    : '';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="dark" />
<meta name="supported-color-schemes" content="dark" />
<title>${escapeHtml(notification.subject)}</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background-color:${C.ground};">
<div style="display:none;font-size:1px;color:${C.ground};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.ground}" style="background-color:${C.ground};margin:0;padding:0;width:100%;">
  <tr><td align="center" style="padding:36px 16px;">

    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:${C.card};border:1px solid ${C.border};">

      <!-- gold rule -->
      <tr><td height="3" style="height:3px;line-height:3px;font-size:0;background-color:${C.gold};background-image:linear-gradient(90deg,${C.goldDeep} 0%,${C.goldLight} 50%,${C.goldDeep} 100%);">&nbsp;</td></tr>

      <!-- brand -->
      <tr><td align="center" bgcolor="${C.panel}" style="background-color:${C.panel};padding:30px 32px 26px;border-bottom:1px solid ${C.hairline};">
        <div style="font-size:13px;line-height:13px;color:${C.gold};padding-bottom:12px;">&#9670;</div>
        <div style="font-family:${DISPLAY};font-size:15px;letter-spacing:0.36em;text-transform:uppercase;color:${C.ivory};">La&nbsp;Vivenzia</div>
      </td></tr>

      <!-- eyebrow + headline -->
      <tr><td align="center" style="padding:34px 32px 0;">
        <div style="font-family:${SANS};font-size:9px;font-weight:500;letter-spacing:0.34em;text-transform:uppercase;color:${C.gold};padding-bottom:14px;">New ${escapeHtml(notification.kind)}</div>
        <div style="font-family:${DISPLAY};font-size:25px;line-height:1.32;color:${C.ivory};">${escapeHtml(notification.headline)}</div>
      </td></tr>

      <!-- divider -->
      <tr><td align="center" style="padding:24px 32px 6px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td width="54" height="1" bgcolor="${C.border}" style="width:54px;height:1px;line-height:1px;font-size:0;">&nbsp;</td>
          <td style="padding:0 10px;color:${C.gold};font-size:9px;line-height:9px;">&#9670;</td>
          <td width="54" height="1" bgcolor="${C.border}" style="width:54px;height:1px;line-height:1px;font-size:0;">&nbsp;</td>
        </tr></table>
      </td></tr>

      <!-- fields -->
      <tr><td style="padding:6px 32px 10px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
      </td></tr>

      <!-- reply -->
      <tr><td style="padding:22px 32px 30px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${replyButton}</table>
      </td></tr>

      <!-- footer -->
      <tr><td align="center" bgcolor="${C.panel}" style="background-color:${C.panel};padding:20px 32px 24px;border-top:1px solid ${C.hairline};">
        <div style="font-family:${SANS};font-size:11px;line-height:1.7;color:${C.faint};font-weight:300;">
          Received ${escapeHtml(receivedAt())} IST<br />
          Saved to the <a href="${siteUrl}/admin" style="color:${C.gold};text-decoration:none;border-bottom:1px solid ${C.border};">admin dashboard</a>
        </div>
      </td></tr>

    </table>

    <div style="font-family:${SANS};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#6B6355;padding-top:22px;">Curated Stays &amp; Experiences</div>

  </td></tr>
</table>
</body>
</html>`;
}

/**
 * Deliver a submission notification. Never throws: a mail outage must not lose
 * the lead, which is already persisted before this runs.
 */
export async function sendSubmissionNotification(
  notification: SubmissionNotification
): Promise<EmailResult> {
  const config = smtpConfig();
  if (!config) {
    return {
      sent: false,
      reason: 'SMTP is not configured (set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS).',
    };
  }

  try {
    const info = await transporter(config).sendMail({
      from: sender(),
      to: recipient(),
      ...(notification.replyTo
        ? {
            replyTo: notification.replyToName
              ? `"${notification.replyToName}" <${notification.replyTo}>`
              : notification.replyTo,
          }
        : {}),
      subject: notification.subject,
      text: renderText(notification),
      html: renderHtml(notification),
    });

    return { sent: true, messageId: info.messageId };
  } catch (error) {
    return { sent: false, reason: getErrorMessage(error) };
  }
}

/** Used by the admin SMTP health check to surface config problems early. */
export async function verifySmtp(): Promise<
  { ok: true; host: string; port: number } | { ok: false; reason: string }
> {
  const config = smtpConfig();
  if (!config) {
    return { ok: false, reason: 'SMTP is not configured (SMTP_HOST is unset).' };
  }
  try {
    await transporter(config).verify();
    return { ok: true, host: config.host, port: config.port };
  } catch (error) {
    return { ok: false, reason: getErrorMessage(error) };
  }
}

/** Exported for the template preview script; not used by the app itself. */
export const __renderPreview = renderHtml;
