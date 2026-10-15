import React, { useState } from 'react';
import { TabBar, Card, SectionHeader, StatusBadge, Btn, Field } from '../components/ui';
import { BRANCHES, PLATFORMS } from '../data/mockData';

const ROLES = [
  { role: 'Administrator', description: 'Full access to all settings and data', canSeeAllBranches: true },
  { role: 'Manager', description: 'All branches, all analytics, campaign approval', canSeeAllBranches: true },
  { role: 'Analyst', description: 'Read-only access to all branches and reports', canSeeAllBranches: true },
  { role: 'Marketing', description: 'Campaigns, reviews, products — all branches', canSeeAllBranches: true },
  { role: 'Finance', description: 'Sales data, reports, contribution — all branches', canSeeAllBranches: true },
  { role: 'Branch Manager', description: 'Own branch only — operations, reviews, tasks', canSeeAllBranches: false },
];

const USERS = [
  { name: 'Yusuf M.', email: 'yusuf@gujratgroup.ae', role: 'Manager', branch: 'All Branches', active: true },
  { name: 'Ali Hassan', email: 'ali@gujratgroup.ae', role: 'Branch Manager', branch: 'Royal Gujrat', active: true },
  { name: 'Fatima Al-Zahra', email: 'fatima@gujratgroup.ae', role: 'Branch Manager', branch: 'Delight Gujrat', active: true },
  { name: 'Sara K.', email: 'sara@gujratgroup.ae', role: 'Marketing', branch: 'All Branches', active: true },
  { name: 'Ibrahim N.', email: 'ibrahim@gujratgroup.ae', role: 'Analyst', branch: 'All Branches', active: false },
];

const HOURS = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '22:00', '23:00', '00:00', '01:00'];

