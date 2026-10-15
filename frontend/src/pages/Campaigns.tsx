import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine } from 'recharts';
import { Card, SectionHeader, StatusBadge, TabBar, Drawer, Field, Btn, ProgressBar } from '../components/ui';
import { CAMPAIGNS, TARGET_DATA } from '../data/mockData';
import { Change } from '../components/ui';

const TRAJECTORY = [
  { month: 'Oct', target: 350000, actual: 282400, trajectory: 308000 },
  { month: 'Nov', target: 400000, actual: null, trajectory: null },
  { month: 'Dec', target: 450000, actual: null, trajectory: null },
  { month: 'Jan', target: 500000, actual: null, trajectory: null },
];

const AI_RECS = [
  {
    title: 'Expand Keeta to Mafraq and Delight Gujrat',
    reasoning: 'Keeta is growing 42% from its current 4.5% share. Currently active at 4 of 6 reporting branches. Expanding could add est. AED 8–15k/month. This is an estimate — actual depends on branch readiness.',
    measurement: 'Track Keeta order volume and revenue 30 days post-expansion',
    confidence: 'Medium — projection based on scaling ratios, not branch-level data',
    approved: false,
  },
  {
    title: 'Increase October Value Fest budget on Talabat',
    reasoning: 'Current ROAS 5.35× with AED 8,000 budget — well above 3× threshold. Raising budget by AED 3,000 may generate est. AED 12,000–16,000 incremental revenue. Not guaranteed.',
    measurement: 'Compare daily order volume and revenue before and after budget increase',
    confidence: 'Medium-high — strong current ROAS but platform saturation unknown',
    approved: false,
  },
  {
    title: 'Run Naan House weekend brunch special',
    reasoning: 'NH-10 and NH-11 show lower Saturday morning orders vs weekday lunch peak. A 15% weekend morning discount could shift ordering patterns.',
    measurement: 'Compare Saturday 08:00–12:00 order volume vs prior 4-week average',
    confidence: 'Low — hypothesis only; limited data on weekend breakfast demand',
    approved: false,
  },
];

