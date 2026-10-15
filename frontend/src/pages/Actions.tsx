import React, { useState } from 'react';
import { TASKS } from '../data/mockData';
import { PriorityBadge, StatusBadge, Card, SectionHeader, Drawer, Field, Btn, TabBar } from '../components/ui';

const STATUS_ORDER = ['Detected', 'Confirmed', 'Assigned', 'In Progress', 'Resolved', 'Verified'];
const STATUS_COLORS: Record<string, string> = {
  Detected: 'grey',
  Confirmed: 'amber',
  Assigned: 'blue',
  'In Progress': 'purple',
  Resolved: 'green',
  Verified: 'green',
};

const TYPE_ICONS: Record<string, string> = {
  Operational: '⚡',
  Menu: '📋',
  Technical: '🔧',
  Review: '💬',
};

export default function Actions({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [view, setView] = useState('list');
  const [selected, setSelected] = useState<typeof TASKS[0] | null>(null);
  const [tasks, setTasks] = useState(TASKS);
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [evidence, setEvidence] = useState('');
  const [assignee, setAssignee] = useState('');

  const filtered = tasks.filter(t => {
    if (filterPriority !== 'All' && t.priority !== filterPriority) return false;
    if (filterType !== 'All' && t.type !== filterType) return false;
    return true;
  });

  function updateStatus(id: number, status: string) {
    setTasks(t => t.map(task => task.id === id ? { ...task, status } : task));
    if (selected?.id === id) setSelected(s => s ? { ...s, status } : null);
  }

  const groupedByStatus = STATUS_ORDER.reduce((acc, s) => {
    acc[s] = filtered.filter(t => t.status === s || (s === 'In Progress' && t.status === 'In Progress'));
    return acc;
  }, {} as Record<string, typeof TASKS>);

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
        {STATUS_ORDER.map(s => {
          const count = tasks.filter(t => t.status === s).length;
          return (
            <div key={s} style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: 4, padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 20, fontWeight: 700, color: '#1A1A18' }}>{count}</div>
              <div style={{ fontSize: 10.5, color: '#6B6B65', marginTop: 2 }}>{s}</div>
            </div>
          );
        })}
      </div>

      {/* Filters + view toggle */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={{ border: '1px solid #D8D3CC', borderRadius: 4, padding: '5px 8px', fontSize: 12.5, background: '#F0EEE9' }}>
          <option>All</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ border: '1px solid #D8D3CC', borderRadius: 4, padding: '5px 8px', fontSize: 12.5, background: '#F0EEE9' }}>
          <option>All</option>
          <option>Operational</option>
          <option>Menu</option>
          <option>Technical</option>
          <option>Review</option>
        </select>
        <div style={{ display: 'flex', borderRadius: 4, overflow: 'hidden', border: '1px solid #D8D3CC', marginLeft: 'auto' }}>
          {['list', 'board'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '5px 12px', fontSize: 12, background: view === v ? '#1B3D2F' : '#FFFFFF',
              color: view === v ? '#FFFFFF' : '#6B6B65', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family-sans)'
            }}>{v === 'list' ? '≡ List' : '⊞ Board'}</button>
          ))}
        </div>
        <Btn label="+ New task" variant="primary" small />
      </div>

      {/* List view */}
      {view === 'list' && (
        <Card>
          <table className="data-table">
            <thead>
              <tr>
                <th>Priority</th>
                <th>Issue / Opportunity</th>
                <th>Branch · Platform</th>
                <th>Type</th>
                <th>Owner</th>
                <th>Due</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} onClick={() => setSelected(t)} style={{ cursor: 'pointer' }}>
                  <td><PriorityBadge level={t.priority} /></td>
                  <td style={{ fontSize: 12.5, maxWidth: 280 }}>
                    <div style={{ fontWeight: 500 }}>{t.issue}</div>
                    {t.requiresEvidence && <div style={{ fontSize: 10.5, color: '#9B9691', marginTop: 2 }}>⚠ Requires evidence to close</div>}
                  </td>
                  <td style={{ fontSize: 12 }}>{t.branch}<br /><span style={{ color: '#9B9691', fontSize: 11.5 }}>{t.platform}</span></td>
                  <td style={{ fontSize: 12 }}>{TYPE_ICONS[t.type]} {t.type}</td>
                  <td style={{ fontSize: 12.5 }}>{t.owner || <span style={{ color: '#DC2626', fontWeight: 600 }}>Unassigned</span>}</td>
                  <td style={{ fontFamily: 'var(--font-family-mono)', fontSize: 12, color: '#D97706', fontWeight: 600 }}>{t.dueAt}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <select
                      value={t.status}
                      onChange={e => updateStatus(t.id, e.target.value)}
                      style={{ fontSize: 11.5, background: '#F0EEE9', border: '1px solid #D8D3CC', borderRadius: 4, padding: '3px 6px' }}
                    >
                      {STATUS_ORDER.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {!t.owner && <Btn label="Assign" variant="primary" small onClick={() => setSelected(t)} />}
                      {t.status === 'Assigned' && <Btn label="Acknowledge" variant="secondary" small onClick={() => updateStatus(t.id, 'In Progress')} />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* Board view */}
      {view === 'board' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, overflowX: 'auto' }}>
          {STATUS_ORDER.map(status => (
            <div key={status} style={{ minWidth: 180 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#9B9691', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                <span>{status}</span>
                <span style={{ fontFamily: 'var(--font-family-mono)' }}>{filtered.filter(t => t.status === status).length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {filtered.filter(t => t.status === status).map(t => (
                  <div
                    key={t.id}
                    onClick={() => setSelected(t)}
                    style={{
                      background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: 4, padding: '10px 12px', cursor: 'pointer',
                      borderLeft: `3px solid ${t.priority === 'Critical' ? '#DC2626' : t.priority === 'High' ? '#D97706' : t.priority === 'Medium' ? '#2563EB' : '#9CA3AF'}`,
                    }}
                  >
                    <div style={{ marginBottom: 6 }}><PriorityBadge level={t.priority} /></div>
                    <div style={{ fontSize: 12, color: '#1A1A18', lineHeight: 1.4, marginBottom: 8 }}>{t.issue.slice(0, 60)}{t.issue.length > 60 ? '…' : ''}</div>
                    <div style={{ fontSize: 11, color: '#9B9691' }}>{t.branch}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                      <span style={{ fontSize: 11, color: t.owner ? '#1B3D2F' : '#DC2626', fontWeight: 600 }}>{t.owner || 'Unassigned'}</span>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-family-mono)', color: '#D97706' }}>{t.dueAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task detail drawer */}
      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected ? `Task #${selected.id}` : ''} width={480}>
        {selected && (
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              <PriorityBadge level={selected.priority} />
              <StatusBadge label={selected.status} color={STATUS_COLORS[selected.status] as any} />
              <span style={{ fontSize: 12, background: '#F0EEE9', color: '#6B6B65', padding: '2px 8px', borderRadius: 3 }}>{TYPE_ICONS[selected.type]} {selected.type}</span>
            </div>
            <Field label="Issue" value={selected.issue} />
            <Field label="Branch" value={selected.branch} />
            <Field label="Platform" value={selected.platform} />
            <Field label="Due by" value={selected.dueAt} mono />
            <Field label="Current owner" value={selected.owner || 'Unassigned'} />

            {/* Assign */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Assign to</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <select value={assignee} onChange={e => setAssignee(e.target.value)} style={{ flex: 1, border: '1px solid #D8D3CC', borderRadius: 4, padding: '6px 10px', fontSize: 12.5 }}>
                  <option value="">Select owner...</option>
                  {['Ali Hassan', 'Fatima Al-Zahra', 'Grubtech Support', 'Menu Team', 'Marketing', 'Branch Manager'].map(o => <option key={o}>{o}</option>)}
                </select>
                <Btn label="Assign" variant="primary" small onClick={() => setAssignee('')} />
              </div>
            </div>

            {/* Status update */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Update status</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {STATUS_ORDER.map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    style={{
                      fontSize: 11.5, padding: '4px 10px', borderRadius: 4, border: '1px solid #D8D3CC',
                      background: selected.status === s ? '#1B3D2F' : '#FFFFFF', color: selected.status === s ? '#FFFFFF' : '#6B6B65',
                      cursor: 'pointer', fontFamily: 'var(--font-family-sans)',
                    }}
                  >{s}</button>
                ))}
              </div>
            </div>

            {/* Evidence */}
            {selected.requiresEvidence && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Resolution evidence <span style={{ color: '#DC2626' }}>*required to close</span></div>
                <textarea
                  value={evidence}
                  onChange={e => setEvidence(e.target.value)}
                  placeholder="Describe what was done, link to screenshot or system log..."
                  rows={3}
                  style={{ width: '100%', border: '1px solid #D8D3CC', borderRadius: 4, padding: '8px 10px', fontSize: 12.5, fontFamily: 'var(--font-family-sans)', outline: 'none', resize: 'none' }}
                />
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 12, borderTop: '1px solid #E2DDD6' }}>
              <Btn label="Mark resolved" variant="primary" small disabled={selected.requiresEvidence && !evidence} onClick={() => updateStatus(selected.id, 'Resolved')} />
              <Btn label="Verify resolved" variant="secondary" small disabled={selected.status !== 'Resolved'} onClick={() => updateStatus(selected.id, 'Verified')} />
            </div>
            {selected.requiresEvidence && !evidence && (
              <div style={{ fontSize: 11, color: '#DC2626', marginTop: 6 }}>Evidence is required to mark this task as resolved.</div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
