import React from 'react';

// Status badge
type StatusColor = 'green' | 'red' | 'amber' | 'blue' | 'purple' | 'grey' | 'slate';
export function StatusBadge({ label, color, size = 'sm' }: { label: string; color: StatusColor; size?: 'xs' | 'sm' }) {
  const colors: Record<StatusColor, { bg: string; text: string; dot: string }> = {
    green: { bg: '#DCFCE7', text: '#15803D', dot: '#16A34A' },
    red: { bg: '#FEE2E2', text: '#B91C1C', dot: '#DC2626' },
    amber: { bg: '#FEF3C7', text: '#B45309', dot: '#D97706' },
    blue: { bg: '#DBEAFE', text: '#1D4ED8', dot: '#2563EB' },
    purple: { bg: '#F3E8FF', text: '#7E22CE', dot: '#9333EA' },
    grey: { bg: '#F3F4F6', text: '#374151', dot: '#6B7280' },
    slate: { bg: '#F1F5F9', text: '#475569', dot: '#94A3B8' },
  };
  const c = colors[color];
  const fontSize = size === 'xs' ? 10 : 11;
  const padding = size === 'xs' ? '2px 6px' : '2px 7px';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: c.bg, color: c.text, fontSize, fontWeight: 600, padding, borderRadius: 3, whiteSpace: 'nowrap', lineHeight: 1.6, fontFamily: 'var(--font-family-sans)' }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
      {label}
    </span>
  );
}

// Operational status badge
export function OpsBadge({ status }: { status: string }) {
  const map: Record<string, StatusColor> = {
    'Live': 'green',
    'Offline': 'red',
    'Issue': 'amber',
    'Unknown': 'grey',
    'Stale': 'purple',
    'Scheduled Closed': 'blue',
    'Not Configured': 'slate',
  };
  return <StatusBadge label={status} color={map[status] || 'grey'} size="xs" />;
}

// Change indicator
export function Change({ value, suffix = '%', inverse = false }: { value: number; suffix?: string; inverse?: boolean }) {
  const positive = inverse ? value < 0 : value > 0;
  const color = value === 0 ? '#9B9691' : positive ? '#16A34A' : '#DC2626';
  const prefix = value > 0 ? '+' : '';
  return (
    <span style={{ color, fontFamily: 'var(--font-family-mono)', fontSize: 11.5, fontWeight: 500 }}>
      {prefix}{value.toFixed(1)}{suffix}
    </span>
  );
}

// Section header
export function SectionHeader({ title, subtitle, action, actionLabel }: { title: string; subtitle?: string; action?: () => void; actionLabel?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A18', letterSpacing: '-0.01em' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: '#9B9691', marginTop: 1 }}>{subtitle}</div>}
      </div>
      {action && actionLabel && (
        <button onClick={action} style={{ fontSize: 12, color: '#1B3D2F', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          {actionLabel} →
        </button>
      )}
    </div>
  );
}

// Card wrapper
export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: 5, ...style }}>
      {children}
    </div>
  );
}

