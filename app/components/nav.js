'use client'

export default function Nav() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 48px',
      height: '64px',
      background: 'rgba(8,9,7,0.92)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'var(--green)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '18px'
        }}>🫘</div>
        <span style={{
          fontFamily: 'Syne, sans-serif', fontWeight: '800',
          fontSize: '20px', letterSpacing: '2px', color: 'var(--white)'
        }}>BEANS</span>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {[
          { href: '/learn', label: 'Learn' },
          { href: '/play', label: 'Play' },
          { href: '/exchange', label: 'Exchange' },
          { href: '/leaderboard', label: 'Ranks' },
          { href: '/trade', label: 'Trade' },
        ].map(link => (
          <a key={link.href} href={link.href} style={{
            padding: '8px 16px',
            borderRadius: '8px',
            color: 'var(--text-muted)',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s',
            letterSpacing: '0.3px'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--white)'
            e.currentTarget.style.background = 'var(--card)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--text-muted)'
            e.currentTarget.style.background = 'transparent'
          }}
          >{link.label}</a>
        ))}
      </div>

      <a href="/profile" style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'var(--green)', color: 'var(--black)',
        padding: '8px 20px', borderRadius: '8px',
        fontWeight: '600', fontSize: '14px',
        transition: 'all 0.2s', textDecoration: 'none'
      }}>
        Profile
      </a>
    </nav>
  )
}