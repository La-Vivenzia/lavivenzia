import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabase = createClient(supabaseUrl, serviceKey);

  const results: Record<string, string> = {};

  // 1. Add status column to host_registrations
  const { error: e1 } = await supabase.rpc('exec_migration', {
    sql: `ALTER TABLE host_registrations ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Pending';`
  });

  // Fallback: try direct update approach to test if column exists
  // Try inserting a test to see column existence
  const { error: statusError } = await supabase
    .from('host_registrations')
    .update({ status: 'Pending' })
    .eq('id', '00000000-0000-0000-0000-000000000000'); // fake id, won't match

  if (statusError?.message?.includes('status')) {
    results.status_column = `MISSING - Error: ${statusError.message}`;
  } else {
    results.status_column = 'OK or column exists';
  }

  return NextResponse.json({ results, note: 'Check Supabase dashboard to run: ALTER TABLE host_registrations ADD COLUMN IF NOT EXISTS status TEXT DEFAULT \'Pending\';' });
}
