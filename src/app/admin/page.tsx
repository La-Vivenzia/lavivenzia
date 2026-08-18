'use client';

import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Users, Building2, Search, Download, RefreshCw, ChevronDown, ChevronUp, X } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────
interface HostRegistration {
  id: string;
  created_at: string;
  business_name: string;
  host_name: string;
  business_category: string;
  city_location: string;
  website_url: string;
  instagram_handle: string;
  phone_number: string;
  email_address: string;
  years_in_business: string;
  price_range: string;
  short_description: string;
  reason_for_joining: string;
  contact_method: string;
  status?: string;
}

interface WaitlistEntry {
  id: string;
  created_at: string;
  email: string;
  name?: string;
  phone?: string;
  preferences?: string;
  source?: string;
}

type Tab = 'hosts' | 'waitlist';
type HostId = string;
type SortField = string;
type SortDir = 'asc' | 'desc';

// ── Helpers ────────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function exportCsv(data: Record<string, unknown>[], filename: string) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const rows = data.map(row =>
    headers.map(h => {
      const val = row[h] ?? '';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    }).join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

const STATUS_COLORS: Record<string, string> = {
  Pending:  'bg-yellow-900/30 text-yellow-400 border-yellow-600/30',
  Approved: 'bg-green-900/30  text-green-400  border-green-600/30',
  Rejected: 'bg-red-900/30    text-red-400    border-red-600/30',
};

