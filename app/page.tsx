export default function Home() {
  return (
    <div>
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(61,190,108,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(61,190,108,0.08)', border: '1px solid #1f6e3a',
          borderRadius: '20px', padding: '6px 16px', marginBottom: '32px'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3dbe6c', display: 'inline-block' }} />
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '2px', color: '#3dbe6c', textTransform: 'uppercase' as const }}>Now in Development</span>
        </div>

        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(80px, 16vw, 160px)',
          fontWeight: 800,
          lineHeight: 0.9,
          letterSpacing: '-3px',
          color: '#f4f8f4',
          marginBottom: '16px'
        }}>
          BEANS<span style={{ color: '#3dbe6c' }}>.</span>
        </h1>

        <p style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '13px',
          letterSpacing: '6px',
          textTransform: 'uppercase' as const,
          color: '#d4a843',
          marginBottom: '32px'
        }}>
          Reap What You Sow
        </p>

        <p style={{
          fontSize: '18px',
          color: '#5a7a5a',
          maxWidth: '520px',
          margin: '0 auto 48px',
          lineHeight: 1.7,
          fontWeight: 300
        }}>
          From your <strong style={{ color: '#e8ede8', fontWeight: 500 }}>first lesson</strong> to your <strong style={{ color: '#e8ede8', fontWeight: 500 }}>first trade</strong> — the all-in-one platform built for the next generation of investors.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' as const }}>
          <a href="/auth" style={{
            background: '#3dbe6c', color: '#080907',
            padding: '14px 36px', borderRadius: '8px',
            fontWeight: 600, fontSize: '15px', textDecoration: 'none',
            transition: 'all 0.2s'
          }}>Get Started Free</a>
          <a href="/learn" style={{
            background: 'transparent', color: '#8aaa8a',
            padding: '14px 36px', borderRadius: '8px',
            fontWeight: 500, fontSize: '15px', textDecoration: 'none',
            border: '1px solid #1e2a1c'
          }}>See How It Works</a>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #1e2a1c', borderBottom: '1px solid #1e2a1c', background: '#0c100b', padding: '14px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '48px', animation: 'ticker 25s linear infinite', width: 'max-content' }}>
          {['AAPL +2.1%', 'TSLA +4.8%', 'NVDA +3.4%', 'SPY +0.9%', 'EUR/USD -0.2%', 'AMZN +1.6%', 'MSFT +1.1%', 'GBP/USD +0.1%', 'AAPL +2.1%', 'TSLA +4.8%', 'NVDA +3.4%', 'SPY +0.9%', 'EUR/USD -0.2%', 'AMZN +1.6%', 'MSFT +1.1%', 'GBP/USD +0.1%'].map((item, i) => (
            <span key={i} style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: item.includes('-') ? '#e05252' : '#3dbe6c', whiteSpace: 'nowrap' as const }}>{item}</span>
          ))}
        </div>
        <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </div>

      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' as const, color: '#3dbe6c', display: 'block', marginBottom: '16px' }}>How It Works</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: '#f4f8f4', marginBottom: '16px' }}>Three pillars.<br />One platform.</h2>
          <p style={{ color: '#5a7a5a', fontSize: '16px', maxWidth: '400px', margin: '0 auto' }}>Every feature exists to move you forward — from knowing nothing to trading with confidence.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          {[
            { number: '01', icon: '📚', title: 'LEARN', desc: 'Structured lessons from zero to advanced. Earn XP, level up, and build real knowledge through interactive quizzes.' },
            { number: '02', icon: '🎮', title: 'PLAY', desc: 'A simulated stock market and player-driven Exchange. Trade without risk, compete on leaderboards, build real skills.' },
            { number: '03', icon: '⚡', title: 'TRADE', desc: 'Graduate to live trading inside the same platform. Algorithm-assisted signals guide your decisions as you build wealth.' },
          ].map((pillar, i) => (
            <div key={i} style={{
              background: '#111810', border: '1px solid #1e2a1c',
              padding: '48px 36px', position: 'relative', overflow: 'hidden',
              borderRadius: i === 0 ? '12px 0 0 12px' : i === 2 ? '0 12px 12px 0' : '0'
            }}>
              <span style={{ position: 'absolute', top: '16px', right: '20px', fontFamily: 'Syne, sans-serif', fontSize: '64px', fontWeight: 800, color: '#1e2a1c', lineHeight: 1 }}>{pillar.number}</span>
              <div style={{ width: '48px', height: '48px', background: 'rgba(61,190,108,0.08)', border: '1px solid #1f6e3a', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '20px' }}>{pillar.icon}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: 800, letterSpacing: '2px', color: '#f4f8f4', marginBottom: '12px' }}>{pillar.title}</h3>
              <p style={{ color: '#5a7a5a', fontSize: '14px', lineHeight: 1.8 }}>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#0c100b', borderTop: '1px solid #1e2a1c', borderBottom: '1px solid #1e2a1c', padding: '100px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' as const, color: '#d4a843', display: 'block', marginBottom: '16px' }}>The Crown Jewel</span>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#f4f8f4', marginBottom: '20px', lineHeight: 1.05 }}>
              The Exchange.<br /><span style={{ color: '#d4a843' }}>Player-driven.</span>
            </h2>
            <p style={{ color: '#5a7a5a', fontSize: '15px', lineHeight: 1.8, marginBottom: '28px' }}>
              Create your own company, issue shares, and watch other players invest. Prices move based on real supply and demand — built entirely by the community.
            </p>
            {['Found a company for 500 Beans', 'Issue 1,000 shares to the market', 'Watch your stock price move with trades', 'Compete in weekly seasons and leaderboards'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(61,190,108,0.08)', border: '1px solid #1f6e3a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#3dbe6c', fontSize: '9px' }}>✓</span>
                </div>
                <span style={{ color: '#8aaa8a', fontSize: '14px' }}>{item}</span>
              </div>
            ))}
            <div style={{ marginTop: '28px' }}>
              <a href="/exchange" style={{ background: '#d4a843', color: '#080907', padding: '14px 32px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>Enter The Exchange</a>
            </div>
          </div>

          <div style={{ background: '#111810', border: '1px solid #1e2a1c', borderRadius: '16px', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', color: '#f4f8f4' }}>DEAN</div>
                <div style={{ color: '#5a7a5a', fontSize: '12px' }}>Dean Industries</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '24px', color: '#d4a843' }}>247.50</div>
                <div style={{ color: '#3dbe6c', fontSize: '12px' }}>+12.4%</div>
              </div>
            </div>
            <div style={{ height: '100px', background: '#0c100b', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
              <svg viewBox="0 0 300 100" style={{ width: '100%', height: '100%' }}>
                <polyline points="0,80 30,70 60,75 90,55 120,60 150,40 180,45 210,30 240,25 270,15 300,10" fill="none" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="0,80 30,70 60,75 90,55 120,60 150,40 180,45 210,30 240,25 270,15 300,10 300,100 0,100" fill="rgba(212,168,67,0.05)" />
              </svg>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {[['750', 'Shares Left'], ['12', 'Investors'], ['147K', 'Volume']].map(([val, label]) => (
                <div key={label} style={{ background: '#0c100b', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: '#f4f8f4' }}>{val}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#5a7a5a', letterSpacing: '1px', textTransform: 'uppercase' as const, marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' as const, color: '#3dbe6c', display: 'block', marginBottom: '16px' }}>Pricing</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: '#f4f8f4', marginBottom: '16px' }}>Grow at your pace.</h2>
          <p style={{ color: '#5a7a5a', fontSize: '16px' }}>Start free. Upgrade when you're ready.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { emoji: '🌱', name: 'Sprout', sub: 'Free Forever', price: '0', featured: false, features: ['Core lessons & quizzes', 'Simulated trading', 'Basic leaderboard', 'Community access', 'Bean character'] },
            { emoji: '📈', name: 'Grower', sub: 'Pro Trader', price: '29', featured: true, features: ['Everything in Sprout', 'Full simulation suite', 'The Exchange access', 'Advanced analytics', 'Live trading dashboard', 'Weekly seasons'] },
            { emoji: '⚡', name: 'Harvest', sub: 'Elite Access', price: '79', featured: false, features: ['Everything in Grower', 'Algorithm signals', 'Forex & options tools', 'Advanced automation', 'Priority support', 'Early access'] },
          ].map(tier => (
            <div key={tier.name} style={{
              background: tier.featured ? 'linear-gradient(160deg, rgba(61,190,108,0.06), #111810)' : '#111810',
              border: '1px solid ' + (tier.featured ? '#3dbe6c' : '#1e2a1c'),
              borderRadius: '16px', padding: '32px 24px', position: 'relative'
            }}>
              {tier.featured && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#3dbe6c', color: '#080907', fontFamily: 'DM Mono, monospace', fontSize: '10px', fontWeight: 600, letterSpacing: '2px', padding: '4px 16px', borderRadius: '20px', whiteSpace: 'nowrap' as const }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{tier.emoji}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: '#f4f8f4', marginBottom: '4px' }}>{tier.name}</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '2px', color: '#5a7a5a', textTransform: 'uppercase' as const, marginBottom: '16px' }}>{tier.sub}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '40px', color: '#f4f8f4', lineHeight: 1, marginBottom: '4px' }}>
                ${tier.price}<span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#5a7a5a', fontWeight: 300 }}>/mo</span>
              </div>
              <div style={{ height: '1px', background: '#1e2a1c', margin: '20px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tier.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#8aaa8a' }}>
                    <span style={{ color: '#3dbe6c', fontSize: '11px' }}>→</span> {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#0c100b', borderTop: '1px solid #1e2a1c', padding: '100px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 800, color: '#f4f8f4', lineHeight: 0.95, marginBottom: '24px' }}>
            Ready to<br /><span style={{ color: '#3dbe6c' }}>sow?</span>
          </h2>
          <p style={{ color: '#5a7a5a', fontSize: '16px', marginBottom: '40px', lineHeight: 1.7 }}>Join Beans and start building the financial future your family deserves.</p>
          <a href="/auth" style={{ background: '#3dbe6c', color: '#080907', padding: '16px 48px', borderRadius: '8px', fontWeight: 600, fontSize: '16px', textDecoration: 'none', display: 'inline-block' }}>Start for Free</a>
        </div>
      </section>
    </div>
  )
}