export default function Settings() {
  const [tab, setTab] = useState('branches');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Branch Manager');
  const [thresholdCancel, setThresholdCancel] = useState('10');
  const [thresholdOffline, setThresholdOffline] = useState('30');
  const [zohoCli, setZohoCli] = useState(false);
  const [outlookConn, setOutlookConn] = useState(false);

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TabBar
        tabs={[
          { id: 'branches', label: 'Branches & Platforms' },
          { id: 'hours', label: 'Hours & Cut-off' },
          { id: 'alerts', label: 'Alert Thresholds' },
          { id: 'notifications', label: 'Notifications' },
          { id: 'users', label: 'Users & Roles' },
        ]}
        active={tab} onChange={setTab}
      />

      {tab === 'branches' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SectionHeader title="Branch Configuration" subtitle="Map Grubtech store IDs and platform store URLs to branches" />
          {BRANCHES.filter(b => b.id !== 'all').map(branch => (
            <Card key={branch.id} style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1A1A18' }}>
                  {branch.name}
                  {branch.pending && <span style={{ fontSize: 11, color: '#D97706', marginLeft: 8, fontWeight: 500, background: '#FEF3C7', padding: '2px 6px', borderRadius: 3 }}>⚠ Awaiting configuration</span>}
                </div>
                <Btn label="Edit" variant="ghost" small />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Grubtech Store ID</label>
                  <input defaultValue={branch.pending ? '' : `GTC-${branch.id.toUpperCase()}-001`} placeholder="Not set" disabled={branch.pending} style={{ width: '100%', border: '1px solid #D8D3CC', borderRadius: 4, padding: '6px 10px', fontSize: 12.5, background: branch.pending ? '#F8F7F4' : '#FFFFFF', color: branch.pending ? '#9B9691' : '#1A1A18', fontFamily: 'var(--font-family-mono)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Syrve Location ID</label>
                  <input defaultValue={branch.pending ? '' : `SYR-${branch.id.toUpperCase()}`} placeholder="Not set" disabled={branch.pending} style={{ width: '100%', border: '1px solid #D8D3CC', borderRadius: 4, padding: '6px 10px', fontSize: 12.5, background: branch.pending ? '#F8F7F4' : '#FFFFFF', color: branch.pending ? '#9B9691' : '#1A1A18', fontFamily: 'var(--font-family-mono)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Active platforms</label>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {PLATFORMS.filter(p => p.id !== 'all').map(p => {
                      const active = !branch.pending && ['talabat', 'noon', 'careem', 'deliveroo'].includes(p.id);
                      return (
                        <span key={p.id} style={{ fontSize: 10.5, padding: '2px 6px', borderRadius: 3, background: active ? '#DCFCE7' : '#F3F4F6', color: active ? '#15803D' : '#9B9691', fontWeight: 600 }}>{p.name}</span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'hours' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionHeader title="Operating Hours & Business Day Cut-off" subtitle="Used for scheduling, availability calculations and daily reporting" />
          <Card style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Default business hours (all branches)</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 16 }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} style={{ background: '#F8F7F4', borderRadius: 4, padding: '10px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: '#6B6B65', marginBottom: 8 }}>{day}</div>
                  <select defaultValue="10:00" style={{ fontSize: 11, border: '1px solid #D8D3CC', borderRadius: 3, padding: '3px', width: '100%', marginBottom: 4 }}>
                    {HOURS.map(h => <option key={h}>{h}</option>)}
                  </select>
                  <select defaultValue="23:00" style={{ fontSize: 11, border: '1px solid #D8D3CC', borderRadius: 3, padding: '3px', width: '100%' }}>
                    {HOURS.map(h => <option key={h}>{h}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Business day cut-off time</label>
                <select defaultValue="02:00" style={{ border: '1px solid #D8D3CC', borderRadius: 4, padding: '6px 10px', fontSize: 12.5, background: '#FFFFFF' }}>
                  <option>00:00</option><option>01:00</option><option>02:00</option><option>03:00</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Timezone</label>
                <select defaultValue="Asia/Dubai" style={{ border: '1px solid #D8D3CC', borderRadius: 4, padding: '6px 10px', fontSize: 12.5, background: '#FFFFFF' }}>
                  <option value="Asia/Dubai">UAE / Asia-Dubai (UTC+4)</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
      )}

      {tab === 'alerts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionHeader title="Alert Thresholds" subtitle="Triggers for operational alerts and notifications" />
          <Card style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Cancellation rate alert (%)', key: 'cancel', value: thresholdCancel, setter: setThresholdCancel, note: 'Alert when branch/platform cancellation rate exceeds this value' },
                { label: 'Store offline alert (minutes)', key: 'offline', value: thresholdOffline, setter: setThresholdOffline, note: 'Alert when a store is offline for longer than this duration' },
              ].map((t) => (
                <div key={t.key} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: '1px solid #F0EEE9' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A18', marginBottom: 2 }}>{t.label}</div>
                    <div style={{ fontSize: 12, color: '#9B9691' }}>{t.note}</div>
                  </div>
                  <input
                    type="number"
                    value={t.value}
                    onChange={e => t.setter(e.target.value)}
                    style={{ width: 80, border: '1px solid #D8D3CC', borderRadius: 4, padding: '7px 10px', fontSize: 14, fontFamily: 'var(--font-family-mono)', textAlign: 'center', outline: 'none' }}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <Btn label="Save thresholds" variant="primary" small />
            </div>
          </Card>
        </div>
      )}

      {tab === 'notifications' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionHeader title="Notification Channels" subtitle="Configure where operational alerts are delivered" />
          {[
            {
              name: 'Zoho Cliq', icon: '💬', proposed: true, connected: zohoCli,
              description: 'Send critical alerts and daily brief to a Zoho Cliq channel',
              action: () => setZohoCli(!zohoCli),
            },
            {
              name: 'Microsoft Outlook', icon: '📧', proposed: true, connected: outlookConn,
              description: 'Email daily summary and weekly reports to specified addresses',
              action: () => setOutlookConn(!outlookConn),
            },
          ].map((channel, i) => (
            <Card key={i} style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ fontSize: 28 }}>{channel.icon}</div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1A1A18', display: 'flex', gap: 8, alignItems: 'center' }}>
                    {channel.name}
                    <StatusBadge label={channel.proposed ? 'Proposed' : 'Connected'} color={channel.proposed ? 'blue' : 'green'} size="xs" />
                  </div>
                  <div style={{ fontSize: 12.5, color: '#9B9691', marginTop: 2 }}>{channel.description}</div>
                </div>
              </div>
              <Btn label={channel.connected ? 'Disconnect' : 'Connect'} variant={channel.connected ? 'ghost' : 'primary'} small onClick={channel.action} />
            </Card>
          ))}
          <div style={{ fontSize: 12, color: '#9B9691', padding: '4px 0' }}>
            Notification integrations are proposed connections — configuration requires API credentials from each platform.
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* User list */}
            <div>
              <SectionHeader title="Users" subtitle="Accounts with access to this workspace" />
              <Card>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Branch access</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {USERS.map((u, i) => (
                      <tr key={i}>
                        <td>
                          <div style={{ fontWeight: 600, fontSize: 12.5 }}>{u.name}</div>
                          <div style={{ fontSize: 11, color: '#9B9691' }}>{u.email}</div>
                        </td>
                        <td style={{ fontSize: 12 }}>{u.role}</td>
                        <td style={{ fontSize: 12 }}>{u.branch}</td>
                        <td><StatusBadge label={u.active ? 'Active' : 'Inactive'} color={u.active ? 'green' : 'grey'} size="xs" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
              {/* Invite */}
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="Email address" style={{ flex: 1, border: '1px solid #D8D3CC', borderRadius: 4, padding: '6px 10px', fontSize: 12.5, fontFamily: 'var(--font-family-sans)', outline: 'none' }} />
                <select value={inviteRole} onChange={e => setInviteRole(e.target.value)} style={{ border: '1px solid #D8D3CC', borderRadius: 4, padding: '6px 10px', fontSize: 12.5 }}>
                  {ROLES.map(r => <option key={r.role}>{r.role}</option>)}
                </select>
                <Btn label="Invite" variant="primary" small />
              </div>
            </div>

            {/* Roles */}
            <div>
              <SectionHeader title="Role Permissions" subtitle="What each role can see and do" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {ROLES.map((r, i) => (
                  <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: 4, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A18' }}>{r.role}</div>
                      <div style={{ fontSize: 12, color: '#9B9691', marginTop: 1 }}>{r.description}</div>
                    </div>
                    <StatusBadge
                      label={r.canSeeAllBranches ? 'All branches' : 'Own branch only'}
                      color={r.canSeeAllBranches ? 'green' : 'blue'}
                      size="xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
