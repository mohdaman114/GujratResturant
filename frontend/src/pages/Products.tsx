import React, { useState } from 'react';
import { TabBar, Card, SectionHeader, StatusBadge, Drawer, Field, Btn, PriorityBadge } from '../components/ui';
import { PRODUCTS } from '../data/mockData';
import { Change } from '../components/ui';

const CLASSIFICATION_COLORS: Record<string, { bg: string; text: string }> = {
  Star: { bg: '#FEF9C3', text: '#854D0E' },
  Plowhorse: { bg: '#DBEAFE', text: '#1E40AF' },
  Puzzle: { bg: '#F3E8FF', text: '#6B21A8' },
  Dog: { bg: '#FEE2E2', text: '#991B1B' },
};

const MENU_ISSUES = [
  { id: 1, item: 'Shish Tawook', branch: 'Royal Gujrat', platform: 'Noon', issue: 'Missing image', severity: 'High', status: 'Open' },
  { id: 2, item: 'Shish Tawook', branch: 'All', platform: 'Careem', issue: 'Missing image', severity: 'High', status: 'Open' },
  { id: 3, item: 'Palak Paneer', branch: 'Delight', platform: 'Talabat', issue: 'Missing description', severity: 'Medium', status: 'Open' },
  { id: 4, item: 'Palak Paneer', branch: 'NH-10', platform: 'Noon', issue: 'Missing image', severity: 'Medium', status: 'Open' },
  { id: 5, item: 'Palak Paneer', branch: 'M26', platform: 'Careem', issue: 'Missing image + description', severity: 'High', status: 'Open' },
  { id: 6, item: 'Garlic Naan', branch: 'Mafraq', platform: 'Smiles', issue: 'Incorrect category: Drinks vs Breads', severity: 'Medium', status: 'Assigned' },
  { id: 7, item: 'Dal Makhani', branch: 'All', platform: 'Deliveroo', issue: 'Item marked unavailable — zero sales 7 days', severity: 'High', status: 'Open' },
  { id: 8, item: 'Naan Basket', branch: 'Royal', platform: 'Noon', issue: 'Price mismatch: AED 15 vs approved AED 18', severity: 'High', status: 'Open' },
];

