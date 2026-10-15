import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { KPICard, AlertRow, SectionHeader, Card, ProgressBar, Change, StatusBadge, Btn } from '../components/ui';
import { OVERVIEW_KPIS, TARGET_DATA, DAILY_SALES, BRANCH_PERFORMANCE, PLATFORM_PERFORMANCE, MONTHLY_TREND } from '../data/mockData';

const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(0)}k` : n.toString();
const fmtAED = (n: number) => n >= 1000 ? `AED ${(n / 1000).toFixed(1)}k` : `AED ${n}`;

interface OverviewProps {
  onNavigate: (page: string) => void;
}

export default function Overview({ onNavigate }: OverviewProps) {
  const [briefOpen, setBriefOpen] = useState(false);
  const kpi = OVERVIEW_KPIS;
  const targetGap = TARGET_DATA.target - TARGET_DATA.mtd;
  const targetPct = (TARGET_DATA.mtd / TARGET_DATA.target) * 100;

  return (
    <div style={{ padding: '20px 24px', maxWidth: 1400, display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Coverage banner */}
      <div style={{ background: '#FFFBEB', border: '1px solid #D97706', borderRadius: 4, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D97706', flexShrink: 0 }} />
        <span style={{ fontSize: 12.5, color: '#92400E' }}>Demo data — {kpi.coverage}</span>
        <span style={{ fontSize: 11, color: '#B45309', marginLeft: 'auto', fontFamily: 'var(--font-family-mono)' }}>Last refresh: {kpi.lastRefresh}</span>
      </div>

      {/* AI Morning Brief */}
      <Card>
        <div
          onClick={() => setBriefOpen(!briefOpen)}
          style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderBottom: briefOpen ? '1px solid #E2DDD6' : 'none' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1B3D2F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="3" stroke="#B8952A" strokeWidth="1.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="#B8952A" strokeWidth="1.4"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A18' }}>AI Morning Brief — Mon 15 Jan 2024</div>
              <div style={{ fontSize: 11, color: '#9B9691' }}>3 actions require attention today · Generated 09:44 UAE/Asia-Dubai</div>
            </div>
          </div>
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" style={{ transform: briefOpen ? 'rotate(180deg)' : 'none', transition: '0.2s ease', color: '#9B9691' }}><polyline points="2,4 7,9 12,4" stroke="currentColor" strokeWidth="1.5"/></svg>
        </div>
        {briefOpen && (
          <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#9B9691', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>What changed overnight</div>
              <ul style={{ fontSize: 12.5, color: '#3D3D38', lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
                <li>Sales MTD at AED 282,400 — tracking <strong>13.8% ahead</strong> of the same 15 days last month</li>
                <li>Royal Gujrat on Keeta went offline at 07:10 — unresolved for 2h 35m</li>
                <li>Naan House ME-11 / Careem offline since 08:30 — no acknowledgement</li>
                <li>Delight Gujrat cancellation rate spiked to 18% on Deliveroo</li>
              </ul>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#9B9691', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Growth opportunities</div>
              <ul style={{ fontSize: 12.5, color: '#3D3D38', lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
                <li>Keeta orders growing 42% — expand to Mafraq and Delight (not yet live)</li>
                <li>Shish Tawook growing 34.6% — no image on Noon or Careem</li>
                <li>October Value Fest ROAS at 5.35× — consider raising budget</li>
              </ul>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#9B9691', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Recommended actions</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { text: 'Resolve Royal Gujrat / Keeta offline urgently — est. AED 400 loss/hr', urgency: 'critical' },
                  { text: 'Assign NH-11 / Careem offline to branch manager immediately', urgency: 'critical' },
                  { text: 'Investigate Delight Gujrat / Deliveroo cancellations — 18% rate', urgency: 'high' },
                  { text: 'Fix Noon menu sync for Royal Gujrat — 3 items unpriced', urgency: 'medium' },
                ].map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 10px', background: a.urgency === 'critical' ? '#FEF2F2' : a.urgency === 'high' ? '#FFFBEB' : '#F8F7F4', borderRadius: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: a.urgency === 'critical' ? '#DC2626' : a.urgency === 'high' ? '#D97706' : '#6B7280', marginTop: 4, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: '#1A1A18', lineHeight: 1.4 }}>{a.text}</span>
                    <button onClick={() => onNavigate('actions')} style={{ fontSize: 11, color: '#1B3D2F', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginLeft: 'auto', whiteSpace: 'nowrap' }}>Create task</button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#9B9691', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Missing data notes</div>
              <ul style={{ fontSize: 12, color: '#9B9691', lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
                <li>Branch 7 and Branch 8 not yet configured — no data</li>
                <li>M26 / Careem sync stale since 06:20 — figures may be incomplete</li>
                <li>Cost data missing for 6 items — contribution margin unavailable</li>
                <li>Analysis based on uploaded reports, not live API connections</li>
              </ul>
            </div>
          </div>
        )}
      </Card>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <KPICard
          label="Net Food Sales (MTD)"
          value="AED 282,400"
          period="Oct 1–15, 2024 · 6 branches"
          comparison="AED 248,200"
          compLabel="same days last month"
          change={kpi.netFoodSales.change}
          onClick={() => onNavigate('analytics')}
        />
        <KPICard
          label="Completed Orders (MTD)"
          value="1,755"
          period="Oct 1–15, 2024 · 6 branches"
          comparison="1,542"
          compLabel="same days last month"
          change={kpi.completedOrders.change}
          onClick={() => onNavigate('analytics')}
        />
        <KPICard
          label="Average Order Value"
          value="AED 160.9"
          period="Oct 1–15, 2024"
          comparison="AED 160.9"
          compLabel="same days last month"
          change={kpi.aov.change}
        />
        <KPICard
          label="Cancellation Rate"
          value="4.2%"
          period="Oct 1–15, 2024"
          comparison="5.1%"
          compLabel="same days last month"
          change={kpi.cancellationRate.change}
          inverseGood
        />
      </div>

      {/* Monthly target */}
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A18', marginBottom: 2 }}>Monthly Target Progress — October 2024</div>
            <div style={{ fontSize: 11.5, color: '#9B9691' }}>Month 1 of 4 · Goal: AED 300k → AED 500k by January</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 18, fontWeight: 700, color: '#1B3D2F' }}>AED 282,400</div>
            <div style={{ fontSize: 11, color: '#9B9691' }}>of AED 500,000 target</div>
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <ProgressBar value={TARGET_DATA.mtd} max={TARGET_DATA.target} height={8} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9B9691' }}>
          <span>AED 0</span>
          <span style={{ color: '#D97706', fontWeight: 600 }}>Oct target: AED 350k · Gap: AED {(350000 - TARGET_DATA.mtd).toLocaleString()}</span>
          <span>AED 500k</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 14 }}>
          {TARGET_DATA.trajectory.map((m, i) => (
            <div key={i} style={{ background: '#F8F7F4', borderRadius: 4, padding: '8px 10px', borderLeft: i === 0 ? '3px solid #1B3D2F' : '3px solid #E2DDD6' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9B9691', marginBottom: 2 }}>{m.month}</div>
              <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 13, fontWeight: 700, color: '#1A1A18' }}>AED {(m.target / 1000).toFixed(0)}k</div>
              {m.actual !== null && <div style={{ fontSize: 11, color: '#16A34A', fontFamily: 'var(--font-family-mono)' }}>↑ {(m.actual / 1000).toFixed(0)}k MTD</div>}
              {m.actual === null && <div style={{ fontSize: 11, color: '#B8B2A8' }}>Upcoming</div>}
            </div>
          ))}
        </div>
      </Card>

      {/* Alerts + Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>

        {/* Critical alerts */}
        <div>
          <SectionHeader title="Operational Alerts" subtitle="Observed as of 09:44 UAE — independent of date filter" action={() => onNavigate('operations')} actionLabel="View all" />
          <AlertRow
            level="critical"
            text="Royal Gujrat — Keeta offline since 07:10. No orders in 2h 35m. Revenue est. AED 1,200 lost."
            branch="Royal Gujrat · Keeta"
            time="2h 35m ago"
            action="Assign"
            onAction={() => onNavigate('operations')}
          />
          <AlertRow
            level="critical"
            text="Naan House ME-11 — Careem offline since 08:30. Unacknowledged."
            branch="NH-11 · Careem"
            time="1h 15m ago"
            action="Assign"
            onAction={() => onNavigate('operations')}
          />
          <AlertRow
            level="warning"
            text="Delight Gujrat — Cancellation rate 18% on Deliveroo (threshold: 10%)"
            branch="Delight · Deliveroo"
            time="55m ago"
            action="Review"
            onAction={() => onNavigate('operations')}
          />
          <AlertRow
            level="warning"
            text="Royal Gujrat — Noon menu sync failed. 3 items missing prices."
            branch="Royal · Noon"
            time="30m ago"
            action="Fix"
            onAction={() => onNavigate('operations')}
          />
          <div style={{ marginTop: 12 }}>
            <SectionHeader title="Today's Priority Actions" />
            {[
              { text: 'Resolve Keeta offline — Royal Gujrat', due: '10:00', owner: 'Ali Hassan' },
              { text: 'Assign NH-11 Careem offline', due: '10:30', owner: 'Unassigned' },
              { text: 'Check Delight cancellation cause', due: '11:00', owner: 'Fatima' },
            ].map((t, i) => (
              <div key={i} onClick={() => onNavigate('actions')} style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: 4, padding: '9px 12px', marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = '#F8F7F4'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = '#FFFFFF'}
              >
                <div>
                  <div style={{ fontSize: 12.5, color: '#1A1A18' }}>{t.text}</div>
                  <div style={{ fontSize: 11, color: '#9B9691', marginTop: 2 }}>Owner: {t.owner}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 11, color: '#D97706', fontWeight: 600 }}>Due {t.due}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Hourly sales */}
          <Card style={{ padding: '14px 16px' }}>
            <SectionHeader title="Sales Today vs Yesterday" subtitle="Net food sales by hour · AED · 6 branches" action={() => onNavigate('analytics')} actionLabel="Full analytics" />
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={DAILY_SALES} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="todayGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B3D2F" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1B3D2F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2DDD6" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 9.5, fontFamily: 'var(--font-family-mono)', fill: '#9B9691' }} tickLine={false} axisLine={false} interval={2} />
                <YAxis tick={{ fontSize: 9.5, fontFamily: 'var(--font-family-mono)', fill: '#9B9691' }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} width={30} />
                <Tooltip formatter={(v: any) => [`AED ${(v as number).toLocaleString()}`, '']} contentStyle={{ fontSize: 11.5, fontFamily: 'var(--font-family-mono)', borderColor: '#E2DDD6' }} />
                <Area type="monotone" dataKey="yesterday" stroke="#D4CFC7" strokeWidth={1.5} fill="none" name="Yesterday" dot={false} />
                <Area type="monotone" dataKey="today" stroke="#1B3D2F" strokeWidth={2} fill="url(#todayGrad)" name="Today" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Branch performance */}
          <Card style={{ padding: '14px 16px' }}>
            <SectionHeader title="Branch Performance — MTD" subtitle="Net food sales · AED · Oct 1–15" action={() => onNavigate('analytics')} actionLabel="Drill down" />
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Branch</th>
                    <th>Sales (AED)</th>
                    <th>Orders</th>
                    <th>AOV</th>
                    <th>vs Prior</th>
                    <th>vs Target</th>
                  </tr>
                </thead>
                <tbody>
                  {BRANCH_PERFORMANCE.filter(b => !b.pending).map((b, i) => (
                    <tr key={i} style={{ cursor: 'pointer' }} onClick={() => onNavigate('analytics')}>
                      <td style={{ fontWeight: 600, fontSize: 12.5 }}>{b.branch}</td>
                      <td style={{ fontFamily: 'var(--font-family-mono)', fontSize: 12.5 }}>{b.sales.toLocaleString()}</td>
                      <td style={{ fontFamily: 'var(--font-family-mono)', fontSize: 12.5 }}>{b.orders}</td>
                      <td style={{ fontFamily: 'var(--font-family-mono)', fontSize: 12.5 }}>{b.aov}</td>
                      <td><Change value={b.change} /></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <ProgressBar value={b.sales} max={b.target} height={5} color={b.sales >= b.target * 0.8 ? '#16A34A' : b.sales >= b.target * 0.6 ? '#D97706' : '#DC2626'} />
                          <span style={{ fontSize: 10.5, color: '#9B9691', fontFamily: 'var(--font-family-mono)', minWidth: 28 }}>{Math.round((b.sales / b.target) * 100)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Platform performance */}
      <Card style={{ padding: '14px 16px' }}>
        <SectionHeader title="Platform Performance — MTD" subtitle="Net food sales · AED · Oct 1–15 · 6 branches" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
          {PLATFORM_PERFORMANCE.map((p, i) => (
            <div key={i} style={{ background: '#F8F7F4', borderRadius: 4, padding: '12px 10px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#6B6B65', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.platform}</div>
              <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 15, fontWeight: 700, color: '#1A1A18', marginBottom: 2 }}>AED {(p.sales / 1000).toFixed(1)}k</div>
              <div style={{ fontSize: 11, color: '#9B9691', marginBottom: 4 }}>{p.orders} orders · AOV {p.aov}</div>
              <div style={{ fontSize: 11, color: '#9B9691', marginBottom: 6 }}>{p.share}% share</div>
              <Change value={p.change} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
