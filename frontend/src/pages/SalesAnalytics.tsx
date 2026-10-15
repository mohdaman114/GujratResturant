import React, { useState } from 'react';
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line
} from 'recharts';
import { TabBar, Card, SectionHeader, KPICard, Change, StatusBadge } from '../components/ui';
import { BRANCH_PERFORMANCE, PLATFORM_PERFORMANCE, DAILY_SALES, MONTHLY_TREND } from '../data/mockData';

const COMPARISONS = [
  { id: 'yesterday', label: 'Same elapsed hours yesterday' },
  { id: 'last-week', label: 'Same weekday last week' },
  { id: 'last-month-day', label: 'Same date last month' },
  { id: 'mtd', label: 'MTD vs prior month days' },
  { id: 'custom', label: 'Custom comparison' },
];

const CATEGORY_DATA = [
  { name: 'Biryani', sales: 125920, orders: 1330, aov: 94.7, share: 30.1 },
  { name: 'Karahi', sales: 98600, orders: 758, aov: 130.1, share: 23.5 },
  { name: 'Grills', sales: 84540, orders: 464, aov: 182.2, share: 20.2 },
  { name: 'Breads', sales: 28080, orders: 1872, aov: 15.0, share: 6.7 },
  { name: 'Starters', sales: 46400, orders: 464, aov: 100, share: 11.1 },
  { name: 'Curries', sales: 44560, orders: 606, aov: 73.5, share: 10.6 },
  { name: 'Drinks', sales: 8600, orders: 860, aov: 10.0, share: 2.1 },
];

