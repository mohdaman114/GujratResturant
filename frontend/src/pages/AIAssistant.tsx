import React, { useState, useRef, useEffect } from 'react';
import { Btn, StatusBadge } from '../components/ui';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  answer?: {
    period?: string;
    evidence?: string[];
    facts?: string[];
    hypotheses?: string[];
    missing?: string[];
    actions?: string[];
    confidence?: string;
  };
}

const SUGGESTED_QUESTIONS = [
  'What should I fix today?',
  'Why did Naan House sales decline?',
  'Compare Royal Gujrat with last month',
  'Which products need better images?',
  'Which campaign improved contribution?',
  'What actions will help us reach AED 500,000?',
];

const CANNED_RESPONSES: Record<string, Message['answer']> = {
  'What should I fix today?': {
    period: 'As of 09:44 UAE/Asia-Dubai — 15 Jan 2024',
    facts: [
      'Royal Gujrat / Keeta: offline since 07:10 — 2h 35m with no orders, est. AED 1,200 revenue at risk',
      'Naan House ME-11 / Careem: offline since 08:30, no acknowledgement from branch team',
      'Delight Gujrat / Deliveroo: cancellation rate at 18% (threshold: 10%) since 08:55',
      'Royal Gujrat / Noon: menu sync failure — 3 items unpriced (Chicken Biryani, Lamb Karahi, Naan Basket)',
    ],
    evidence: ['Operations Monitor · Grubtech sync log · 09:44', 'Task board · 4 open critical items'],
    actions: [
      'Assign Ali Hassan to Keeta offline issue immediately',
      'Contact Naan House ME-11 branch manager for Careem offline',
      'Call Delight Gujrat to investigate cancellation spike',
      'Escalate Noon menu sync to Grubtech support',
    ],
    missing: ['B7 and B8 not yet configured — excluded', 'M26/Careem sync stale since 06:20'],
    confidence: 'High — all issues confirmed by Grubtech sync, not inferred',
  },
  'Why did Naan House sales decline?': {
    period: 'NH-10 and NH-11 · MTD Oct 1–15 vs same days Sep 1–15',
    facts: [
      'NH-10 MTD: AED 42,200 (+5.6% vs prior period) — not a decline',
      'NH-11 MTD: AED 38,900 (+14.8% vs prior period) — strong growth',
      'Naan House branches are actually outperforming the group average',
    ],
    hypotheses: [
      'The question may refer to a specific day or platform not visible in current date filter',
      'NH-10 Noon is scheduled closed until 12:00 — may affect morning comparisons',
    ],
    missing: [
      'Which specific time period or platform is being compared?',
      'Are you comparing to a different period or weekday?',
      'No cost data — contribution trend unavailable',
    ],
    evidence: ['Sales Analytics · Branch tab · MTD comparison'],
    actions: ['Adjust the date filter in Sales Analytics to the specific period', 'Check NH-10 Noon scheduled hours if morning sales are the concern'],
    confidence: 'Low — the premise may not match current data. Please specify the time period.',
  },
  'Which products need better images?': {
    period: 'Menu Audit · All branches · All platforms · as of 09:44',
    facts: [
      'Shish Tawook: missing image on Noon and Careem (growing 34.6% — high priority)',
      'Palak Paneer: missing image on 3 platforms (Talabat-Delight, Noon-NH10, Careem-M26)',
      'Garlic Naan: missing image on Smiles-Mafraq (low priority)',
    ],
    evidence: ['Menu Audit · Products & Menu screen · 8 open issues total'],
    actions: [
      'Assign Shish Tawook images to Marketing team — high ROAS item',
      'Palak Paneer images needed on 3 branches — bundle task',
      'Use approved product photography per brand standards',
    ],
    missing: ['Not all platforms provide image upload via API — some may require manual portal upload'],
    confidence: 'High — confirmed by menu sync audit',
  },
};

function getResponse(question: string): { text: string; answer: Message['answer'] } {
  const key = Object.keys(CANNED_RESPONSES).find(k => question.toLowerCase().includes(k.toLowerCase().split(' ').slice(1, 4).join(' ')));
  if (key && CANNED_RESPONSES[key]) {
    return {
      text: `Here's what I found based on current data:`,
      answer: CANNED_RESPONSES[key],
    };
  }
  // Default response for unknown questions
  return {
    text: 'I don\'t have enough data to answer this with confidence.',
    answer: {
      missing: [
        'This question requires data that hasn\'t been uploaded yet',
        'Consider uploading the relevant report in Reports & Data',
        'Or rephrase the question with a specific branch, platform, or time period',
      ],
      confidence: 'Insufficient data — cannot provide a reliable answer',
      actions: ['Upload the relevant report file in Reports & Data', 'Try a more specific version of this question'],
    },
  };
}

