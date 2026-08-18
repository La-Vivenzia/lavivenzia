// Run this script once to sync the database schema
// Usage: node scripts/migrate.mjs

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cdeywwttvoogmefrwuus.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkZXl3d3R0dm9vZ21lZnJ3dXVzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjAzMjE4NiwiZXhwIjoyMTAxNjA4MTg2fQ.w1zXZPsYM7lY2P1u5dbt4sazO2Gyl3sCa3hpbE65dWE';

const supabase = createClient(supabaseUrl, serviceKey);

async function migrate() {
  console.log('🔄 Running database sync...\n');

  // Test if status column exists by doing a select
  const { data, error } = await supabase
    .from('host_registrations')
    .select('status')
    .limit(1);

  if (error && error.message.includes('status')) {
    console.log('❌ status column missing from host_registrations');
    console.log('\n📋 Please run this SQL in your Supabase Dashboard → SQL Editor:\n');
    console.log('ALTER TABLE host_registrations ADD COLUMN IF NOT EXISTS status TEXT DEFAULT \'Pending\';\n');
  } else {
    console.log('✅ host_registrations.status column: EXISTS');
  }

  // Check waitlist columns
  const { data: wl, error: wlErr } = await supabase
    .from('waitlist')
    .select('*')
    .limit(1);

  if (wlErr) {
    console.log('❌ Error reading waitlist:', wlErr.message);
  } else {
    const cols = wl && wl.length > 0 ? Object.keys(wl[0]) : [];
    console.log('✅ waitlist columns:', cols.join(', '));
  }

  // Check host_registrations columns
  const { data: hr } = await supabase
    .from('host_registrations')
    .select('*')
    .limit(1);

  const hrCols = hr && hr.length > 0 ? Object.keys(hr[0]) : [];
  console.log('✅ host_registrations columns:', hrCols.join(', '));

  console.log('\n🏁 Done. Check output above for any missing columns.');
}

migrate().catch(console.error);