export default function Campaigns() {
  const [tab, setTab] = useState('list');
  const [selected, setSelected] = useState<typeof CAMPAIGNS[0] | null>(null);
  const [approvals, setApprovals] = useState<Record<number, boolean>>({});
  const [baselineEdit, setBaselineEdit] = useState(TARGET_DATA.baseline.toString());
  const [targetEdit, setTargetEdit] = useState(TARGET_DATA.target.toString());

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Growth target */}
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <SectionHeader title="4-Month Growth Plan" subtitle="Target trajectory vs actual results · AED" />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <label style={{ fontSize: 10, color: '#9B9691' }}>Baseline (AED)</label>
              <input value={baselineEdit} onChange={e => setBaselineEdit(e.target.value)} style={{ width: 100, border: '1px solid #D8D3CC', borderRadius: 4, padding: '4px 8px', fontSize: 12.5, fontFamily: 'var(--font-family-mono)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <label style={{ fontSize: 10, color: '#9B9691' }}>Target (AED)</label>
              <input value={targetEdit} onChange={e => setTargetEdit(e.target.value)} style={{ width: 100, border: '1px solid #D8D3CC', borderRadius: 4, padding: '4px 8px', fontSize: 12.5, fontFamily: 'var(--font-family-mono)' }} />
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={TRAJECTORY} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2DDD6" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9B9691' }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 9, fontFamily: 'var(--font-family-mono)', fill: '#9B9691' }} tickLine={false} axisLine={false} tickFormatter={v => `AED ${(v / 1000).toFixed(0)}k`} width={58} />
            <Tooltip formatter={(v: any) => [`AED ${(v as number).toLocaleString()}`, '']} contentStyle={{ fontSize: 11, borderColor: '#E2DDD6' }} />
            <Bar dataKey="target" name="Target" fill="#E2DDD6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="actual" name="Actual (MTD)" fill="#1B3D2F" radius={[2, 2, 0, 0]} />
            <Bar dataKey="trajectory" name="Projected" fill="#B8952A" radius={[2, 2, 0, 0]} opacity={0.6} />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', gap: 20, marginTop: 12, padding: '10px 0', borderTop: '1px solid #E2DDD6' }}>
          <div><span style={{ fontSize: 11, color: '#9B9691' }}>Current MTD: </span><span style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 700 }}>AED 282,400</span></div>
          <div><span style={{ fontSize: 11, color: '#9B9691' }}>Oct target: </span><span style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 700 }}>AED 350,000</span></div>
          <div><span style={{ fontSize: 11, color: '#D97706' }}>Gap to Oct target: </span><span style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 700, color: '#D97706' }}>AED 67,600</span></div>
          <div><span style={{ fontSize: 11, color: '#9B9691' }}>Projected month-end: </span><span style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 700, color: '#D97706' }}>AED 308,000</span></div>
          <div style={{ marginLeft: 'auto', fontSize: 11, color: '#DC2626' }}>Projection is based on 15-day trend extrapolation — not a guarantee</div>
        </div>
      </Card>

      <TabBar tabs={[{ id: 'list', label: 'Campaigns' }, { id: 'ai', label: 'AI Recommendations' }]} active={tab} onChange={setTab} />

      {tab === 'list' && (
        <Card>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #E2DDD6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Campaign List</span>
            <Btn label="+ New Campaign" variant="primary" small />
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Type</th>
                <th>Platform</th>
                <th>Scope</th>
                <th>Budget</th>
                <th>Revenue</th>
                <th>ROAS</th>
                <th>Status</th>
                <th>Dates</th>
              </tr>
            </thead>
            <tbody>
              {CAMPAIGNS.map(c => (
                <tr key={c.id} onClick={() => setSelected(c)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td style={{ fontSize: 12 }}>{c.type}</td>
                  <td style={{ fontSize: 12 }}>{c.platform}</td>
                  <td style={{ fontSize: 12 }}>{c.branch}</td>
                  <td style={{ fontFamily: 'var(--font-family-mono)', fontSize: 12 }}>AED {c.budget.toLocaleString()}</td>
                  <td style={{ fontFamily: 'var(--font-family-mono)', fontSize: 12 }}>{c.revenue > 0 ? `AED ${c.revenue.toLocaleString()}` : '—'}</td>
                  <td style={{ fontFamily: 'var(--font-family-mono)', fontSize: 12 }}>
                    {c.roas !== null ? (
                      <span style={{ color: c.roas >= 4 ? '#16A34A' : c.roas >= 2.5 ? '#D97706' : '#DC2626', fontWeight: 700 }}>{c.roas}×</span>
                    ) : '—'}
                  </td>
                  <td><StatusBadge label={c.status} color={c.status === 'Active' ? 'green' : c.status === 'Scheduled' ? 'blue' : c.status === 'Completed' ? 'grey' : 'amber'} /></td>
                  <td style={{ fontSize: 11.5, color: '#9B9691', fontFamily: 'var(--font-family-mono)' }}>{c.startDate} – {c.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === 'ai' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {AI_RECS.map((rec, i) => (
            <Card key={i} style={{ padding: '16px 20px', borderLeft: approvals[i] ? '3px solid #16A34A' : '3px solid #B8952A' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1A1A18' }}>{rec.title}</div>
                {approvals[i] ? (
                  <StatusBadge label="Approved" color="green" />
                ) : (
                  <Btn label="Approve & Create" variant="primary" small onClick={() => setApprovals({ ...approvals, [i]: true })} />
                )}
              </div>
              <div style={{ fontSize: 12.5, color: '#3D3D38', lineHeight: 1.6, marginBottom: 10 }}>{rec.reasoning}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#F8F7F4', borderRadius: 4, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>How to measure</div>
                  <div style={{ fontSize: 12, color: '#3D3D38', lineHeight: 1.5 }}>{rec.measurement}</div>
                </div>
                <div style={{ background: '#FFFBEB', borderRadius: 4, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Confidence</div>
                  <div style={{ fontSize: 12, color: '#92400E', lineHeight: 1.5 }}>{rec.confidence}</div>
                </div>
              </div>
            </Card>
          ))}
          <div style={{ fontSize: 11.5, color: '#9B9691', padding: '8px 0' }}>
            AI recommendations are based on available data and are not guarantees of outcomes. Approve only after reviewing supporting evidence.
          </div>
        </div>
      )}

      {/* Campaign detail drawer */}
      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ''} width={480}>
        {selected && (
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              <StatusBadge label={selected.status} color={selected.status === 'Active' ? 'green' : selected.status === 'Scheduled' ? 'blue' : 'grey'} />
              {selected.approved ? <StatusBadge label="Approved" color="green" /> : <StatusBadge label="Pending approval" color="amber" />}
            </div>
            <Field label="Type" value={selected.type} />
            <Field label="Platform" value={selected.platform} />
            <Field label="Branch scope" value={selected.branch} />
            <Field label="Offer" value={selected.discount} />
            <Field label="Dates" value={`${selected.startDate} – ${selected.endDate}`} mono />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              <div style={{ background: '#F8F7F4', borderRadius: 4, padding: '10px 12px' }}>
                <div style={{ fontSize: 10.5, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Total Budget</div>
                <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 15, fontWeight: 700 }}>AED {selected.budget.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: '#9B9691', marginTop: 3 }}>Merchant: AED {selected.merchantFunded.toLocaleString()} · Platform: AED {selected.platformFunded.toLocaleString()}</div>
              </div>
              <div style={{ background: '#F8F7F4', borderRadius: 4, padding: '10px 12px' }}>
                <div style={{ fontSize: 10.5, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Results</div>
                <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 15, fontWeight: 700 }}>{selected.revenue > 0 ? `AED ${selected.revenue.toLocaleString()}` : '—'}</div>
                {selected.roas && <div style={{ fontSize: 11, color: selected.roas >= 4 ? '#16A34A' : '#D97706', marginTop: 3 }}>ROAS {selected.roas}×</div>}
                {!selected.roas && <div style={{ fontSize: 11, color: '#9B9691', marginTop: 3 }}>Campaign not started</div>}
              </div>
            </div>
            {!selected.approved && (
              <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: 4, padding: '10px 12px', marginBottom: 12, fontSize: 12.5, color: '#92400E' }}>
                This campaign requires manager approval before it goes live.
              </div>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              {!selected.approved && <Btn label="Approve campaign" variant="primary" small />}
              <Btn label="Edit" variant="secondary" small />
              <Btn label="Pause" variant="ghost" small disabled={selected.status !== 'Active'} />
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
