export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)' }}>

      {/* HERO */}
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
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '3px', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: '24px' }}>
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
                See How It Works ▷
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '12px' }}>
              <span>🛡</span>
              <span>No credit card required. Start your journey today.</span>
            </div>
          </div>

          <div style={{ position: 'relative', height: '500px', borderRadius: '12px', overflow: 'hidden', background: 'linear-gradient(160deg, #1a2a1e 0%, #0f1a12 50%, #080f0a 100%)', border: '1px solid var(--border)' }}>
            <div style={{ position: 'absolute', top: '24px', right: '24px', textAlign: 'right' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '4px', textTransform: 'uppercase' }}>Spring, Year 1</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: 'var(--text-dim)' }}>68°F · Clear</div>
            </div>

            <div style={{ position: 'absolute', top: '20px', left: '24px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>Discipline</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>Freedom</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>Wealth</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Legacy</div>
            </div>

            <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)' }}>
              <svg viewBox="0 0 120 140" width="120" height="140" fill="none">
                <ellipse cx="60" cy="90" rx="38" ry="44" fill="#3d5e45" />
                <ellipse cx="60" cy="55" rx="32" ry="38" fill="#3d5e45" />
                <ellipse cx="60" cy="70" rx="36" ry="40" fill="#3d5e45" />
                <ellipse cx="60" cy="70" rx="36" ry="40" fill="url(#heroShade)" />
                <ellipse cx="48" cy="52" rx="10" ry="13" fill="rgba(255,255,255,0.06)" />
                <circle cx="50" cy="62" r="4" fill="#1a1a14" />
                <circle cx="70" cy="62" r="4" fill="#1a1a14" />
                <circle cx="51.5" cy="60.5" r="1.5" fill="rgba(255,255,255,0.4)" />
                <circle cx="71.5" cy="60.5" r="1.5" fill="rgba(255,255,255,0.4)" />
                <path d="M46 80 Q60 90 74 80" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
                <rect x="30" y="20" width="20" height="14" rx="3" fill="#2a1f0a" />
                <rect x="30" y="20" width="20" height="4" rx="1" fill="#3a2a0a" />
                <rect x="18" y="32" width="44" height="5" rx="2" fill="#2a1f0a" />
                <line x1="36" y1="25" x2="44" y2="25" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <ellipse cx="90" cy="95" rx="6" ry="10" fill="#8a6030" />
                <ellipse cx="90" cy="85" rx="5" ry="6" fill="#7a5020" />
                <ellipse cx="90" cy="90" rx="4" ry="3" fill="#c9a84c" opacity="0.8" />
                <defs>
                  <radialGradient id="heroShade" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
                  </radialGradient>
                </defs>
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

      {/* MARKET SNAPSHOT */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--deep)', padding: '14px 60px', display: 'flex', alignItems: 'center', gap: '48px', overflowX: 'auto' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase', flexShrink: 0 }}>Market Snapshot</span>
        {[
          { symbol: 'S&P 500', value: '5,278.40', change: '+0.71%', up: true },
          { symbol: 'NASDAQ', value: '16,735.02', change: '+1.12%', up: true },
          { symbol: 'DOW JONES', value: '39,869.38', change: '+0.38%', up: true },
          { symbol: 'GOLD', value: '2,344.70', change: '+0.28%', up: true },
          { symbol: 'VIX', value: '12.31', change: '-0.85%', up: false },
        ].map(item => (
          <div key={item.symbol} style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '1px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{item.symbol}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--text)' }}>{item.value}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: item.up ? 'var(--green-light)' : 'var(--red-light)' }}>{item.change}</span>
          </div>
        ))}
      </div>

      {/* THREE PILLARS */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '3px', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: '16px' }}>Built on Three Foundations</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '600', color: 'var(--white)', marginBottom: '12px' }}>Learn. Practice. Own.</h2>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold-dim)', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            { label: 'LEARN', title: 'Master the markets.', desc: 'Structured lessons, real-world insights, and timeless principles. From the basics to advanced strategy.', cta: 'Start Learning →', href: '/learn', img: '📖' },
            { label: 'PRACTICE', title: 'Sharpen your skills.', desc: 'A risk-free simulation with realistic markets. Build your strategy. Test your discipline. No real money.', cta: 'Start Practicing →', href: '/play', img: '◎' },
            { label: 'OWN', title: 'Build something real.', desc: 'Found companies. Invest in others. Trade the Exchange. Build lasting wealth in a player-driven economy.', cta: 'Enter the Exchange →', href: '/exchange', img: '⇄' },
          ].map(pillar => (
            <div key={pillar.label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ height: '160px', background: 'linear-gradient(160deg, #1a2a1e 0%, #0f1a12 60%, #080f0a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', borderBottom: '1px solid var(--border)' }}>
                {pillar.img}
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>{pillar.label}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: '600', color: 'var(--white)', marginBottom: '10px' }}>{pillar.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.7', marginBottom: '20px' }}>{pillar.desc}</p>
                <a href={pillar.href} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '1px', color: 'var(--gold)', textDecoration: 'none' }}>{pillar.cta}</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMMUNITY STATEMENT */}
      <div style={{ background: 'var(--deep)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '80px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: '600', color: 'var(--white)', marginBottom: '16px', lineHeight: '1.2' }}>
              A community of builders,<br />not gamblers.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.8' }}>
              Beans is built for people who think in decades, not days. For those who understand that real wealth is built through discipline, patience, and consistent stewardship over time.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { icon: '◈', title: 'Built for everyone.', desc: 'From first-time learners to seasoned investors.' },
              { icon: '🛡', title: 'Built on trust.', desc: 'Transparent systems. Real-time data.' },
              { icon: '⟳', title: 'Built for the future.', desc: 'Long-term thinking over short-term hype.' },
              { icon: '◉', title: 'Built to last.', desc: 'Your journey. Your legacy. Your freedom.' },
            ].map(item => (
              <div key={item.title} style={{ padding: '16px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                <div style={{ fontSize: '16px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '13px', color: 'var(--white)', marginBottom: '4px' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: '40px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <ellipse cx="12" cy="15" rx="7" ry="8" fill="#4a7c59" />
            <ellipse cx="12" cy="9" rx="6" ry="7" fill="#4a7c59" />
          </svg>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '13px', color: 'var(--text-muted)' }}>BEANS Trading Co.</span>
        </div>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Reap What You Sow</span>
        <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>© 2025 Dean Industries</span>
      </div>

    </div>
  )
}