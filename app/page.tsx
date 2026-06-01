'use client'

import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) window.location.href = '/dashboard'
    }
    checkUser()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)' }}>

      <div style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #0a0907 0%, #111008 40%, #0d1209 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(74,124,89,0.08) 0%, transparent 60%)',
        }} />

        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '80px 80px 80px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', width: '100%' }}>

          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '3px', color: 'var(--gold-dim)', textTransform: 'uppercase' as const, marginBottom: '24px' }}>
              Reap What You Sow.
            </div>

            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: '600', color: 'var(--white)', lineHeight: '1.05', marginBottom: '24px' }}>
              Freedom through<br />
              <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>discipline.</span>
            </h1>

            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', maxWidth: '440px', marginBottom: '40px', fontWeight: '300' }}>
              Beans is the all-in-one platform to learn, practice, invest, and build real wealth — together as a community of stewards.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '48px' }}>
              <a href="/auth" style={{ background: 'var(--green)', color: 'var(--white)', padding: '12px 28px', borderRadius: '6px', fontWeight: '500', fontSize: '14px', textDecoration: 'none' }}>
                Get Started Free
              </a>
              <a href="/learn" style={{ background: 'transparent', color: 'var(--text-muted)', padding: '12px 28px', borderRadius: '6px', fontWeight: '500', fontSize: '14px', textDecoration: 'none', border: '1px solid var(--border)' }}>
                See How It Works
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '12px' }}>
              <span>No credit card required. Start your journey today.</span>
            </div>
          </div>

          <div style={{ position: 'relative', height: '500px', borderRadius: '12px', overflow: 'hidden', background: 'linear-gradient(160deg, #1a2a1e 0%, #0f1a12 50%, #080f0a 100%)', border: '1px solid var(--border)' }}>
            <div style={{ position: 'absolute', top: '24px', right: '24px', textAlign: 'right' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'rgba(201,168,76,0.4)', marginBottom: '4px', textTransform: 'uppercase' as const }}>Discipline</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'rgba(201,168,76,0.3)', marginBottom: '4px', textTransform: 'uppercase' as const }}>Freedom</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'rgba(201,168,76,0.2)', marginBottom: '4px', textTransform: 'uppercase' as const }}>Wealth</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'rgba(201,168,76,0.15)', textTransform: 'uppercase' as const }}>Legacy</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '60px', paddingBottom: '20px' }}>
              <svg viewBox="0 0 160 200" width="160" height="200" fill="none">
                <ellipse cx="80" cy="130" rx="36" ry="50" fill="#2d4a35" />
                <ellipse cx="80" cy="85" rx="30" ry="40" fill="#2d4a35" />
                <ellipse cx="80" cy="105" rx="34" ry="42" fill="#2d4a35" />
                <ellipse cx="80" cy="68" rx="26" ry="30" fill="#3d5e45" />
                <ellipse cx="80" cy="55" rx="22" ry="26" fill="#3d5e45" />
                <ellipse cx="80" cy="62" rx="25" ry="28" fill="#3d5e45" />
                <ellipse cx="68" cy="52" rx="8" ry="10" fill="rgba(255,255,255,0.06)" />
                <ellipse cx="80" cy="36" rx="24" ry="7" fill="#1a2a1e" />
                <rect x="60" y="20" width="40" height="18" rx="4" fill="#1f3028" />
                <rect x="60" y="32" width="40" height="3" fill="rgba(201,168,76,0.3)" />
                <circle cx="72" cy="65" r="3" fill="#0f1a0f" />
                <circle cx="88" cy="65" r="3" fill="#0f1a0f" />
                <circle cx="73" cy="64" r="1" fill="rgba(255,255,255,0.4)" />
                <circle cx="89" cy="64" r="1" fill="rgba(255,255,255,0.4)" />
                <path d="M74 74 Q80 78 86 74" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <ellipse cx="80" cy="92" rx="28" ry="8" fill="#3a5a42" />
                <rect x="108" y="110" width="14" height="20" rx="3" fill="#8a6030" />
                <rect x="110" y="112" width="10" height="16" rx="2" fill="rgba(255,200,80,0.3)" />
                <ellipse cx="115" cy="110" rx="7" ry="3" fill="#6a4820" />
                <ellipse cx="115" cy="130" rx="7" ry="3" fill="#6a4820" />
                <path d="M115 108 L115 102" stroke="#6a4820" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="115" cy="120" rx="20" ry="25" fill="rgba(255,180,60,0.06)" />
                <rect x="34" y="115" width="20" height="26" rx="2" fill="#5a3a20" />
                <rect x="36" y="117" width="16" height="22" rx="1" fill="#6a4a28" />
                <line x1="38" y1="121" x2="50" y2="121" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="38" y1="125" x2="50" y2="125" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <ellipse cx="68" cy="178" rx="12" ry="5" fill="#1a2a1e" />
                <ellipse cx="92" cy="178" rx="12" ry="5" fill="#1a2a1e" />
                <ellipse cx="80" cy="182" rx="30" ry="6" fill="rgba(0,0,0,0.3)" />
              </svg>
            </div>

            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
              <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', borderRadius: '6px', padding: '10px 14px', border: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  "The years will pass anyway. The question is what you build with them."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--deep)', padding: '14px 60px', display: 'flex', alignItems: 'center', gap: '48px', overflowX: 'auto' as const }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase' as const, flexShrink: 0 }}>Market Snapshot</span>
        {[
          { symbol: 'S&P 500', value: '5,278.40', change: '+0.71%', up: true },
          { symbol: 'NASDAQ', value: '16,735.02', change: '+1.12%', up: true },
          { symbol: 'DOW JONES', value: '39,869.38', change: '+0.38%', up: true },
          { symbol: 'GOLD', value: '2,344.70', change: '+0.28%', up: true },
          { symbol: 'VIX', value: '12.31', change: '-0.85%', up: false },
        ].map(item => (
          <div key={item.symbol} style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '1px', color: 'var(--text-dim)', textTransform: 'uppercase' as const }}>{item.symbol}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--text)' }}>{item.value}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: item.up ? 'var(--green-light)' : 'var(--red-light)' }}>{item.change}</span>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '3px', color: 'var(--gold-dim)', textTransform: 'uppercase' as const, marginBottom: '16px' }}>Built on Three Foundations</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '600', color: 'var(--white)', marginBottom: '12px' }}>Learn. Practice. Own.</h2>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold-dim)', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            { label: 'LEARN', title: 'Master the markets.', desc: 'Structured lessons, real-world insights, and timeless principles. From the basics to advanced strategy.', cta: 'Start Learning', href: '/learn' },
            { label: 'PRACTICE', title: 'Sharpen your skills.', desc: 'A risk-free simulation with realistic markets. Build your strategy. Test your discipline. No real money.', cta: 'Start Practicing', href: '/play' },
            { label: 'OWN', title: 'Build something real.', desc: 'Found companies. Invest in others. Trade the Exchange Hall. Build lasting wealth in a steward-driven economy.', cta: 'Enter Exchange Hall', href: '/exchange' },
          ].map(pillar => (
            <div key={pillar.label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ height: '140px', background: 'linear-gradient(160deg, #1a2a1e 0%, #0f1a12 60%, #080f0a 100%)', borderBottom: '1px solid var(--border)' }} />
              <div style={{ padding: '24px' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--gold-dim)', textTransform: 'uppercase' as const, marginBottom: '8px' }}>{pillar.label}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: '600', color: 'var(--white)', marginBottom: '10px' }}>{pillar.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.7', marginBottom: '20px' }}>{pillar.desc}</p>
                <a href={pillar.href} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '1px', color: 'var(--gold)', textDecoration: 'none' }}>{pillar.cta} →</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--deep)', borderTop: '1px solid var(--border)', padding: '60px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '600', color: 'var(--white)', marginBottom: '16px' }}>
          A community of builders,<br />not gamblers.
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '480px', margin: '0 auto 32px', lineHeight: '1.8' }}>
          Beans is built for people who think in decades, not days. Long-term thinking over short-term hype.
        </p>
        <a href="/auth" style={{ background: 'var(--green)', color: 'var(--white)', padding: '14px 36px', borderRadius: '6px', fontWeight: '500', fontSize: '14px', textDecoration: 'none' }}>
          Begin Your Journey
        </a>
      </div>

      <div style={{ padding: '32px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)' }}>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '13px', color: 'var(--text-muted)' }}>BEANS Trading Co.</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase' as const }}>Reap What You Sow</span>
        <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>© 2025 Dean Industries</span>
      </div>

    </div>
  )
}