// ── Main Component ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('hosts');

  const [hosts, setHosts] = useState<HostRegistration[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loadingHosts, setLoadingHosts] = useState(true);
  const [loadingWaitlist, setLoadingWaitlist] = useState(true);

  const [hostSearch, setHostSearch] = useState('');
  const [waitlistSearch, setWaitlistSearch] = useState('');

  const [hostSort, setHostSort] = useState<{ field: SortField; dir: SortDir }>({ field: 'created_at', dir: 'desc' });
  const [waitlistSort, setWaitlistSort] = useState<{ field: SortField; dir: SortDir }>({ field: 'created_at', dir: 'desc' });

  const [expandedHost, setExpandedHost] = useState<HostId | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<HostId | null>(null);

  // ── Data Fetching ──
  const fetchHosts = useCallback(async () => {
    setLoadingHosts(true);
    const res = await fetch('/api/admin/hosts');
    const data = await res.json();
    setHosts(Array.isArray(data) ? data : []);
    setLoadingHosts(false);
  }, []);

  const fetchWaitlist = useCallback(async () => {
    setLoadingWaitlist(true);
    const res = await fetch('/api/admin/waitlist');
    const data = await res.json();
    setWaitlist(Array.isArray(data) ? data : []);
    setLoadingWaitlist(false);
  }, []);

  useEffect(() => { fetchHosts(); }, [fetchHosts]);
  useEffect(() => { fetchWaitlist(); }, [fetchWaitlist]);

  // ── Logout ──
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // ── Status Update ──
  const updateHostStatus = async (id: string, status: string) => {
    setUpdatingStatus(id);
    await fetch('/api/admin/hosts/status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setHosts(prev => prev.map(h => h.id === id ? { ...h, status } : h));
    setUpdatingStatus(null);
  };

  // ── Filter + Sort ──
  const filteredHosts = hosts
    .filter(h => {
      const q = hostSearch.toLowerCase();
      return !q || [h.business_name, h.host_name, h.email_address, h.city_location, h.business_category]
        .some(v => v?.toLowerCase().includes(q));
    })
    .sort((a, b) => {
      const f = hostSort.field as keyof HostRegistration;
      const av = a[f] ?? ''; const bv = b[f] ?? '';
      return hostSort.dir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });

  const filteredWaitlist = waitlist
    .filter(w => {
      const q = waitlistSearch.toLowerCase();
      return !q || [w.email, w.name, w.phone].some(v => v?.toLowerCase().includes(q));
    })
    .sort((a, b) => {
      const f = waitlistSort.field as keyof WaitlistEntry;
      const av = a[f] ?? ''; const bv = b[f] ?? '';
      return waitlistSort.dir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });

  const toggleHostSort = (field: string) => {
    setHostSort(prev => ({ field, dir: prev.field === field && prev.dir === 'asc' ? 'desc' : 'asc' }));
  };
  const toggleWaitlistSort = (field: string) => {
    setWaitlistSort(prev => ({ field, dir: prev.field === field && prev.dir === 'asc' ? 'desc' : 'asc' }));
  };

  const SortIcon = ({ field, current }: { field: string; current: { field: string; dir: SortDir } }) => {
    if (current.field !== field) return <ChevronDown className="w-3 h-3 opacity-30" />;
    return current.dir === 'asc' ? <ChevronUp className="w-3.5 h-3.5 text-[#C6943B]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#C6943B]" />;
  };

  // ── Stat Cards ──
  const hostsByStatus = {
    Pending:  hosts.filter(h => !h.status || h.status === 'Pending').length,
    Approved: hosts.filter(h => h.status === 'Approved').length,
    Rejected: hosts.filter(h => h.status === 'Rejected').length,
  };

  // ── UI ──────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#080806]" style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* Top Bar */}
      <header className="bg-[#0f0e0b] border-b border-[rgba(198,148,59,0.15)] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D4A843, #9A7030)' }}>
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M5 0L10 5L5 10L0 5L5 0Z" fill="#080806"/></svg>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-[#fcfbf9] tracking-wide">La Vivenzia Admin</h1>
            <p className="text-[10px] text-[#6b6355] tracking-widest uppercase">Dashboard</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-[#6b6355] hover:text-[#C6943B] transition-colors text-xs font-medium"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Hosts', value: hosts.length, icon: <Building2 className="w-5 h-5" />, color: '#C6943B' },
            { label: 'Pending', value: hostsByStatus.Pending, icon: <RefreshCw className="w-5 h-5" />, color: '#C6943B' },
            { label: 'Approved', value: hostsByStatus.Approved, icon: <ChevronUp className="w-5 h-5" />, color: '#C6943B' },
            { label: 'Waitlist', value: waitlist.length, icon: <Users className="w-5 h-5" />, color: '#C6943B' },
          ].map((card) => (
            <div key={card.label} className="bg-[#0f0e0b] border border-[rgba(198,148,59,0.12)] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span style={{ color: card.color }} className="opacity-80">{card.icon}</span>
              </div>
              <p className="text-2xl font-bold text-[#fcfbf9]">{card.value}</p>
              <p className="text-[11px] text-[#6b6355] uppercase tracking-widest mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 bg-[#0f0e0b] border border-[rgba(198,148,59,0.12)] rounded-xl p-1 w-fit">
          {([
            { key: 'hosts',    label: 'Host Applications', count: hosts.length },
            { key: 'waitlist', label: 'VIP Waitlist',       count: waitlist.length },
          ] as { key: Tab; label: string; count: number }[]).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === tab.key
                  ? 'text-[#080806]'
                  : 'text-[#6b6355] hover:text-[#fcfbf9]'
              }`}
              style={activeTab === tab.key
                ? { background: 'linear-gradient(135deg, #D4A843, #C6943B)' }
                : {}}
            >
              {tab.label}
              <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab.key ? 'bg-black/20' : 'bg-[#1a1a18]'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── HOST APPLICATIONS TAB ── */}
        {activeTab === 'hosts' && (
          <div className="bg-[#0f0e0b] border border-[rgba(198,148,59,0.12)] rounded-xl overflow-hidden">
            {/* Table Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4 border-b border-[rgba(198,148,59,0.1)]">
              <div className="relative flex-1 w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b6355]" />
                <input
                  type="text"
                  placeholder="Search by name, email, city..."
                  value={hostSearch}
                  onChange={e => setHostSearch(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 bg-[#080806] border border-[rgba(198,148,59,0.15)] rounded-lg text-[#fcfbf9] placeholder:text-[#6b6355] text-xs focus:outline-none focus:border-[#C6943B] transition-colors"
                />
                {hostSearch && (
                  <button onClick={() => setHostSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b6355] hover:text-[#fcfbf9]">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <button onClick={fetchHosts} className="flex items-center gap-1.5 text-[#6b6355] hover:text-[#C6943B] transition-colors text-xs px-3 py-2 rounded-lg border border-[rgba(198,148,59,0.15)] hover:border-[rgba(198,148,59,0.3)]">
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh
                </button>
                <button
                  onClick={() => exportCsv(filteredHosts as unknown as Record<string, unknown>[], 'host-applications.csv')}
                  className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-[rgba(198,148,59,0.3)] text-[#C6943B] hover:bg-[rgba(198,148,59,0.08)] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Export CSV
                </button>
              </div>
            </div>

            {loadingHosts ? (
              <div className="flex items-center justify-center py-20 text-[#6b6355] text-sm">Loading applications…</div>
            ) : filteredHosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#6b6355]">
                <Building2 className="w-10 h-10 mb-3 opacity-30" />
                <p className="text-sm">{hostSearch ? 'No results found.' : 'No applications yet.'}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[rgba(198,148,59,0.08)]">
                      {[
                        { label: 'Date',     field: 'created_at' },
                        { label: 'Business', field: 'business_name' },
                        { label: 'Host',     field: 'host_name' },
                        { label: 'Category', field: 'business_category' },
                        { label: 'City',     field: 'city_location' },
                        { label: 'Email',    field: 'email_address' },
                        { label: 'Phone',    field: 'phone_number' },
                        { label: 'Status',   field: 'status' },
                        { label: '',         field: '' },
                      ].map(col => (
                        <th
                          key={col.field}
                          onClick={() => col.field && toggleHostSort(col.field)}
                          className={`text-left px-4 py-3 text-[10px] uppercase tracking-widest text-[#6b6355] font-semibold whitespace-nowrap select-none ${col.field ? 'cursor-pointer hover:text-[#C6943B]' : ''}`}
                        >
                          <span className="flex items-center gap-1">
                            {col.label}
                            {col.field && <SortIcon field={col.field} current={hostSort} />}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHosts.map((host) => (
                      <React.Fragment key={host.id}>
                        <tr
                          onClick={() => setExpandedHost(expandedHost === host.id ? null : host.id)}
                          className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(198,148,59,0.04)] cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-3 text-[#6b6355] whitespace-nowrap">{formatDate(host.created_at)}</td>
                          <td className="px-4 py-3 text-[#fcfbf9] font-medium whitespace-nowrap">{host.business_name || '—'}</td>
                          <td className="px-4 py-3 text-[#d4c9b0] whitespace-nowrap">{host.host_name || '—'}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded bg-[rgba(198,148,59,0.1)] text-[#C6943B] border border-[rgba(198,148,59,0.2)] text-[10px] uppercase tracking-wider whitespace-nowrap">
                              {host.business_category || '—'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[#d4c9b0] whitespace-nowrap">{host.city_location || '—'}</td>
                          <td className="px-4 py-3 text-[#d4c9b0]">{host.email_address || '—'}</td>
                          <td className="px-4 py-3 text-[#d4c9b0] whitespace-nowrap">{host.phone_number || '—'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded border text-[10px] uppercase tracking-wider whitespace-nowrap ${STATUS_COLORS[host.status || 'Pending']}`}>
                              {host.status || 'Pending'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <ChevronDown className={`w-4 h-4 text-[#6b6355] transition-transform ${expandedHost === host.id ? 'rotate-180' : ''}`} />
                          </td>
                        </tr>

                        {/* Expanded detail row */}
                        {expandedHost === host.id && (
                          <tr key={`${host.id}-detail`} className="border-b border-[rgba(198,148,59,0.1)]">
                            <td colSpan={9} className="px-6 py-5 bg-[#080806]">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                                {[
                                  { label: 'Price Range', value: host.price_range },
                                  { label: 'Years in Business', value: host.years_in_business },
                                  { label: 'Preferred Contact', value: host.contact_method },
                                  { label: 'Website', value: host.website_url, link: true },
                                  { label: 'Instagram', value: host.instagram_handle },
                                ].map(item => item.value ? (
                                  <div key={item.label}>
                                    <p className="text-[10px] uppercase tracking-widest text-[#6b6355] mb-1">{item.label}</p>
                                    {item.link
                                      ? <a href={item.value} target="_blank" rel="noopener noreferrer" className="text-[#C6943B] hover:underline text-xs">{item.value}</a>
                                      : <p className="text-[#d4c9b0] text-xs">{item.value}</p>
                                    }
                                  </div>
                                ) : null)}
                              </div>
                              {host.short_description && (
                                <div className="mb-4">
                                  <p className="text-[10px] uppercase tracking-widest text-[#6b6355] mb-1">Description</p>
                                  <p className="text-[#d4c9b0] text-xs leading-relaxed">{host.short_description}</p>
                                </div>
                              )}
                              {host.reason_for_joining && (
                                <div className="mb-5">
                                  <p className="text-[10px] uppercase tracking-widest text-[#6b6355] mb-1">Why Join La Vivenzia</p>
                                  <p className="text-[#d4c9b0] text-xs leading-relaxed">{host.reason_for_joining}</p>
                                </div>
                              )}
                              {/* Status actions */}
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] uppercase tracking-widest text-[#6b6355] mr-2">Update Status:</span>
                                {['Pending', 'Approved', 'Rejected'].map(s => (
                                  <button
                                    key={s}
                                    disabled={updatingStatus === host.id || host.status === s}
                                    onClick={(e) => { e.stopPropagation(); updateHostStatus(host.id, s); }}
                                    className={`px-3 py-1 rounded text-[10px] font-semibold uppercase tracking-wider border transition-all disabled:opacity-40 ${STATUS_COLORS[s]}`}
                                  >
                                    {updatingStatus === host.id ? '...' : s}
                                  </button>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="px-5 py-3 border-t border-[rgba(198,148,59,0.08)] text-[11px] text-[#6b6355]">
              Showing {filteredHosts.length} of {hosts.length} applications
            </div>
          </div>
        )}

        {/* ── WAITLIST TAB ── */}
        {activeTab === 'waitlist' && (
          <div className="bg-[#0f0e0b] border border-[rgba(198,148,59,0.12)] rounded-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4 border-b border-[rgba(198,148,59,0.1)]">
              <div className="relative flex-1 w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b6355]" />
                <input
                  type="text"
                  placeholder="Search by email or name..."
                  value={waitlistSearch}
                  onChange={e => setWaitlistSearch(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 bg-[#080806] border border-[rgba(198,148,59,0.15)] rounded-lg text-[#fcfbf9] placeholder:text-[#6b6355] text-xs focus:outline-none focus:border-[#C6943B] transition-colors"
                />
                {waitlistSearch && (
                  <button onClick={() => setWaitlistSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b6355] hover:text-[#fcfbf9]">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <button onClick={fetchWaitlist} className="flex items-center gap-1.5 text-[#6b6355] hover:text-[#C6943B] transition-colors text-xs px-3 py-2 rounded-lg border border-[rgba(198,148,59,0.15)] hover:border-[rgba(198,148,59,0.3)]">
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh
                </button>
                <button
                  onClick={() => exportCsv(filteredWaitlist as unknown as Record<string, unknown>[], 'waitlist.csv')}
                  className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-[rgba(198,148,59,0.3)] text-[#C6943B] hover:bg-[rgba(198,148,59,0.08)] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Export CSV
                </button>
              </div>
            </div>

            {loadingWaitlist ? (
              <div className="flex items-center justify-center py-20 text-[#6b6355] text-sm">Loading waitlist…</div>
            ) : filteredWaitlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#6b6355]">
                <Users className="w-10 h-10 mb-3 opacity-30" />
                <p className="text-sm">{waitlistSearch ? 'No results found.' : 'No waitlist signups yet.'}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[rgba(198,148,59,0.08)]">
                      {[
                        { label: 'Date',  field: 'created_at' },
                        { label: 'Email', field: 'email' },
                        { label: 'Name',  field: 'name' },
                        { label: 'Phone', field: 'phone' },
                        { label: 'Preferences', field: 'preferences' },
                        { label: 'Source',       field: 'source' },
                      ].map(col => (
                        <th
                          key={col.field}
                          onClick={() => toggleWaitlistSort(col.field)}
                          className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-[#6b6355] font-semibold cursor-pointer hover:text-[#C6943B] whitespace-nowrap select-none"
                        >
                          <span className="flex items-center gap-1">
                            {col.label}
                            <SortIcon field={col.field} current={waitlistSort} />
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWaitlist.map(entry => (
                      <tr key={entry.id} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(198,148,59,0.04)] transition-colors">
                        <td className="px-4 py-3 text-[#6b6355] whitespace-nowrap">{formatDate(entry.created_at)}</td>
                        <td className="px-4 py-3 text-[#fcfbf9] font-medium">{entry.email || '—'}</td>
                        <td className="px-4 py-3 text-[#d4c9b0]">{entry.name || '—'}</td>
                        <td className="px-4 py-3 text-[#d4c9b0]">{entry.phone || '—'}</td>
                        <td className="px-4 py-3 text-[#d4c9b0]">{entry.preferences || '—'}</td>
                        <td className="px-4 py-3 text-[#d4c9b0]">{entry.source || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="px-5 py-3 border-t border-[rgba(198,148,59,0.08)] text-[11px] text-[#6b6355]">
              Showing {filteredWaitlist.length} of {waitlist.length} signups
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