export default function Products({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [tab, setTab] = useState('performance');
  const [selected, setSelected] = useState<typeof PRODUCTS[0] | null>(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('revenue');
  const [selectedIssues, setSelectedIssues] = useState<number[]>([]);

  const filtered = PRODUCTS
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'revenue') return b.revenue - a.revenue;
      if (sortBy === 'growth') return b.growth - a.growth;
      if (sortBy === 'qty') return b.qty - a.qty;
      return 0;
    });

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Menu engineering legend */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#9B9691', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Menu Engineering:</span>
        {Object.entries(CLASSIFICATION_COLORS).map(([k, v]) => (
          <span key={k} style={{ fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 3, background: v.bg, color: v.text }}>
            {k === 'Star' ? '★ ' : k === 'Plowhorse' ? '⬛ ' : k === 'Puzzle' ? '? ' : '✕ '}{k}
          </span>
        ))}
        <span style={{ fontSize: 11, color: '#9B9691', marginLeft: 8 }}>Based on sales volume × revenue. Classification requires verified cost data for full scoring.</span>
      </div>

      <TabBar tabs={[{ id: 'performance', label: 'Product Performance' }, { id: 'audit', label: 'Menu Audit' }]} active={tab} onChange={setTab} />

      {tab === 'performance' && (
        <>
          {/* Controls */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search items..."
              style={{ border: '1px solid #D8D3CC', borderRadius: 4, padding: '6px 10px', fontSize: 12.5, fontFamily: 'var(--font-family-sans)', width: 200, outline: 'none' }}
            />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ border: '1px solid #D8D3CC', borderRadius: 4, padding: '6px 10px', fontSize: 12.5, background: '#F0EEE9' }}>
              <option value="revenue">Sort: Revenue</option>
              <option value="growth">Sort: Growth</option>
              <option value="qty">Sort: Quantity</option>
            </select>
          </div>

          <Card>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Qty Sold</th>
                  <th>Revenue</th>
                  <th>AOV</th>
                  <th>Growth</th>
                  <th>Contribution</th>
                  <th>Classification</th>
                  <th>Issues</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => {
                  const cls = CLASSIFICATION_COLORS[p.classification];
                  return (
                    <tr key={p.id} onClick={() => setSelected(p)} style={{ cursor: 'pointer' }}>
                      <td style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</td>
                      <td style={{ color: '#6B6B65', fontSize: 12 }}>{p.category}</td>
                      <td style={{ fontFamily: 'var(--font-family-mono)', fontSize: 12.5 }}>{p.qty.toLocaleString()}</td>
                      <td style={{ fontFamily: 'var(--font-family-mono)', fontSize: 12.5 }}>AED {p.revenue.toLocaleString()}</td>
                      <td style={{ fontFamily: 'var(--font-family-mono)', fontSize: 12.5 }}>AED {p.aov}</td>
                      <td><Change value={p.growth} /></td>
                      <td style={{ fontFamily: 'var(--font-family-mono)', fontSize: 12 }}>
                        {p.hasCost ? `${p.contribution}%` : <span style={{ fontSize: 11.5, color: '#D97706' }}>Cost data required</span>}
                      </td>
                      <td>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 3, background: cls.bg, color: cls.text }}>
                          {p.classification}
                        </span>
                      </td>
                      <td>
                        {p.issues > 0 ? (
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#DC2626', background: '#FEE2E2', padding: '1px 6px', borderRadius: 3 }}>{p.issues} issue{p.issues > 1 ? 's' : ''}</span>
                        ) : (
                          <span style={{ fontSize: 12, color: '#16A34A' }}>✓</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </>
      )}

      {tab === 'audit' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 4, padding: '6px 12px', fontSize: 12.5, color: '#B91C1C', fontWeight: 600 }}>
              {MENU_ISSUES.filter(i => i.status === 'Open').length} open issues
            </div>
            {selectedIssues.length > 0 && (
              <>
                <Btn label={`Assign ${selectedIssues.length} selected`} variant="primary" small onClick={() => onNavigate('actions')} />
                <Btn label="Clear" variant="ghost" small onClick={() => setSelectedIssues([])} />
              </>
            )}
          </div>

          <Card>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: 30 }}>
                    <input type="checkbox" onChange={e => setSelectedIssues(e.target.checked ? MENU_ISSUES.map(i => i.id) : [])} />
                  </th>
                  <th>Item</th>
                  <th>Branch</th>
                  <th>Platform</th>
                  <th>Issue</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {MENU_ISSUES.map(issue => (
                  <tr key={issue.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIssues.includes(issue.id)}
                        onChange={e => setSelectedIssues(e.target.checked ? [...selectedIssues, issue.id] : selectedIssues.filter(i => i !== issue.id))}
                      />
                    </td>
                    <td style={{ fontWeight: 600 }}>{issue.item}</td>
                    <td style={{ fontSize: 12 }}>{issue.branch}</td>
                    <td style={{ fontSize: 12 }}>{issue.platform}</td>
                    <td style={{ fontSize: 12.5 }}>{issue.issue}</td>
                    <td><PriorityBadge level={issue.severity} /></td>
                    <td><StatusBadge label={issue.status} color={issue.status === 'Open' ? 'red' : 'amber'} /></td>
                    <td>
                      <button onClick={() => onNavigate('actions')} style={{ fontSize: 11.5, color: '#1B3D2F', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        Create task →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}

      {/* Product detail drawer */}
      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ''} width={460}>
        {selected && (
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 9px', borderRadius: 3, background: CLASSIFICATION_COLORS[selected.classification].bg, color: CLASSIFICATION_COLORS[selected.classification].text }}>{selected.classification}</span>
              <span style={{ fontSize: 12, background: '#F0EEE9', color: '#6B6B65', padding: '3px 9px', borderRadius: 3 }}>{selected.category}</span>
            </div>
            <Field label="Revenue (MTD)" value={`AED ${selected.revenue.toLocaleString()}`} mono />
            <Field label="Quantity sold" value={selected.qty.toLocaleString()} mono />
            <Field label="Average order value" value={`AED ${selected.aov}`} mono />
            <Field label="Growth vs prior period" value={<Change value={selected.growth} />} />
            <Field label="Contribution margin" value={selected.hasCost ? `${selected.contribution}%` : <span style={{ color: '#D97706', fontSize: 12 }}>Cost data required — contact finance to upload cost sheet</span>} />
            <div style={{ marginTop: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>Platform listing status</div>
              {['Talabat', 'Noon', 'Careem', 'Deliveroo', 'Keeta', 'Smiles'].map(pl => (
                <div key={pl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #F0EEE9' }}>
                  <span style={{ fontSize: 12.5 }}>{pl}</span>
                  <StatusBadge label={Math.random() > 0.2 ? 'Listed' : 'Missing'} color={Math.random() > 0.2 ? 'green' : 'red'} size="xs" />
                </div>
              ))}
            </div>
            <Btn label="Create menu task" variant="primary" onClick={() => { setSelected(null); onNavigate('actions'); }} />
          </div>
        )}
      </Drawer>
    </div>
  );
}