export default function AIAssistant({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'assistant',
      text: 'Hello. I can answer questions about your branches, sales, operations, and menu performance — based on uploaded reports and synced data. Ask me anything, or pick a suggested question.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function send(question: string) {
    if (!question.trim() || loading) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text: question };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const r = getResponse(question);
      const assistantMsg: Message = { id: Date.now() + 1, role: 'assistant', text: r.text, answer: r.answer };
      setMessages(m => [...m, assistantMsg]);
      setLoading(false);
    }, 800);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '20px 24px', gap: 0 }}>
      <div style={{ fontSize: 11, color: '#9B9691', marginBottom: 12, padding: '8px 12px', background: '#FFFBEB', borderRadius: 4, border: '1px solid #FCD34D' }}>
        AI responses are based on uploaded report data and Grubtech sync — not live connections. Always verify with source systems before acting.
      </div>

      {/* Suggested questions */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {SUGGESTED_QUESTIONS.map(q => (
          <button
            key={q}
            onClick={() => send(q)}
            style={{
              fontSize: 12, padding: '5px 10px', borderRadius: 4, border: '1px solid #D8D3CC',
              background: '#FFFFFF', color: '#1B3D2F', cursor: 'pointer', fontFamily: 'var(--font-family-sans)',
              transition: 'all 0.1s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F0EEE9'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FFFFFF'; }}
          >{q}</button>
        ))}
      </div>

      {/* Chat */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 16, minHeight: 0 }}>
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              gap: 10,
            }}
          >
            {msg.role === 'assistant' && (
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1B3D2F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <svg width="13" height="13" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="3" stroke="#B8952A" strokeWidth="1.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="#B8952A" strokeWidth="1.4"/></svg>
              </div>
            )}
            <div style={{ maxWidth: '72%' }}>
              <div style={{
                background: msg.role === 'user' ? '#1B3D2F' : '#FFFFFF',
                color: msg.role === 'user' ? '#FFFFFF' : '#1A1A18',
                border: msg.role === 'assistant' ? '1px solid #E2DDD6' : 'none',
                borderRadius: msg.role === 'user' ? '10px 10px 2px 10px' : '2px 10px 10px 10px',
                padding: '10px 14px',
                fontSize: 13,
                lineHeight: 1.6,
              }}>
                {msg.text}
              </div>
              {msg.answer && (
                <div style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: '2px 10px 10px 10px', padding: '14px 16px', marginTop: 4, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {msg.answer.period && (
                    <div style={{ fontSize: 10.5, fontFamily: 'var(--font-family-mono)', color: '#9B9691', borderBottom: '1px solid #F0EEE9', paddingBottom: 8 }}>Period: {msg.answer.period}</div>
                  )}
                  {msg.answer.facts && (
                    <div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Observed facts</div>
                      {msg.answer.facts.map((f, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                          <span style={{ color: '#16A34A', marginTop: 1, flexShrink: 0 }}>✓</span>
                          <span style={{ fontSize: 12.5, color: '#1A1A18', lineHeight: 1.5 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {msg.answer.hypotheses && (
                    <div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Possible causes (hypotheses)</div>
                      {msg.answer.hypotheses.map((h, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                          <span style={{ color: '#D97706', marginTop: 1, flexShrink: 0 }}>?</span>
                          <span style={{ fontSize: 12.5, color: '#3D3D38', lineHeight: 1.5, fontStyle: 'italic' }}>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {msg.answer.actions && (
                    <div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: '#1B3D2F', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Recommended actions</div>
                      {msg.answer.actions.map((a, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
                          <span style={{ color: '#1B3D2F', fontSize: 11, marginTop: 2, flexShrink: 0 }}>→</span>
                          <span style={{ fontSize: 12.5, color: '#1A1A18', lineHeight: 1.5, flex: 1 }}>{a}</span>
                          <button onClick={() => onNavigate('actions')} style={{ fontSize: 11, color: '#B8952A', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', padding: 0 }}>Create task</button>
                        </div>
                      ))}
                    </div>
                  )}
                  {msg.answer.evidence && (
                    <div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: '#6B6B65', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Evidence</div>
                      {msg.answer.evidence.map((e, i) => (
                        <div key={i} style={{ fontSize: 12, color: '#9B9691', fontFamily: 'var(--font-family-mono)', marginBottom: 3 }}>{e}</div>
                      ))}
                    </div>
                  )}
                  {msg.answer.missing && (
                    <div style={{ background: '#FFFBEB', borderRadius: 4, padding: '8px 10px' }}>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 5 }}>Missing data / limitations</div>
                      {msg.answer.missing.map((m, i) => (
                        <div key={i} style={{ fontSize: 12, color: '#92400E', lineHeight: 1.5, marginBottom: 2 }}>• {m}</div>
                      ))}
                    </div>
                  )}
                  {msg.answer.confidence && (
                    <div style={{ fontSize: 11, color: '#9B9691', borderTop: '1px solid #F0EEE9', paddingTop: 8 }}>
                      Confidence: {msg.answer.confidence}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1B3D2F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="3" stroke="#B8952A" strokeWidth="1.5"/></svg>
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: '2px 10px 10px 10px', padding: '10px 14px' }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4CFC7', animation: `pulse 1s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid #E2DDD6' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
          placeholder="Ask about your sales, operations, or menu..."
          style={{
            flex: 1, border: '1px solid #D8D3CC', borderRadius: 6, padding: '10px 14px',
            fontSize: 13, fontFamily: 'var(--font-family-sans)', outline: 'none',
            background: '#FFFFFF', color: '#1A1A18',
          }}
        />
        <Btn label="Send" variant="primary" onClick={() => send(input)} />
      </div>
    </div>
  );
}
