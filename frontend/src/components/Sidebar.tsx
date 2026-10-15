import React from 'react';

export type PageId =
  | 'overview'
  | 'operations'
  | 'analytics'
  | 'products'
  | 'campaigns'
  | 'reviews'
  | 'ai-assistant'
  | 'actions'
  | 'reports'
  | 'settings';

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
}

const IconOverview = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/></svg>
);
const IconOps = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="8" cy="8" r="2" fill="currentColor"/><line x1="8" y1="1.5" x2="8" y2="4" stroke="currentColor" strokeWidth="1.4"/><line x1="8" y1="12" x2="8" y2="14.5" stroke="currentColor" strokeWidth="1.4"/><line x1="1.5" y1="8" x2="4" y2="8" stroke="currentColor" strokeWidth="1.4"/><line x1="12" y1="8" x2="14.5" y2="8" stroke="currentColor" strokeWidth="1.4"/></svg>
);
const IconAnalytics = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><polyline points="1,12 5,7 8,9 12,4 15,5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><line x1="1" y1="14" x2="15" y2="14" stroke="currentColor" strokeWidth="1.2"/></svg>
);
const IconMenu = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><rect x="1" y="2.5" width="14" height="2" rx="1" fill="currentColor" opacity=".6"/><rect x="1" y="7" width="14" height="2" rx="1" fill="currentColor" opacity=".6"/><rect x="1" y="11.5" width="10" height="2" rx="1" fill="currentColor" opacity=".6"/></svg>
);
const IconCampaigns = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M2 8 L12 3 L12 13 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><line x1="12" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.4"/><path d="M4 9.5 L4 13 L6 13" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
);
const IconReviews = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M1.5 2.5h13a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H4.5L1 14.5V3a.5.5 0 0 1 .5-.5Z" stroke="currentColor" strokeWidth="1.4"/><line x1="4.5" y1="6" x2="11.5" y2="6" stroke="currentColor" strokeWidth="1.2"/><line x1="4.5" y1="8.5" x2="9" y2="8.5" stroke="currentColor" strokeWidth="1.2"/></svg>
);
const IconAI = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M11.54 4.46l-1.41 1.41M4.95 11.54l-1.41 1.41" stroke="currentColor" strokeWidth="1.2"/></svg>
);
const IconTasks = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><rect x="1.5" y="1.5" width="13" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><polyline points="4,8 7,11 12,5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
);
const IconReports = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M9 1.5H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6L9 1.5Z" stroke="currentColor" strokeWidth="1.4"/><polyline points="9,1.5 9,6 14,6" stroke="currentColor" strokeWidth="1.4"/><line x1="4.5" y1="9" x2="11.5" y2="9" stroke="currentColor" strokeWidth="1.2"/><line x1="4.5" y1="11.5" x2="9" y2="11.5" stroke="currentColor" strokeWidth="1.2"/></svg>
);
const IconSettings = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1.5a.75.75 0 0 1 .75.75v1.2a4.5 4.5 0 0 1 1.56.64l.85-.85a.75.75 0 0 1 1.06 1.06l-.85.85a4.5 4.5 0 0 1 .64 1.56h1.2a.75.75 0 0 1 0 1.5h-1.2a4.5 4.5 0 0 1-.64 1.56l.85.85a.75.75 0 0 1-1.06 1.06l-.85-.85a4.5 4.5 0 0 1-1.56.64v1.2a.75.75 0 0 1-1.5 0v-1.2a4.5 4.5 0 0 1-1.56-.64l-.85.85a.75.75 0 0 1-1.06-1.06l.85-.85A4.5 4.5 0 0 1 2.75 9.5H1.55a.75.75 0 0 1 0-1.5h1.2a4.5 4.5 0 0 1 .64-1.56l-.85-.85a.75.75 0 0 1 1.06-1.06l.85.85A4.5 4.5 0 0 1 6.01 4.5V3.3A.75.75 0 0 1 6.75 2.5h.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
);

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: <IconOverview /> },
  { id: 'operations', label: 'Operations Monitor', icon: <IconOps />, badge: 3 },
  { id: 'analytics', label: 'Sales Analytics', icon: <IconAnalytics /> },
  { id: 'products', label: 'Products & Menu', icon: <IconMenu />, badge: 7 },
  { id: 'campaigns', label: 'Campaigns & Growth', icon: <IconCampaigns /> },
  { id: 'reviews', label: 'Customer Reviews', icon: <IconReviews />, badge: 4 },
  { id: 'ai-assistant', label: 'AI Assistant', icon: <IconAI /> },
  { id: 'actions', label: 'Actions & Tasks', icon: <IconTasks />, badge: 8 },
  { id: 'reports', label: 'Reports & Data', icon: <IconReports /> },
  { id: 'settings', label: 'Settings', icon: <IconSettings /> },
];

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  collapsed: boolean;
}

export default function Sidebar({ currentPage, onNavigate, collapsed }: SidebarProps) {
  return (
    <aside
      style={{
        width: collapsed ? 52 : 228,
        minWidth: collapsed ? 52 : 228,
        background: '#1B3D2F',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        transition: 'width 0.2s ease, min-width 0.2s ease',
        overflow: 'hidden',
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div style={{ padding: collapsed ? '16px 14px' : '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', minHeight: 52 }}>
        {collapsed ? (
          <div style={{ width: 24, height: 24, background: '#B8952A', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#1B3D2F', fontSize: 11, fontWeight: 700, letterSpacing: '-0.02em' }}>GG</span>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, background: '#B8952A', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#1B3D2F', fontSize: 10, fontWeight: 700 }}>GG</span>
              </div>
              <div>
                <div style={{ color: '#FFFFFF', fontSize: 12.5, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' }}>Gujrat Group</div>
                <div style={{ color: '#B8952A', fontSize: 9.5, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Sales Command</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {NAV_ITEMS.map(item => {
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: collapsed ? '9px 18px' : '9px 16px',
                background: active ? 'rgba(184,149,42,0.15)' : 'transparent',
                borderLeft: active ? '3px solid #B8952A' : '3px solid transparent',
                color: active ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                cursor: 'pointer',
                border: 'none',
                textAlign: 'left',
                transition: 'all 0.12s ease',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                position: 'relative',
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.85)'; (e.currentTarget as HTMLButtonElement).style.background = active ? 'rgba(184,149,42,0.15)' : 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'; (e.currentTarget as HTMLButtonElement).style.background = active ? 'rgba(184,149,42,0.15)' : 'transparent'; }}
            >
              <span style={{ flexShrink: 0, opacity: active ? 1 : 0.8 }}>{item.icon}</span>
              {!collapsed && <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>}
              {!collapsed && item.badge !== undefined && (
                <span style={{ background: active ? '#B8952A' : 'rgba(255,255,255,0.15)', color: '#FFFFFF', fontSize: 10, fontWeight: 700, padding: '1px 5px', borderRadius: 9, minWidth: 18, textAlign: 'center', fontFamily: 'var(--font-family-mono)' }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: collapsed ? '12px 14px' : '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {!collapsed && (
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 }}>
            <div>UAE / Asia-Dubai</div>
            <div>Powered by Grubtech · Syrve</div>
          </div>
        )}
      </div>
    </aside>
  );
}
