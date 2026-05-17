export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(46,204,113,0.08) 0%, transparent 70%)' }} />

      <p style={{ fontFamily: 'Arial', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#2ecc71', marginBottom: '24px' }}>
        The Future of Trading Education
      </p>

      <h1 style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: 'clamp(72px, 15vw, 160px)', lineHeight: '0.9', letterSpacing: '4px', color: '#f0f7f2', margin: '0 0 16px' }}>
        BEANS<span style={{ color: '#2ecc71' }}>.</span>
      </h1>

      <p style={{ fontFamily: 'Arial', fontSize: 'clamp(12px, 2vw, 16px)', color: '#c9a84c', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '40px' }}>
        Reap What You Sow
      </p>

      <p style={{ color: '#6b8a72', fontSize: '18px', maxWidth: '560px', lineHeight: '1.7', marginBottom: '56px', fontWeight: '300' }}>
        From your <strong style={{ color: '#e8f0ea' }}>first lesson</strong> to your <strong style={{ color: '#e8f0ea' }}>first trade</strong> — learn, simulate, and execute in one platform built for the next generation.
      </p>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="/auth" style={{ background: '#1a7a43', color: 'white', padding: '16px 40px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Get Started
        </a>
        <a href="/learn" style={{ border: '1px solid #1e2e22', color: '#6b8a72', padding: '16px 40px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          See How It Works
        </a>
      </div>

      <div style={{ display: 'flex', gap: '48px', marginTop: '80px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '32px', color: '#2ecc71' }}>LEARN</div>
          <div style={{ fontSize: '13px', color: '#6b8a72', marginTop: '4px' }}>Structured lessons from zero to advanced</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '32px', color: '#2ecc71' }}>PLAY</div>
          <div style={{ fontSize: '13px', color: '#6b8a72', marginTop: '4px' }}>Simulated market. Zero risk. Real skills.</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '32px', color: '#2ecc71' }}>TRADE</div>
          <div style={{ fontSize: '13px', color: '#6b8a72', marginTop: '4px' }}>Graduate to live trading with confidence</div>
        </div>
      </div>

    </div>
  )
}