export default function SalesAnalytics() {
  const [tab, setTab] = useState('branch');
  const [comparison, setComparison] = useState('yesterday');
  const [metric, setMetric] = useState('sales');

  const compLabel = COMPARISONS.find(c => c.id === comparison)?.label || '';

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Comparison selector */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: 5, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: '#6B6B65' }}>Compare to:</span>
        {COMPARISONS.map(c => (
          <button
            key={c.id}
            onClick={() => setComparison(c.id)}
            style={{
              fontSize: 12, fontWeight: comparison === c.id ? 600 : 400, padding: '4px 10px', borderRadius: 4,
              background: comparison === c.id ? '#1B3D2F' : '#F0EEE9', color: comparison === c.id ? '#FFFFFF' : '#6B6B65',
              border: 'none', cursor: 'pointer',
            }}
          >{c.label}</button>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, color: '#9B9691' }}>Demo data — Oct 1–15, 2024</div>
      </div>

      {/* Top KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
        {[
          { label: 'Net Food Sales', value: 'AED 282,400', change: 13.8, note: 'Excl. platform fees & refunds' },
          { label: 'Completed Orders', value: '1,755', change: 13.8, note: 'Confirmed delivered' },
          { label: 'Avg Order Value', value: 'AED 160.9', change: 0.0, note: 'Net food per order' },
          { label: 'Cancellations', value: '77', change: -17.6, note: '4.2% rate · 77 orders', inv: true },
          { label: 'Refunds', value: 'AED 3,200', change: 8.4, note: 'Platform reported', inv: true },
          { label: 'Discounts Given', value: 'AED 14,600', change: 22.4, note: 'Merchant-funded portion' },
        ].map((k, i) => (
          <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: 5, padding: '12px 14px' }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{k.label}</div>
            <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 16, fontWeight: 700, color: '#1A1A18', marginBottom: 3 }}>{k.value}</div>
            <Change value={k.change} inverse={k.inv} />
            <div style={{ fontSize: 10.5, color: '#B8B2A8', marginTop: 3 }}>{k.note}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
        <Card style={{ padding: '14px 16px' }}>
          <SectionHeader title="30-Day Sales Trend" subtitle="Net food sales · AED · daily completed days" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MONTHLY_TREND} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B3D2F" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#1B3D2F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2DDD6" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 9, fontFamily: 'var(--font-family-mono)', fill: '#9B9691' }} tickLine={false} axisLine={false} interval={4} />
              <YAxis tick={{ fontSize: 9, fontFamily: 'var(--font-family-mono)', fill: '#9B9691' }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} width={28} />
              <Tooltip formatter={(v: any) => [`AED ${(v as number).toLocaleString()}`, 'Net sales']} contentStyle={{ fontSize: 11, borderColor: '#E2DDD6' }} />
              <Area type="monotone" dataKey="sales" stroke="#1B3D2F" strokeWidth={2} fill="url(#grad1)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card style={{ padding: '14px 16px' }}>
          <SectionHeader title="Platform Sales Mix" subtitle="MTD share · AED" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            {PLATFORM_PERFORMANCE.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 72, fontSize: 12, color: '#1A1A18', fontWeight: 500 }}>{p.platform}</div>
                <div style={{ flex: 1, height: 12, background: '#F0EEE9', borderRadius: 3 }}>
                  <div style={{ width: `${p.share}%`, height: '100%', background: '#1B3D2F', borderRadius: 3, opacity: 0.7 + i * 0.03 }} />
                </div>
                <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 11.5, color: '#1A1A18', fontWeight: 600, width: 60, textAlign: 'right' }}>AED {(p.sales / 1000).toFixed(1)}k</div>
                <Change value={p.change} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Drill-down tabs */}
      <Card>
        <div style={{ padding: '14px 16px 0' }}>
          <SectionHeader title="Drill-Down Analysis" subtitle={`Comparison basis: ${compLabel}`} />
          <TabBar
            tabs={[{ id: 'branch', label: 'By Branch' }, { id: 'platform', label: 'By Platform' }, { id: 'category', label: 'By Category' }, { id: 'hourly', label: 'Hourly Today' }]}
            active={tab} onChange={setTab}
          />
        </div>

        {tab === 'branch' && (
          <div style={{ padding: '0 16px 16px' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Branch</th>
                  <th>Net Food Sales</th>
                  <th>Orders</th>
                  <th>AOV</th>
                  <th>Cancellations</th>
                  <th>Change</th>
                  <th>Coverage</th>
                </tr>
              </thead>
              <tbody>
                {BRANCH_PERFORMANCE.map((b, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>
                      {b.branch}
                      {b.pending && <span style={{ fontSize: 10, color: '#D97706', marginLeft: 6 }}>⚠ Awaiting config</span>}
                    </td>
                    <td style={{ fontFamily: 'var(--font-family-mono)' }}>{b.pending ? 'N/A' : `AED ${b.sales.toLocaleString()}`}</td>
                    <td style={{ fontFamily: 'var(--font-family-mono)' }}>{b.pending ? 'N/A' : b.orders}</td>
                    <td style={{ fontFamily: 'var(--font-family-mono)' }}>{b.pending ? 'N/A' : `AED ${b.aov}`}</td>
                    <td style={{ fontFamily: 'var(--font-family-mono)' }}>{b.pending ? 'N/A' : '4.2%'}</td>
                    <td>{b.pending ? <span style={{ fontSize: 11, color: '#9B9691' }}>N/A</span> : <Change value={b.change} />}</td>
                    <td>{b.pending ? <StatusBadge label="Not configured" color="slate" /> : <StatusBadge label="Complete" color="green" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'platform' && (
          <div style={{ padding: '0 16px 16px' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Net Food Sales</th>
                  <th>Orders</th>
                  <th>AOV</th>
                  <th>Share</th>
                  <th>Change vs prior</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {PLATFORM_PERFORMANCE.map((p, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{p.platform}</td>
                    <td style={{ fontFamily: 'var(--font-family-mono)' }}>AED {p.sales.toLocaleString()}</td>
                    <td style={{ fontFamily: 'var(--font-family-mono)' }}>{p.orders}</td>
                    <td style={{ fontFamily: 'var(--font-family-mono)' }}>AED {p.aov}</td>
                    <td style={{ fontFamily: 'var(--font-family-mono)' }}>{p.share}%</td>
                    <td><Change value={p.change} /></td>
                    <td style={{ fontSize: 11.5, color: '#9B9691' }}>{p.platform === 'Keeta' ? 'Growing fast — limited branch coverage' : p.platform === 'Smiles' ? 'Declining — review pricing' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'category' && (
          <div style={{ padding: '0 16px 16px' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Net Food Sales</th>
                  <th>Orders</th>
                  <th>AOV</th>
                  <th>Share</th>
                </tr>
              </thead>
              <tbody>
                {CATEGORY_DATA.map((c, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td style={{ fontFamily: 'var(--font-family-mono)' }}>AED {c.sales.toLocaleString()}</td>
                    <td style={{ fontFamily: 'var(--font-family-mono)' }}>{c.orders}</td>
                    <td style={{ fontFamily: 'var(--font-family-mono)' }}>AED {c.aov}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 60, height: 6, background: '#F0EEE9', borderRadius: 3 }}>
                          <div style={{ width: `${c.share * 3}%`, height: '100%', background: '#1B3D2F', borderRadius: 3 }} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: 12 }}>{c.share}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'hourly' && (
          <div style={{ padding: '0 16px 16px' }}>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={DAILY_SALES} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2DDD6" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 9, fontFamily: 'var(--font-family-mono)', fill: '#9B9691' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 9, fontFamily: 'var(--font-family-mono)', fill: '#9B9691' }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} width={28} />
                <Tooltip formatter={(v: any) => [`AED ${(v as number).toLocaleString()}`, '']} contentStyle={{ fontSize: 11, borderColor: '#E2DDD6' }} />
                <Legend wrapperStyle={{ fontSize: 11.5 }} />
                <Bar dataKey="yesterday" name="Yesterday" fill="#D4CFC7" radius={[2, 2, 0, 0]} />
                <Bar dataKey="today" name="Today" fill="#1B3D2F" radius={[2, 2, 0, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      {/* AI Explanation panel */}
      <Card style={{ padding: '14px 16px', borderLeft: '3px solid #B8952A' }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1A1A18', marginBottom: 10 }}>AI Analysis — MTD vs Same Days Last Month</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: '#16A34A', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>Observed facts</div>
            <ul style={{ fontSize: 12, color: '#3D3D38', lineHeight: 1.7, paddingLeft: 14, margin: 0 }}>
              <li>Sales up 13.8% · orders up 13.8% · AOV flat</li>
              <li>Keeta growing 42% from a small base</li>
              <li>Deliveroo fastest growing large platform (+18.6%)</li>
              <li>Smiles declining (-8.4%) — 6 branches, 2% share</li>
            </ul>
          </div>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: '#D97706', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>Possible causes</div>
            <ul style={{ fontSize: 12, color: '#3D3D38', lineHeight: 1.7, paddingLeft: 14, margin: 0 }}>
              <li>October Value Fest discount may be driving volume</li>
              <li>Deliveroo growth possibly linked to Lunch Saver follow-through</li>
              <li>Smiles decline may reflect lower campaign activity</li>
            </ul>
          </div>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: '#DC2626', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>Missing evidence</div>
            <ul style={{ fontSize: 12, color: '#3D3D38', lineHeight: 1.7, paddingLeft: 14, margin: 0 }}>
              <li>Cost data not available — contribution not shown</li>
              <li>Platform payouts not reconciled — net of fees unknown</li>
              <li>B7 and B8 not reporting — totals incomplete</li>
              <li>M26/Careem sync stale — figures may be under-reported</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
