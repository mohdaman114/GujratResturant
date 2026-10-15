import React, { useState } from 'react';
import { Card, SectionHeader, StatusBadge, TabBar, Btn, Field } from '../components/ui';

const UPLOAD_HISTORY = [
  { id: 1, file: 'talabat_oct01_15.xlsx', source: 'Talabat', branch: 'All Branches', period: 'Oct 1–15, 2024', uploadedAt: '2024-01-15 08:30', uploadedBy: 'Yusuf M.', status: 'Published', records: 312, accepted: 306, rejected: 4, unmapped: 2, final: true },
  { id: 2, file: 'noon_oct01_15.csv', source: 'Noon', branch: 'All Branches', period: 'Oct 1–15, 2024', uploadedAt: '2024-01-15 08:45', uploadedBy: 'Yusuf M.', status: 'Published', records: 198, accepted: 194, rejected: 2, unmapped: 2, final: false },
  { id: 3, file: 'careem_oct01_15.xlsx', source: 'Careem', branch: 'All Branches', period: 'Oct 1–15, 2024', uploadedAt: '2024-01-15 09:00', uploadedBy: 'Yusuf M.', status: 'Published', records: 142, accepted: 140, rejected: 1, unmapped: 1, final: true },
  { id: 4, file: 'deliveroo_oct01_14.xlsx', source: 'Deliveroo', branch: 'All Branches', period: 'Oct 1–14, 2024', uploadedAt: '2024-01-14 19:00', uploadedBy: 'Yusuf M.', status: 'Provisional', records: 88, accepted: 86, rejected: 1, unmapped: 1, final: false },
  { id: 5, file: 'syrve_export_oct15.xlsx', source: 'Syrve POS', branch: 'Royal Gujrat', period: 'Oct 15, 2024', uploadedAt: '2024-01-15 09:20', uploadedBy: 'Ali Hassan', status: 'Under review', records: 64, accepted: 62, rejected: 0, unmapped: 2, final: false },
];

const CONNECTIONS = [
  { system: 'Syrve POS', type: 'Report upload', status: 'Report upload', note: 'Manual export required from Syrve', lastSync: '2024-01-15 09:20' },
  { system: 'Grubtech', type: 'Report upload', status: 'Report upload', note: 'Integration in progress — partial sync available', lastSync: '2024-01-15 09:44' },
  { system: 'Talabat', type: 'Report upload', status: 'Report upload', note: 'API access not yet established', lastSync: '2024-01-15 08:30' },
  { system: 'Noon', type: 'Report upload', status: 'Report upload', note: 'API access not yet established', lastSync: '2024-01-15 08:45' },
  { system: 'Careem', type: 'Report upload', status: 'Report upload', note: 'API access not yet established', lastSync: '2024-01-15 09:00' },
  { system: 'Deliveroo', type: 'Report upload', status: 'Stale', note: 'Last report covers only Oct 1–14', lastSync: '2024-01-14 19:00' },
  { system: 'Keeta', type: 'Not connected', status: 'Not connected', note: 'No report received yet', lastSync: '—' },
  { system: 'Smiles', type: 'Not connected', status: 'Not connected', note: 'No report received yet', lastSync: '—' },
];

const COVERAGE = [
  { branch: 'Royal Gujrat', talabat: true, noon: true, careem: true, deliveroo: true, keeta: false, smiles: false },
  { branch: 'Gujrat M26', talabat: true, noon: true, careem: 'Stale', deliveroo: true, keeta: false, smiles: false },
  { branch: 'Delight Gujrat', talabat: true, noon: true, careem: true, deliveroo: true, keeta: true, smiles: true },
  { branch: 'Naan House ME-10', talabat: true, noon: true, careem: true, deliveroo: true, keeta: false, smiles: false },
  { branch: 'Naan House ME-11', talabat: true, noon: true, careem: true, deliveroo: true, keeta: true, smiles: false },
  { branch: 'Mafraq Gujrat', talabat: true, noon: true, careem: true, deliveroo: false, keeta: false, smiles: true },
  { branch: 'Branch 7', talabat: false, noon: false, careem: false, deliveroo: false, keeta: false, smiles: false },
  { branch: 'Branch 8', talabat: false, noon: false, careem: false, deliveroo: false, keeta: false, smiles: false },
];

const platforms = ['talabat', 'noon', 'careem', 'deliveroo', 'keeta', 'smiles'];
const platformLabels: Record<string, string> = { talabat: 'Talabat', noon: 'Noon', careem: 'Careem', deliveroo: 'Deliveroo', keeta: 'Keeta', smiles: 'Smiles' };

