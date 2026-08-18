'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      setError('Incorrect password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080806] flex items-center justify-center px-4">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(198,148,59,0.06)_0%,_transparent_60%)]" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4 opacity-60">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C6943B]" />
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <path d="M5 0L10 5L5 10L0 5L5 0Z" fill="#C6943B" />
            </svg>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C6943B]" />
          </div>
          <h1 className="font-serif text-2xl text-[#fcfbf9] tracking-wide mb-1">La Vivenzia</h1>
          <p className="text-[#C6943B] text-[10px] font-sans tracking-[0.25em] uppercase">Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0f0e0b] border border-[rgba(198,148,59,0.2)] rounded-xl p-8 shadow-2xl">
          <h2 className="font-serif text-xl text-[#fcfbf9] mb-6 text-center">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#C6943B] text-[10px] font-semibold tracking-[0.15em] uppercase mb-1.5 font-sans">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full bg-[#080806] border border-[rgba(198,148,59,0.2)] rounded-lg px-4 py-3 text-[#fcfbf9] placeholder:text-[#5a5346] focus:outline-none focus:border-[#C6943B] transition-colors font-sans text-sm"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs font-sans text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-xs font-bold tracking-[0.15em] uppercase font-sans transition-all disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #D4A843 0%, #C6943B 50%, #9A7030 100%)',
                color: '#080806',
              }}
            >
              {loading ? 'Signing in...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
