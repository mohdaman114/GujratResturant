import React, { useState } from 'react';
import { BRANCHES, PLATFORMS } from '../data/mockData';

interface TopBarProps {
  pageTitle: string;
  selectedBranch: string;
  selectedPlatform: string;
  dateRange: string;
  onBranchChange: (b: string) => void;
  onPlatformChange: (p: string) => void;
  onDateRangeChange: (d: string) => void;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onNavigate: (page: string) => void;
}

const DATE_RANGES = [
  'Today',
  'Yesterday',
  'Last 7 days',
  'This month (MTD)',
  'Last 30 days',
  'Last month',
  'Custom range',
];

const BellIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 15 15"><path d="M7.5 1.5a5 5 0 0 1 5 5v3l1 1.5H1.5L2.5 9.5v-3a5 5 0 0 1 5-5Z" stroke="currentColor" strokeWidth="1.3"/><path d="M5.5 11.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.3"/></svg>
);
const ChevronIcon = () => (
  <svg width="10" height="10" fill="none" viewBox="0 0 10 10"><polyline points="2,3.5 5,6.5 8,3.5" stroke="currentColor" strokeWidth="1.3"/></svg>
);
const MenuIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.4"/><line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.4"/><line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.4"/></svg>
);

export default function TopBar({ pageTitle, selectedBranch, selectedPlatform, dateRange, onBranchChange, onPlatformChange, onDateRangeChange, sidebarCollapsed, onToggleSidebar, onNavigate }: TopBarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const branchLabel = BRANCHES.find(b => b.id === selectedBranch)?.name || 'All Branches';
  const platformLabel = PLATFORMS.find(p => p.id === selectedPlatform)?.name || 'All Platforms';

  return (
    <header style={{
      height: 52,
      background: '#FFFFFF',
      borderBottom: '1px solid #E2DDD6',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '0 16px',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      flexShrink: 0,
    }}>
      {/* Sidebar toggle */}
      <button onClick={onToggleSidebar} style={{ color: '#6B6B65', background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 4, display: 'flex', alignItems: 'center' }}>
        <MenuIcon />
      </button>

      {/* Page title */}
      <h1 style={{ fontSize: 14.5, fontWeight: 600, color: '#1A1A18', margin: 0, whiteSpace: 'nowrap', marginRight: 4 }}>
        {pageTitle}
      </h1>

      <div style={{ flex: 1 }} />

      {/* Filters row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Branch selector */}
        <select
          value={selectedBranch}
          onChange={e => onBranchChange(e.target.value)}
          style={{
            fontSize: 12.5, fontFamily: 'var(--font-family-sans)', fontWeight: 500,
            color: '#1B3D2F', background: '#F0EEE9', border: '1px solid #D8D3CC',
            borderRadius: 4, padding: '5px 8px', cursor: 'pointer', outline: 'none',
          }}
        >
          {BRANCHES.map(b => (
            <option key={b.id} value={b.id}>{b.name}{b.pending ? ' ⚠' : ''}</option>
          ))}
        </select>

        {/* Platform selector */}
        <select
          value={selectedPlatform}
          onChange={e => onPlatformChange(e.target.value)}
          style={{
            fontSize: 12.5, fontFamily: 'var(--font-family-sans)', fontWeight: 500,
            color: '#1B3D2F', background: '#F0EEE9', border: '1px solid #D8D3CC',
            borderRadius: 4, padding: '5px 8px', cursor: 'pointer', outline: 'none',
          }}
        >
          {PLATFORMS.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        {/* Date range */}
        <select
          value={dateRange}
          onChange={e => onDateRangeChange(e.target.value)}
          style={{
            fontSize: 12.5, fontFamily: 'var(--font-family-sans)', fontWeight: 500,
            color: '#1A1A18', background: '#F0EEE9', border: '1px solid #D8D3CC',
            borderRadius: 4, padding: '5px 8px', cursor: 'pointer', outline: 'none',
          }}
        >
          {DATE_RANGES.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Notifications */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
          style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 8px', color: '#6B6B65', borderRadius: 4, display: 'flex', alignItems: 'center' }}
        >
          <BellIcon />
          <span style={{ position: 'absolute', top: 3, right: 4, width: 7, height: 7, background: '#DC2626', borderRadius: '50%', border: '1px solid white' }} />
        </button>
        {notifOpen && (
          <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 4, width: 320, background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: 6, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 100 }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid #E2DDD6', fontWeight: 600, fontSize: 12.5, color: '#1A1A18' }}>Alerts <span style={{ color: '#DC2626', fontFamily: 'var(--font-family-mono)' }}>3 critical</span></div>
            {[
              { text: 'Royal Gujrat · Keeta offline since 07:10', level: 'critical', time: '2h 35m ago' },
              { text: 'Naan House ME-11 · Careem offline 08:30', level: 'critical', time: '1h 15m ago' },
              { text: 'Delight Gujrat · Cancellation rate 18% (Deliveroo)', level: 'warning', time: '55m ago' },
              { text: 'Royal Gujrat · Noon menu sync failure', level: 'warning', time: '30m ago' },
            ].map((n, i) => (
              <div key={i} onClick={() => { setNotifOpen(false); onNavigate('operations'); }} style={{ padding: '9px 14px', borderBottom: '1px solid #F0EEE9', cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'flex-start' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = '#F8F7F4'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: n.level === 'critical' ? '#DC2626' : '#D97706', marginTop: 4, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: '#1A1A18', lineHeight: 1.4 }}>{n.text}</div>
                  <div style={{ fontSize: 10.5, color: '#9B9691', marginTop: 1, fontFamily: 'var(--font-family-mono)' }}>{n.time}</div>
                </div>
              </div>
            ))}
            <div style={{ padding: '8px 14px' }}>
              <button onClick={() => { setNotifOpen(false); onNavigate('actions'); }} style={{ fontSize: 12, color: '#1B3D2F', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>View all tasks →</button>
            </div>
          </div>
        )}
      </div>

      {/* Profile */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
          style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: 4 }}
        >
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1B3D2F', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B8952A', fontSize: 11, fontWeight: 700 }}>YM</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1A1A18', lineHeight: 1.2 }}>Yusuf M.</div>
            <div style={{ fontSize: 10, color: '#9B9691', lineHeight: 1.2 }}>Group Manager</div>
          </div>
          <ChevronIcon />
        </button>
        {profileOpen && (
          <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 4, width: 180, background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: 6, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 100 }}>
            {['Profile', 'Preferences', 'Sign out'].map((item) => (
              <button key={item} style={{ display: 'block', width: '100%', padding: '9px 14px', fontSize: 13, color: item === 'Sign out' ? '#DC2626' : '#1A1A18', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#F8F7F4'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}
              >{item}</button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