// KPI card
export function KPICard({ label, value, unit, period, comparison, compLabel, change, inverseGood, onClick }: {
  label: string; value: string | number; unit?: string; period?: string; comparison?: string | number;
  compLabel?: string; change?: number; inverseGood?: boolean; onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: 5, padding: '14px 16px',
        cursor: onClick ? 'pointer' : 'default', transition: 'box-shadow 0.12s ease',
      }}
      onMouseEnter={e => { if (onClick) (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
    >
      <div style={{ fontSize: 11, fontWeight: 600, color: '#9B9691', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: 22, fontWeight: 600, color: '#1A1A18', letterSpacing: '-0.02em' }}>{value}</span>
        {unit && <span style={{ fontSize: 12, color: '#9B9691', fontWeight: 500 }}>{unit}</span>}
      </div>
      {period && <div style={{ fontSize: 10.5, color: '#B8B2A8', marginBottom: 6, lineHeight: 1.3 }}>{period}</div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        {change !== undefined && <Change value={change} inverse={inverseGood} />}
        {compLabel && <span style={{ fontSize: 10.5, color: '#B8B2A8' }}>vs {compLabel}</span>}
      </div>
      {comparison !== undefined && (
        <div style={{ fontSize: 10.5, color: '#B8B2A8', marginTop: 3 }}>Prior: <span style={{ fontFamily: 'var(--font-family-mono)' }}>{comparison}</span></div>
      )}
    </div>
  );
}

// Alert row
export function AlertRow({ level, text, branch, time, action, onAction }: { level: 'critical' | 'warning' | 'info'; text: string; branch?: string; time?: string; action?: string; onAction?: () => void }) {
  const colors = { critical: '#DC2626', warning: '#D97706', info: '#2563EB' };
  const bgColors = { critical: '#FEF2F2', warning: '#FFFBEB', info: '#EFF6FF' };
  return (
    <div style={{ background: bgColors[level], border: `1px solid ${colors[level]}22`, borderLeft: `3px solid ${colors[level]}`, borderRadius: 4, padding: '8px 12px', display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors[level], marginTop: 5, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12.5, color: '#1A1A18', lineHeight: 1.4 }}>{text}</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 3, flexWrap: 'wrap' }}>
          {branch && <span style={{ fontSize: 10.5, color: '#9B9691' }}>{branch}</span>}
          {time && <span style={{ fontSize: 10.5, color: '#B8B2A8', fontFamily: 'var(--font-family-mono)' }}>{time}</span>}
        </div>
      </div>
      {action && onAction && (
        <button onClick={onAction} style={{ fontSize: 11.5, color: colors[level], fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', padding: 0 }}>{action}</button>
      )}
    </div>
  );
}

// Tab bar
export function TabBar({ tabs, active, onChange }: { tabs: { id: string; label: string }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #E2DDD6', gap: 0, marginBottom: 16 }}>
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            padding: '8px 14px', fontSize: 12.5, fontWeight: active === t.id ? 600 : 400, fontFamily: 'var(--font-family-sans)',
            color: active === t.id ? '#1B3D2F' : '#9B9691', background: 'none', border: 'none',
            borderBottom: active === t.id ? '2px solid #1B3D2F' : '2px solid transparent',
            cursor: 'pointer', marginBottom: -1, transition: 'all 0.12s ease', whiteSpace: 'nowrap',
          }}
        >{t.label}</button>
      ))}
    </div>
  );
}

// Priority badge
export function PriorityBadge({ level }: { level: string }) {
  const map: Record<string, { bg: string; text: string }> = {
    Critical: { bg: '#FEE2E2', text: '#B91C1C' },
    High: { bg: '#FEF3C7', text: '#B45309' },
    Medium: { bg: '#DBEAFE', text: '#1D4ED8' },
    Low: { bg: '#F3F4F6', text: '#374151' },
  };
  const c = map[level] || map.Low;
  return <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 3, background: c.bg, color: c.text, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{level}</span>;
}

// Drawer
export function Drawer({ open, onClose, title, children, width = 440 }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; width?: number }) {
  if (!open) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 200, backdropFilter: 'blur(2px)' }} />
      <div style={{
        position: 'fixed', right: 0, top: 0, bottom: 0, width, background: '#FFFFFF',
        borderLeft: '1px solid #E2DDD6', zIndex: 201, display: 'flex', flexDirection: 'column',
        boxShadow: '-12px 0 40px rgba(0,0,0,0.1)',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2DDD6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A18' }}>{title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#9B9691', padding: '0 4px', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>{children}</div>
      </div>
    </>
  );
}

// Empty state
export function EmptyState({ icon, title, message }: { icon?: string; title: string; message?: string }) {
  return (
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      {icon && <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>}
      <div style={{ fontSize: 14, fontWeight: 600, color: '#6B6B65', marginBottom: 4 }}>{title}</div>
      {message && <div style={{ fontSize: 12, color: '#9B9691', maxWidth: 300, margin: '0 auto', lineHeight: 1.5 }}>{message}</div>}
    </div>
  );
}

// Field label-value pair
export function Field({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 13, color: '#1A1A18', fontFamily: mono ? 'var(--font-family-mono)' : 'var(--font-family-sans)' }}>{value}</div>
    </div>
  );
}

// Button
export function Btn({ label, onClick, variant = 'primary', small, disabled }: { label: string; onClick?: () => void; variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; small?: boolean; disabled?: boolean }) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: '#1B3D2F', color: '#FFFFFF', border: '1px solid #1B3D2F' },
    secondary: { background: '#FFFFFF', color: '#1B3D2F', border: '1px solid #1B3D2F' },
    danger: { background: '#DC2626', color: '#FFFFFF', border: '1px solid #DC2626' },
    ghost: { background: 'transparent', color: '#6B6B65', border: '1px solid #E2DDD6' },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles[variant],
        padding: small ? '5px 10px' : '7px 14px',
        fontSize: small ? 12 : 13,
        fontWeight: 600,
        borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-family-sans)',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.12s ease',
        whiteSpace: 'nowrap',
      }}
    >{label}</button>
  );
}

// Progress bar
export function ProgressBar({ value, max, color = '#1B3D2F', height = 6 }: { value: number; max: number; color?: string; height?: number }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ height, background: '#E2DDD6', borderRadius: height / 2, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: height / 2, transition: 'width 0.3s ease' }} />
    </div>
  );
}
