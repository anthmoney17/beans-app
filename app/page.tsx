export default function Home() {
  return (
    <div style={{ overflow: 'hidden' }}>

      {/* HERO */}
      <section style={{
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 48px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(61,190,108,0.07) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(61,190,108,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(61,190,108,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', maxWidth: '800px' }}>
          <div style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--green-dim)', border: '1px solid var(--green-dark)', borderRadius: '20px', padding: '6px 16px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '2px', color: 'var(--green)', textTransform: 'uppercase' }}>Now in Development</span>
          </div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(64px, 14vw, 140px)',
            fontWeight: '800',
            lineHeight: '0.9',
            letterSpacing: '-2px',
            color: 'var(--white)',
            marginBottom: '8px'
          }}>
            BEANS<span style={{ color: 'var(--green)' }}>.</span>
          </h1>

          <p style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 'clamp(11px, 1.5vw, 14px)',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '32px'
          }}>
            Reap What You Sow
          </p>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--text-muted)',
            maxWidth: '520px',
            margin: '0 auto 48px',
            lineHeight: '1.7',
            fontWeight: '300'
          }}>
            From your <strong style={{ color: 'var(--text)', fontWeight: '500' }}>first lesson</strong> to your <strong style={{ color: 'var(--text)', fontWeight: '500' }}>first trade</strong> — the all-in-one platform built for the next generation of investors.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/auth" className="btn-primary">Get Started Free</a>
            <a href="/learn" className="btn-ghost">See How It Works</a>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--deep)', padding: '12px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '48px', width: 'max-content', animation: 'ticker 30s linear infinite' }}>
          {['AAPL +2.1%', 'TSLA +4.8%', 'NVDA +3.4%', 'SPY +0.9%', 'EUR/USD -0.2%', 'AMZN +1.6%', 'MSFT +1.1%', 'GBP/USD +0.1%', 'AAPL +2.1%', 'TSLA +4.8%', 'NVDA +3.4%', 'SPY +0.9%', 'EUR/USD -0.2%', 'AMZN +1.6%', 'MSFT +1.1%', 'GBP/USD +0.1%'].map((item, i) => (
            <span key={i} style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: item.includes('-') ? 'var(--red)' : 'var(--green)', whiteSpace: 'nowrap' }}>{item}</span>
          ))}
        </div>
        <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </div>

      {/* THREE PILLARS */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="page-eyebrow">How It Works</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '800', color: 'var(--white)', marginBottom: '16px' }}>
            Three pillars.<br />One platform.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '400px', margin: '0 auto' }}>
            Every feature exists to move you forward — from knowing nothing to trading with confidence.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          {[
            { number: '01', icon: '📚', title: 'LEARN', desc: 'Structured lessons from zero to advanced. Earn XP, level up, and build real knowledge through interactive quizzes — not just reading.' },
            { number: '02', icon: '🎮', title: 'PLAY', desc: 'A fully simulated stock market and player-driven Exchange. Trade without risk, compete on leaderboards, and build real skills.' },
            { number: '03', icon: '⚡', title: 'TRADE', desc: 'Graduate to live trading inside the same platform. Algorithm-assisted signals guide your decisions as you build real wealth.' },
          ].map(pillar => (
            <div key={pillar.number} className="card" style={{ padding: '48px 40px', borderRadius: '0', position: 'relative', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', top: '20px', right: '24px', fontFamily: 'Syne, sans-serif', fontSize: '72px', fontWeight: '800', color: 'var(--border)', lineHeight: 1 }}>{pillar.number}</span>
              <div style={{ width: '48px', height: '48px', background: 'var(--green-dim)', border: '1px solid var(--green-dark)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '24px' }}>{pillar.icon}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: '800', letterSpacing: '2px', color: 'var(--white)', marginBottom: '12px' }}>{pillar.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.8' }}>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE EXCHANGE FEATURE */}
      <section style={{ background: 'var(--deep)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '120px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <span className="page-eyebrow">The Crown Jewel</span>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: '800', color: 'var(--white)', marginBottom: '20px', lineHeight: '1.05' }}>
              The Exchange.<br /><span style={{ color: 'var(--gold)' }}>Player-driven.</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.8', marginBottom: '32px' }}>
              Create your own company, issue shares, and watch other players invest. Prices move based on real supply and demand — built entirely by the community.
            </p>
            {[
              'Found a company for 500 Beans',
              'Issue 1,000 shares to the market',
              'Watch your stock price move with trades',
              'Compete in weekly seasons and leaderboards',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--green-dim)', border: '1px solid var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'var(--green)', fontSize: '10px' }}>✓</span>
                </div>
                <span style={{ color: 'var(--text-dim)', fontSize: '14px' }}>{item}</span>
              </div>
            ))}
            <div style={{ marginTop: '32px' }}>
              <a href="/exchange" className="btn-gold">Enter The Exchange</a>
            </div>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: '800', fontSize: '20px', color: 'var(--white)' }}>DEAN</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Dean Industries</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '24px', color: 'var(--gold)' }}>247.50</div>
                <div style={{ color: 'var(--green)', fontSize: '12px' }}>+12.4%</div>
              </div>
            </div>
            <div style={{ height: '120px', background: 'var(--deep)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <svg viewBox="0 0 300 100" style={{ width: '100%', height: '100px' }}>
                <polyline points="0,80 30,70 60,75 90,55 120,60 150,40 180,45 210,30 240,25 270,15 300,10" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="0,80 30,70 60,75 90,55 120,60 150,40 180,45 210,30 240,25 270,15 300,10 300,100 0,100" fill="rgba(212,168,67,0.05)" />
              </svg>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              {[['750', 'Shares Left'], ['12', 'Investors'], ['147.5K', 'Volume']].map(([val, label]) => (
                <div key={label} style={{ background: 'var(--deep)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '16px', color: 'var(--white)' }}>{val}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="page-eyebrow">Pricing</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '800', color: 'var(--white)', marginBottom: '16px' }}>
            Grow at your pace.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>Start free. Upgrade when you're ready.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            { emoji: '🌱', name: 'Sprout', sub: 'Free Forever', price: '0', features: ['Core lessons & quizzes', 'Simulated trading', 'Basic leaderboard', 'Community access', 'Bean character'] },
            { emoji: '📈', name: 'Grower', sub: 'Pro Trader', price: '29', featured: true, features: ['Everything in Sprout', 'Full simulation suite', 'The Exchange access', 'Advanced analytics', 'Live trading dashboard', 'Weekly seasons'] },
            { emoji: '⚡', name: 'Harvest', sub: 'Elite Access', price: '79', features: ['Everything in Grower', 'Algorithm signals', 'Forex & options tools', 'Advanced automation', 'Priority support', 'Early access'] },
          ].map(tier => (
            <div key={tier.name} style={{
              background: tier.featured ? 'linear-gradient(160deg, rgba(61,190,108,0.06), var(--card))' : 'var(--card)',
              border: '1px solid ' + (tier.featured ? 'var(--green)' : 'var(--border)'),
              borderRadius: '16px',
              padding: '36px 28px',
              position: 'relative'
            }}>
              {tier.featured && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--green)', color: 'var(--black)', fontFamily: 'DM Mono, monospace', fontSize: '10px', fontWeight: '600', letterSpacing: '2px', padding: '4px 16px', borderRadius: '20px' }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{tier.emoji}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: '800', fontSize: '24px', color: 'var(--white)', marginBottom: '4px' }}>{tier.name}</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '20px' }}>{tier.sub}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: '800', fontSize: '44px', color: 'var(--white)', lineHeight: 1, marginBottom: '4px' }}>
                ${tier.price}<span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-muted)', fontWeight: '300' }}>/mo</span>
              </div>
              <div style={{ height: '1px', background: 'var(--border)', margin: '24px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tier.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-dim)' }}>
                    <span style={{ color: 'var(--green)', fontSize: '12px' }}>→</span> {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--deep)', borderTop: '1px solid var(--border)', padding: '120px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: '800', color: 'var(--white)', lineHeight: '0.95', marginBottom: '24px' }}>
            Ready to<br /><span style={{ color: 'var(--green)' }}>sow?</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '40px' }}>Join Beans and start building the financial future your family deserves.</p>
          <a href="/auth" className="btn-primary" style={{ fontSize: '16px', padding: '16px 48px' }}>Start for Free</a>
        </div>
      </section>

    </div>
  )
}