export default function Reports() {
  const [tab, setTab] = useState('upload');
  const [dragOver, setDragOver] = useState(false);
  const [reviewing, setReviewing] = useState<typeof UPLOAD_HISTORY[0] | null>(null);
  const [selectedHistory, setSelectedHistory] = useState<typeof UPLOAD_HISTORY[0] | null>(null);

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: 4, padding: '8px 14px', fontSize: 12.5, color: '#92400E' }}>
        <strong>Report-based data mode.</strong> All data shown in this application is sourced from manually uploaded reports. API connections are not yet established. Figures marked "provisional" are from incomplete reporting periods.
      </div>

      <TabBar
        tabs={[
          { id: 'upload', label: 'Upload Reports' },
          { id: 'history', label: 'Upload History' },
          { id: 'coverage', label: 'Coverage Checklist' },
          { id: 'connections', label: 'System Connections' },
        ]}
        active={tab} onChange={setTab}
      />

      {tab === 'upload' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Upload area */}
          <Card style={{ padding: '20px' }}>
            <SectionHeader title="Upload Report File" subtitle="Excel (.xlsx) or CSV files from Talabat, Noon, Careem, Deliveroo, Keeta, Smiles, Syrve or Grubtech" />
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); }}
              style={{
                border: `2px dashed ${dragOver ? '#1B3D2F' : '#D8D3CC'}`,
                borderRadius: 6, padding: '40px 20px', textAlign: 'center',
                background: dragOver ? '#F0F9F4' : '#F8F7F4', transition: 'all 0.15s ease', cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>📁</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A18', marginBottom: 6 }}>Drag & drop report file here</div>
              <div style={{ fontSize: 12.5, color: '#9B9691', marginBottom: 16 }}>or click to browse · Supported: .xlsx, .csv · Max 50MB</div>
              <Btn label="Browse files" variant="secondary" />
            </div>

            {/* Upload metadata */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Source system</label>
                <select style={{ width: '100%', border: '1px solid #D8D3CC', borderRadius: 4, padding: '7px 10px', fontSize: 12.5, background: '#FFFFFF' }}>
                  <option>Select source...</option>
                  <option>Talabat</option>
                  <option>Noon</option>
                  <option>Careem</option>
                  <option>Deliveroo</option>
                  <option>Keeta</option>
                  <option>Smiles</option>
                  <option>Syrve POS</option>
                  <option>Grubtech</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Branch</label>
                <select style={{ width: '100%', border: '1px solid #D8D3CC', borderRadius: 4, padding: '7px 10px', fontSize: 12.5, background: '#FFFFFF' }}>
                  <option>All Branches</option>
                  <option>Royal Gujrat</option>
                  <option>Gujrat Restaurant M26</option>
                  <option>Delight Gujrat</option>
                  <option>Naan House ME-10</option>
                  <option>Naan House ME-11</option>
                  <option>Mafraq Gujrat</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Reporting period</label>
                <input type="text" placeholder="e.g. Oct 1–15, 2024" style={{ width: '100%', border: '1px solid #D8D3CC', borderRadius: 4, padding: '7px 10px', fontSize: 12.5, fontFamily: 'var(--font-family-sans)', background: '#FFFFFF', outline: 'none' }} />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, cursor: 'pointer' }}>
                <input type="checkbox" />
                Mark as final (confirmed) report — uncheck if this is a provisional figure
              </label>
            </div>
            <div style={{ marginTop: 12 }}>
              <Btn label="Upload & validate" variant="primary" onClick={() => setReviewing(UPLOAD_HISTORY[0])} />
            </div>
          </Card>

          {/* Validation preview */}
          {reviewing && (
            <Card style={{ padding: '16px 20px' }}>
              <SectionHeader title="Validation Results — Review Before Publishing" subtitle={reviewing.file} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
                {[
                  { label: 'Total records', value: reviewing.records, color: '#1A1A18' },
                  { label: 'Accepted', value: reviewing.accepted, color: '#16A34A' },
                  { label: 'Rejected', value: reviewing.rejected, color: '#DC2626' },
                  { label: 'Unmapped', value: reviewing.unmapped, color: '#D97706' },
                ].map((k, i) => (
                  <div key={i} style={{ background: '#F8F7F4', borderRadius: 4, padding: '10px 12px' }}>
                    <div style={{ fontSize: 10.5, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{k.label}</div>
                    <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 18, fontWeight: 700, color: k.color }}>{k.value}</div>
                  </div>
                ))}
              </div>
              {reviewing.rejected > 0 && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 4, padding: '10px 14px', marginBottom: 12, fontSize: 12.5, color: '#B91C1C' }}>
                  <strong>{reviewing.rejected} rejected records:</strong> Rows 14, 27, 88, 215 — missing required fields (order_id, net_amount). These will be excluded from published data.
                </div>
              )}
              {reviewing.unmapped > 0 && (
                <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: 4, padding: '10px 14px', marginBottom: 12, fontSize: 12.5, color: '#92400E' }}>
                  <strong>{reviewing.unmapped} unmapped items:</strong> "Roti Combo" and "Special Lassi" not found in product master. Map to existing items or add to product list before publishing.
                </div>
              )}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Duplicate check</div>
                <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: 4, padding: '8px 12px', fontSize: 12.5, color: '#15803D' }}>✓ No duplicate order IDs detected</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn label="Publish accepted records" variant="primary" onClick={() => setReviewing(null)} />
                <Btn label="Fix mappings first" variant="secondary" />
                <Btn label="Discard upload" variant="danger" onClick={() => setReviewing(null)} />
              </div>
            </Card>
          )}
        </div>
      )}

      {tab === 'history' && (
        <Card>
          <table className="data-table">
            <thead>
              <tr>
                <th>File</th>
                <th>Source</th>
                <th>Branch</th>
                <th>Period</th>
                <th>Uploaded</th>
                <th>Records</th>
                <th>Status</th>
                <th>Final</th>
              </tr>
            </thead>
            <tbody>
              {UPLOAD_HISTORY.map(u => (
                <tr key={u.id} onClick={() => setSelectedHistory(u)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontSize: 12, fontFamily: 'var(--font-family-mono)' }}>{u.file}</td>
                  <td style={{ fontWeight: 600 }}>{u.source}</td>
                  <td style={{ fontSize: 12 }}>{u.branch}</td>
                  <td style={{ fontFamily: 'var(--font-family-mono)', fontSize: 12 }}>{u.period}</td>
                  <td style={{ fontFamily: 'var(--font-family-mono)', fontSize: 11.5, color: '#9B9691' }}>{u.uploadedAt}<br />{u.uploadedBy}</td>
                  <td>
                    <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 12 }}>{u.records} total</div>
                    <div style={{ fontSize: 11, color: '#16A34A' }}>{u.accepted} ✓</div>
                    {u.rejected > 0 && <div style={{ fontSize: 11, color: '#DC2626' }}>{u.rejected} ✗</div>}
                  </td>
                  <td><StatusBadge label={u.status} color={u.status === 'Published' ? 'green' : u.status === 'Provisional' ? 'amber' : 'blue'} /></td>
                  <td>
                    {u.final
                      ? <StatusBadge label="Final" color="green" size="xs" />
                      : <StatusBadge label="Provisional" color="amber" size="xs" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === 'coverage' && (
        <Card>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #E2DDD6' }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Report Coverage Checklist — Oct 1–15, 2024</div>
            <div style={{ fontSize: 11.5, color: '#9B9691', marginTop: 2 }}>✓ = Report received · ⚠ = Stale / provisional · ✗ = Missing</div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Branch</th>
                  {platforms.map(p => <th key={p}>{platformLabels[p]}</th>)}
                </tr>
              </thead>
              <tbody>
                {COVERAGE.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{row.branch}</td>
                    {platforms.map(p => {
                      const val = (row as any)[p];
                      return (
                        <td key={p} style={{ textAlign: 'center' }}>
                          {val === true && <span style={{ color: '#16A34A', fontSize: 14 }}>✓</span>}
                          {val === 'Stale' && <span style={{ color: '#D97706', fontSize: 13 }}>⚠</span>}
                          {val === false && <span style={{ color: '#DC2626', fontSize: 14 }}>✗</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'connections' && (
        <div>
          <div style={{ background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: 4, padding: '10px 14px', marginBottom: 12, fontSize: 12.5, color: '#1D4ED8' }}>
            Connection cards show the current data method — Report upload means data is manually imported. API connections are not yet established for any platform.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {CONNECTIONS.map((c, i) => (
              <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: 5, padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A18' }}>{c.system}</div>
                  <StatusBadge
                    label={c.status}
                    color={c.status === 'Report upload' ? 'blue' : c.status === 'Stale' ? 'amber' : 'grey'}
                    size="xs"
                  />
                </div>
                <div style={{ fontSize: 12, color: '#9B9691', lineHeight: 1.5, marginBottom: 8 }}>{c.note}</div>
                <div style={{ fontSize: 11, color: '#B8B2A8', fontFamily: 'var(--font-family-mono)' }}>Last data: {c.lastSync}</div>
                {c.status !== 'Not connected' && (
                  <div style={{ marginTop: 10 }}>
                    <Btn label="Upload report" variant="secondary" small />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
