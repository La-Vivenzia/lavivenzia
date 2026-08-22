import { createClient } from '@supabase/supabase-js';

/**
 * Service-role Supabase client. Server-only — this key bypasses Row Level
 * Security, so it must never be imported into a Client Component.
 *
 * Every public table has RLS enabled with no anon INSERT policy, which is why
 * browser-side inserts silently failed. All writes now go through here.
 */
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      'Supabase is not configured: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.'
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
