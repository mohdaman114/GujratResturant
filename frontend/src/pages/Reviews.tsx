import React, { useState } from 'react';
import { Card, SectionHeader, StatusBadge, Drawer, Field, Btn } from '../components/ui';
import { REVIEWS } from '../data/mockData';

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: rating >= 4 ? '#D97706' : rating >= 3 ? '#9B9691' : '#DC2626', fontFamily: 'var(--font-family-mono)', letterSpacing: 1 }}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  );
}

const THEMES = ['All', 'Positive', 'Delivery Issue', 'Wrong Order', 'Packaging', 'Food Quality'];

export default function Reviews({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selected, setSelected] = useState<typeof REVIEWS[0] | null>(null);
  const [filterRating, setFilterRating] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterTheme, setFilterTheme] = useState('All');
  const [draft, setDraft] = useState('');
  const [draftReady, setDraftReady] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const filtered = REVIEWS.filter(r => {
    if (filterRating !== 'All' && r.rating.toString() !== filterRating) return false;
    if (filterStatus !== 'All' && r.status !== filterStatus) return false;
    if (filterTheme !== 'All' && r.theme !== filterTheme) return false;
    return true;
  });

  const negative = REVIEWS.filter(r => r.rating <= 2).length;
  const pending = REVIEWS.filter(r => r.status === 'Pending').length;

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
        {[
          { label: 'Total Reviews', value: REVIEWS.length.toString(), sub: 'Last 7 days' },
          { label: 'Avg Rating', value: '3.5★', sub: 'All branches/platforms' },
          { label: 'Pending Response', value: pending.toString(), sub: 'Require reply', alert: true },
          { label: 'Negative (<3★)', value: negative.toString(), sub: 'Require attention', alert: true },
          { label: 'Replied', value: REVIEWS.filter(r => r.status === 'Replied').length.toString(), sub: 'Manager approved' },
        ].map((k, i) => (
          <div key={i} style={{ background: '#FFFFFF', border: `1px solid ${k.alert ? '#FCA5A5' : '#E2DDD6'}`, borderRadius: 5, padding: '12px 14px' }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{k.label}</div>
            <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 22, fontWeight: 700, color: k.alert ? '#DC2626' : '#1A1A18', marginBottom: 2 }}>{k.value}</div>
            <div style={{ fontSize: 11, color: '#9B9691' }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <select value={filterRating} onChange={e => setFilterRating(e.target.value)} style={{ border: '1px solid #D8D3CC', borderRadius: 4, padding: '5px 8px', fontSize: 12.5, background: '#F0EEE9' }}>
          <option value="All">All ratings</option>
          {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n}★</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ border: '1px solid #D8D3CC', borderRadius: 4, padding: '5px 8px', fontSize: 12.5, background: '#F0EEE9' }}>
          <option value="All">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Replied">Replied</option>
        </select>
        <select value={filterTheme} onChange={e => setFilterTheme(e.target.value)} style={{ border: '1px solid #D8D3CC', borderRadius: 4, padding: '5px 8px', fontSize: 12.5, background: '#F0EEE9' }}>
          {THEMES.map(t => <option key={t}>{t}</option>)}
        </select>
        <span style={{ fontSize: 11.5, color: '#9B9691', marginLeft: 4 }}>{filtered.length} review{filtered.length !== 1 ? 's' : ''} shown</span>
      </div>

      {/* Review list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(review => (
          <div
            key={review.id}
            onClick={() => { setSelected(review); setDraft(review.suggested || ''); }}
            style={{
              background: '#FFFFFF', border: `1px solid ${review.rating <= 2 ? '#FCA5A5' : '#E2DDD6'}`,
              borderLeft: `3px solid ${review.rating >= 4 ? '#16A34A' : review.rating >= 3 ? '#D97706' : '#DC2626'}`,
              borderRadius: 5, padding: '12px 16px', cursor: 'pointer',
              display: 'grid', gridTemplateColumns: '1fr auto',
              gap: 12, alignItems: 'start',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                <Stars rating={review.rating} />
                <span style={{ fontSize: 12.5, fontWeight: 600, color: '#1A1A18' }}>{review.author}</span>
                <span style={{ fontSize: 11.5, color: '#9B9691' }}>{review.branch} · {review.platform}</span>
                <span style={{ fontSize: 10.5, color: '#B8B2A8', fontFamily: 'var(--font-family-mono)' }}>{review.date}</span>
              </div>
              <p style={{ fontSize: 12.5, color: '#3D3D38', margin: 0, lineHeight: 1.5 }}>{review.text}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                <StatusBadge label={review.theme} color={review.theme === 'Positive' ? 'green' : review.theme.includes('Issue') || review.theme === 'Wrong Order' ? 'red' : 'amber'} size="xs" />
                {review.product && <span style={{ fontSize: 11, background: '#F0EEE9', color: '#6B6B65', padding: '1px 7px', borderRadius: 3 }}>{review.product}</span>}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <StatusBadge label={review.status} color={review.status === 'Pending' ? 'amber' : 'green'} />
              {submitted[review.id] && <StatusBadge label="Submitted" color="green" size="xs" />}
            </div>
          </div>
        ))}
      </div>

      {/* Review detail drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.rating}★ · ${selected.author}` : ''}
        width={500}
      >
        {selected && (
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              <Stars rating={selected.rating} />
              <StatusBadge label={selected.theme} color={selected.theme === 'Positive' ? 'green' : 'red'} />
            </div>
            <Field label="Branch" value={selected.branch} />
            <Field label="Platform" value={selected.platform} />
            <Field label="Date" value={selected.date} mono />
            {selected.product && <Field label="Related product" value={selected.product} />}

            {/* Review text */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Review</div>
              <div style={{ background: '#F8F7F4', borderRadius: 4, padding: '10px 12px', fontSize: 13, color: '#1A1A18', lineHeight: 1.6, fontStyle: 'italic' }}>
                "{selected.text}"
              </div>
            </div>

            {/* AI suggested reply */}
            {selected.status === 'Pending' && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>AI Suggested Reply <span style={{ color: '#D97706', textTransform: 'none', fontWeight: 400 }}>— edit before submitting</span></div>
                <textarea
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  rows={5}
                  style={{ width: '100%', border: '1px solid #D8D3CC', borderRadius: 4, padding: '10px 12px', fontSize: 12.5, fontFamily: 'var(--font-family-sans)', lineHeight: 1.6, resize: 'vertical', outline: 'none', color: '#1A1A18' }}
                />
                <div style={{ fontSize: 11, color: '#9B9691', marginTop: 4 }}>Replies are saved as draft until a manager approves. Do not promise refunds or compensation without authorisation.</div>
              </div>
            )}

            {selected.status === 'Replied' && (
              <div style={{ marginBottom: 16, padding: '10px 12px', background: '#DCFCE7', borderRadius: 4, fontSize: 12.5, color: '#15803D' }}>
                ✓ Response already submitted via {selected.platform}
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 12, borderTop: '1px solid #E2DDD6' }}>
              {selected.status === 'Pending' && (
                <>
                  <Btn label="Submit for approval" variant="primary" small onClick={() => { setSubmitted({ ...submitted, [selected.id]: true }); setSelected(null); }} />
                  <Btn label="Save draft" variant="secondary" small />
                </>
              )}
              <Btn label="Create task" variant="ghost" small onClick={() => { setSelected(null); onNavigate('actions'); }} />
            </div>

            {/* Internal notes */}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: '#9B9691', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Internal notes</div>
              <textarea placeholder="Add internal note (not sent to customer)..." rows={2} style={{ width: '100%', border: '1px solid #D8D3CC', borderRadius: 4, padding: '8px 10px', fontSize: 12, fontFamily: 'var(--font-family-sans)', outline: 'none', resize: 'none' }} />
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
