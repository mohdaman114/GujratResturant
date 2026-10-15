import React, { useState } from 'react';
import { BRANCHES, PLATFORMS, OPERATIONAL_MATRIX, BranchPlatformStatus } from '../data/mockData';
import { OpsBadge, SectionHeader, Drawer, Field, Btn, AlertRow } from '../components/ui';

function getStatus(branchId: string, platformId: string): BranchPlatformStatus | undefined {
  return OPERATIONAL_MATRIX.find(m => m.branchId === branchId && m.platformId === platformId);
}

const STATUS_COLORS: Record<string, string> = {
  Live: '#DCFCE7',
  Offline: '#FEE2E2',
  Issue: '#FEF3C7',
  Unknown: '#F3F4F6',
  Stale: '#F3E8FF',
  'Scheduled Closed': '#DBEAFE',
  'Not Configured': '#F8F7F4',
};

export default function Operations({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selected, setSelected] = useState<BranchPlatformStatus | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [assignee, setAssignee] = useState('');

  const branches = BRANCHES.filter(b => b.id !== 'all');
  const platforms = PLATFORMS.filter(p => p.id !== 'all');

  const critical = OPERATIONAL_MATRIX.filter(m => m.status === 'Offline' || m.status === 'Issue');
  const stale = OPERATIONAL_MATRIX.filter(m => m.status === 'Stale');

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#9B9691', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Status as observed:</span>
        {['Live', 'Offline', 'Issue', 'Stale', 'Unknown', 'Scheduled Closed', 'Not Configured'].map(s => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: STATUS_COLORS[s], border: '1px solid #E2DDD6' }} />
            <span style={{ fontSize: 11.5, color: '#6B6B65' }}>{s}</span>
          </div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ fontSize: 12, background: '#F0EEE9', border: '1px solid #D8D3CC', borderRadius: 4, padding: '4px 8px' }}>
            <option>All</option>
            <option>Live</option>
            <option>Offline</option>
            <option>Issue</option>
            <option>Stale</option>
            <option>Unknown</option>
          </select>
        </div>
      </div>

      {/* Alert summary */}
      {critical.length > 0 && (
        <div>
          <SectionHeader title={`${critical.length} Active Problems`} subtitle="Confirmed operational issues — independent of sales date filter" />
          {critical.map((c, i) => {
            const branch = BRANCHES.find(b => b.id === c.branchId)?.name;
            const platform = PLATFORMS.find(p => p.id === c.platformId)?.name;
            return (
              <AlertRow
                key={i}
                level={c.status === 'Offline' ? 'critical' : 'warning'}
                text={`${branch} — ${platform}: ${c.status}${c.issues ? ' · ' + c.issues[0] : ''}`}
                time={c.observedAt}
                action="View detail"
                onAction={() => setSelected(c)}
              />
            );
          })}
          {stale.map((s, i) => {
            const branch = BRANCHES.find(b => b.id === s.branchId)?.name;
            const platform = PLATFORMS.find(p => p.id === s.platformId)?.name;
            return (
              <AlertRow
                key={`stale-${i}`}
                level="info"
                text={`${branch} — ${platform}: Stale data · ${s.note || 'No recent sync'}`}
                time={s.observedAt}
                action="View"
                onAction={() => setSelected(s)}
              />
            );
          })}
        </div>
      )}

      {/* Matrix */}
      <div>
        <SectionHeader title="Branch × Platform Status Matrix" subtitle={`Observed as of 09:44 UAE/Asia-Dubai · Click any cell for detail`} />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 3 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '6px 10px', fontSize: 11, fontWeight: 700, color: '#9B9691', letterSpacing: '0.05em', textTransform: 'uppercase', width: 160 }}>Branch</th>
                {platforms.map(p => (
                  <th key={p.id} style={{ fontSize: 11, fontWeight: 700, color: '#9B9691', letterSpacing: '0.05em', textTransform: 'uppercase', padding: '6px 4px', textAlign: 'center', minWidth: 110 }}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {branches.map(branch => (
                <tr key={branch.id}>
                  <td style={{ padding: '4px 10px', fontSize: 12.5, fontWeight: 600, color: branch.pending ? '#9B9691' : '#1A1A18', whiteSpace: 'nowrap' }}>
                    {branch.name}
                    {branch.pending && <span style={{ fontSize: 10, color: '#D97706', marginLeft: 6, fontWeight: 500 }}>⚠ Pending</span>}
                  </td>
                  {platforms.map(platform => {
                    const s = getStatus(branch.id, platform.id);
                    if (!s) return <td key={platform.id} />;
                    const show = filterStatus === 'All' || s.status === filterStatus;
                    return (
                      <td
                        key={platform.id}
                        onClick={() => setSelected(s)}
                        style={{
                          padding: 3,
                          cursor: 'pointer',
                          opacity: show ? 1 : 0.25,
                        }}
                      >
                        <div style={{
                          background: STATUS_COLORS[s.status],
                          border: `1px solid ${s.status === 'Offline' ? '#FCA5A5' : s.status === 'Issue' ? '#FCD34D' : s.status === 'Stale' ? '#D8B4FE' : '#E2DDD6'}`,
                          borderRadius: 4, padding: '7px 8px', textAlign: 'center',
                          transition: 'box-shadow 0.1s ease',
                        }}
                          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
                          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'}
                        >
                          <div style={{ marginBottom: 3 }}><OpsBadge status={s.status} /></div>
                          <div style={{ fontSize: 9.5, color: '#9B9691', fontFamily: 'var(--font-family-mono)' }}>{s.observedAt.split(' ')[1]}</div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary counts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
        {['Live', 'Offline', 'Issue', 'Stale', 'Unknown', 'Scheduled Closed', 'Not Configured'].map(s => {
          const count = OPERATIONAL_MATRIX.filter(m => m.status === s).length;
          return (
            <div key={s} style={{ background: STATUS_COLORS[s], border: '1px solid #E2DDD6', borderRadius: 4, padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 20, fontWeight: 700, color: '#1A1A18' }}>{count}</div>
              <div style={{ fontSize: 10.5, color: '#6B6B65', marginTop: 2 }}>{s}</div>
            </div>
          );
        })}
      </div>

      {/* Detail Drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${BRANCHES.find(b => b.id === selected.branchId)?.name} · ${PLATFORMS.find(p => p.id === selected.platformId)?.name}` : ''}
        width={460}
      >
        {selected && (() => {
          const branch = BRANCHES.find(b => b.id === selected.branchId)?.name;
          const platform = PLATFORMS.find(p => p.id === selected.platformId)?.name;
          return (
            <div>
              <div style={{ marginBottom: 16 }}>
                <OpsBadge status={selected.status} />
              </div>
              <Field label="Branch" value={branch || '-'} />
              <Field label="Platform" value={platform || '-'} />
              <Field label="Status" value={<OpsBadge status={selected.status} />} />
              <Field label="Observed at" value={selected.observedAt + ' UAE/Asia-Dubai'} mono />
              <Field label="Source" value={selected.source} />
              {selected.note && <Field label="Note" value={selected.note} />}
              {selected.issues && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>Issues Detected</div>
                  {selected.issues.map((issue, i) => (
                    <div key={i} style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 4, padding: '8px 10px', fontSize: 12.5, color: '#B91C1C', marginBottom: 6 }}>
                      {issue}
                    </div>
                  ))}
                </div>
              )}
              {selected.affectedProducts && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>Affected Products</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {selected.affectedProducts.map((p, i) => (
                      <span key={i} style={{ background: '#F0EEE9', border: '1px solid #D8D3CC', borderRadius: 3, padding: '3px 8px', fontSize: 12 }}>{p}</span>
                    ))}
                  </div>
                </div>
              )}
              <Field label="Assigned to" value={selected.owner || 'Unassigned'} />
              {/* Assign */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>Assign to</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input value={assignee} onChange={e => setAssignee(e.target.value)} placeholder="Name or team..." style={{ flex: 1, border: '1px solid #D8D3CC', borderRadius: 4, padding: '6px 10px', fontSize: 12.5, fontFamily: 'var(--font-family-sans)', outline: 'none' }} />
                  <Btn label="Assign" variant="primary" small onClick={() => setAssignee('')} />
                </div>
              </div>
              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 12, borderTop: '1px solid #E2DDD6' }}>
                <Btn label="Acknowledge" variant="secondary" small />
                <Btn label="Verify resolved" variant="ghost" small />
                <Btn label="Create task" variant="primary" small onClick={() => { setSelected(null); onNavigate('actions'); }} />
              </div>
              <div style={{ marginTop: 16, padding: '10px 12px', background: '#FFFBEB', borderRadius: 4, fontSize: 11.5, color: '#92400E' }}>
                <strong>Note:</strong> Offline status is only shown when confirmed by Grubtech sync. This tool does not infer offline status from missing order data or zero sales.
              </div>
            </div>
          );
        })()}
      </Drawer>
    </div>
  );
}
