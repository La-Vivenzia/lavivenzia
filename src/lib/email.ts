import nodemailer, { type Transporter } from 'nodemailer';
import { getErrorMessage } from '@/lib/errors';

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

export interface SubmissionNotification {
  /** Short label for the kind of submission, e.g. "Contact Form". */
  kind: string;
  /** Subject line for the notification. */
  subject: string;
  /** Ordered label/value pairs rendered into the email body. */
  fields: Array<{ label: string; value: unknown }>;
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

/** Values arrive from JSON, so anything can show up — flatten it readably. */
function displayValue(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return JSON.stringify(value, null, 2);
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
  return new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
}

function renderText(notification: SubmissionNotification): string {
  const lines = notification.fields.map((f) => `${f.label}: ${displayValue(f.value)}`);
  return [
    `New ${notification.kind} submission — La Vivenzia`,
    '',
    ...lines,
    '',
    `Received: ${receivedAt()} IST`,
  ].join('\n');
}

function renderHtml(notification: SubmissionNotification): string {
  const rows = notification.fields
    .map((f) => {
      const value = escapeHtml(displayValue(f.value)).replace(/\n/g, '<br />');
      return `<tr>
        <td style="padding:10px 14px;border-bottom:1px solid #eceae5;color:#6b6355;font-size:12px;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;vertical-align:top;">${escapeHtml(f.label)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #eceae5;color:#1a1a18;font-size:14px;">${value}</td>
      </tr>`;
    })
    .join('');

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f6f4ef;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;">
  <table role="presentation" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e6e2d9;border-radius:10px;border-collapse:collapse;width:100%;">
    <tr>
      <td style="padding:20px 24px;background:#0f0e0b;border-radius:10px 10px 0 0;">
        <div style="color:#C6943B;font-size:11px;letter-spacing:.25em;text-transform:uppercase;">La Vivenzia</div>
        <div style="color:#fcfbf9;font-size:18px;margin-top:6px;">New ${escapeHtml(notification.kind)} Submission</div>
      </td>
    </tr>
    <tr><td style="padding:8px 10px;">
      <table role="presentation" style="width:100%;border-collapse:collapse;">${rows}</table>
    </td></tr>
    <tr>
      <td style="padding:14px 24px;color:#8a8272;font-size:12px;border-top:1px solid #eceae5;">
        Received ${escapeHtml(receivedAt())} IST · Also saved to the admin dashboard.
      </td>
    </tr>
  </table>
</body></html>`;
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
